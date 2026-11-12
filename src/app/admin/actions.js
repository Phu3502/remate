"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { ICONS, SETTING_GROUPS } from "@/lib/site";

const BUCKET = "site-images";
const TABLES = ["services", "projects", "products"];

const str = (fd, k, max = 500) => String(fd.get(k) ?? "").trim().slice(0, max);
const refresh = () => revalidatePath("/", "layout");

export async function signIn(_prev, fd) {
  const email = str(fd, "email", 200);
  const password = String(fd.get("password") ?? "");
  if (!email || !password) return { error: "Vui lòng nhập email và mật khẩu." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Email hoặc mật khẩu không đúng." };

  const { data: { user } } = await supabase.auth.getUser();
  const { data: row } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!row) {
    await supabase.auth.signOut();
    return { error: "Tài khoản này không có quyền quản trị." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveSettings(_prev, fd) {
  const { supabase } = await requireAdmin();
  const rows = [];
  for (const group of SETTING_GROUPS) {
    for (const f of group.fields) {
      const value = str(fd, f.key, f.max ?? 300);
      if (f.required && !value) return { error: `Vui lòng nhập "${f.label}".` };
      if (value && f.type === "url" && !/^https?:\/\/\S+$/i.test(value))
        return { error: `"${f.label}" phải bắt đầu bằng http:// hoặc https://` };
      if (value && f.type === "email" && !/^\S+@\S+\.\S+$/.test(value))
        return { error: `"${f.label}" chưa đúng định dạng email.` };
      rows.push({ key: f.key, value, updated_at: new Date().toISOString() });
    }
  }
  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) return { error: "Không lưu được: " + error.message };
  refresh();
  return { ok: true, message: "Đã lưu. Website đã được cập nhật." };
}

function readImage(fd) {
  const url = str(fd, "image_url", 600);
  if (!url) return { image_url: null, image_w: null, image_h: null };
  const localImage = url.startsWith("/images/") && !url.includes("..") && !url.includes("\\") && !/[?#]/.test(url);
  let storageImage = false;
  try {
    const base = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
    const candidate = new URL(url);
    const prefix = `/storage/v1/object/public/${BUCKET}/`;
    storageImage = candidate.origin === base.origin && candidate.pathname.startsWith(prefix) &&
      candidate.pathname.length > prefix.length && !candidate.pathname.includes("..") && !candidate.search && !candidate.hash;
  } catch {}
  if (!localImage && !storageImage) return { error: "Địa chỉ ảnh không hợp lệ." };
  const w = parseInt(fd.get("image_w"), 10);
  const h = parseInt(fd.get("image_h"), 10);
  if (!(w > 0 && h > 0 && w <= 10000 && h <= 10000)) return { error: "Không đọc được kích thước ảnh, hãy chọn lại ảnh." };
  return { image_url: url, image_w: w, image_h: h };
}

async function persist(supabase, table, id, row) {
  if (id) {
    const { error } = await supabase.from(table).update(row).eq("id", id);
    if (error) return { error: "Không lưu được: " + error.message };
  } else {
    const { data, error: readError } = await supabase.from(table).select("sort_order").order("sort_order", { ascending: false }).limit(1);
    if (readError) return { error: "Không đọc được thứ tự hiện tại: " + readError.message };
    const next = (data?.[0]?.sort_order ?? 0) + 1;
    const { error } = await supabase.from(table).insert({ ...row, sort_order: next });
    if (error) return { error: "Không thêm được: " + error.message };
  }
  refresh();
  revalidatePath("/admin", "layout");
  return { ok: true, message: id ? "Đã lưu." : "Đã thêm mới." };
}

export async function saveService(_prev, fd) {
  const { supabase } = await requireAdmin();
  const title = str(fd, "title", 200);
  if (!title) return { error: "Vui lòng nhập tiêu đề." };
  const icon = str(fd, "icon", 4);
  if (!ICONS.some((i) => i.value === icon)) return { error: "Biểu tượng không hợp lệ." };
  const img = readImage(fd);
  if (img.error) return { error: img.error };
  return persist(supabase, "services", str(fd, "id", 64), {
    icon, title, caption: str(fd, "caption", 200), alt: str(fd, "alt", 200),
    visible: fd.get("visible") === "on", ...img,
  });
}

export async function saveProject(_prev, fd) {
  const { supabase } = await requireAdmin();
  const title = str(fd, "title", 200);
  if (!title) return { error: "Vui lòng nhập tên dự án." };
  const img = readImage(fd);
  if (img.error) return { error: img.error };
  return persist(supabase, "projects", str(fd, "id", 64), {
    title, summary: str(fd, "summary", 200), description: str(fd, "description", 3000),
    visible: fd.get("visible") === "on", ...img,
  });
}

export async function saveProduct(_prev, fd) {
  const { supabase } = await requireAdmin();
  const title = str(fd, "title", 200);
  if (!title) return { error: "Vui lòng nhập tên sản phẩm." };
  const img = readImage(fd);
  if (img.error) return { error: img.error };
  return persist(supabase, "products", str(fd, "id", 64), {
    category: str(fd, "category", 100), title, summary: str(fd, "summary", 240),
    description: str(fd, "description", 5000), is_new: fd.get("is_new") === "on",
    visible: fd.get("visible") === "on", ...img,
  });
}

export async function moveItem(_prev, fd) {
  const { supabase } = await requireAdmin();
  const table = str(fd, "table", 20);
  const id = str(fd, "id", 64);
  const dir = str(fd, "dir", 4);
  if (!TABLES.includes(table) || !id || !["up", "down"].includes(dir)) return { error: "Thao tác không hợp lệ." };

  const { data, error: readError } = await supabase.from(table).select("id,sort_order").order("sort_order").order("created_at");
  if (readError || !data) return { error: "Không tải được danh sách để sắp xếp." };
  const i = data.findIndex((r) => r.id === id);
  const j = dir === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= data.length) return { error: "Không tìm thấy mục cần chuyển." };
  [data[i], data[j]] = [data[j], data[i]];
  for (const [idx, row] of data.entries()) {
    const { error } = await supabase.from(table).update({ sort_order: idx + 1 }).eq("id", row.id);
    if (error) {
      refresh();
      revalidatePath("/admin", "layout");
      return { error: "Không đổi được toàn bộ thứ tự. Hãy tải lại danh sách rồi thử lại." };
    }
  }
  refresh();
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function deleteItem(_prev, fd) {
  const { supabase } = await requireAdmin();
  const table = str(fd, "table", 20);
  const id = str(fd, "id", 64);
  if (!TABLES.includes(table) || !id) return { error: "Thao tác không hợp lệ." };

  const { data: row } = await supabase.from(table).select("image_url").eq("id", id).maybeSingle();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { error: "Không xóa được: " + error.message };

  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const at = row?.image_url?.indexOf(marker) ?? -1;
  let imageWarning = "";
  if (at >= 0) {
    const { error: imageError } = await supabase.storage.from(BUCKET).remove([row.image_url.slice(at + marker.length)]);
    if (imageError) imageWarning = " Mục đã xóa nhưng ảnh cũ chưa được dọn khỏi kho.";
  }

  refresh();
  revalidatePath("/admin", "layout");
  return { ok: true, message: imageWarning || "Đã xóa." };
}
