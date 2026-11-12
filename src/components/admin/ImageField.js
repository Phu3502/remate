"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "site-images";
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

async function shrink(file, max = 1600) {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * k);
  const h = Math.round(bmp.height * k);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);
  let quality = 0.85;
  let blob = await new Promise((r) => canvas.toBlob(r, "image/webp", quality));
  while (blob && blob.size > MAX_UPLOAD_BYTES && quality > 0.4) {
    quality = Math.max(0.4, quality - 0.1);
    blob = await new Promise((r) => canvas.toBlob(r, "image/webp", quality));
  }
  if (!blob) throw new Error("Trình duyệt không xử lý được ảnh này.");
  if (blob.size > MAX_UPLOAD_BYTES) throw new Error("Ảnh sau khi thu nhỏ vẫn vượt giới hạn 5 MB.");
  return { blob, w, h };
}

export default function ImageField({ folder, initial }) {
  const [img, setImg] = useState({ url: initial?.url || "", w: initial?.w || "", h: initial?.h || "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onPick(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return setErr("Chỉ nhận ảnh JPG, PNG hoặc WebP.");
    if (file.size > 15 * 1024 * 1024) return setErr("Ảnh gốc quá lớn (tối đa 15 MB).");
    setErr(""); setBusy(true);
    try {
      const { blob, w, h } = await shrink(file);
      const path = `${folder}/${crypto.randomUUID()}.webp`;
      const supabase = createClient();
      const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
        contentType: "image/webp", cacheControl: "31536000",
      });
      if (error) throw error;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setImg({ url: data.publicUrl, w, h });
    } catch (ex) {
      setErr("Tải ảnh lên thất bại: " + (ex.message || "lỗi không rõ"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ad-img">
      <input type="hidden" name="image_url" value={img.url} />
      <input type="hidden" name="image_w" value={img.w} />
      <input type="hidden" name="image_h" value={img.h} />
      <div className="ad-thumb">
        {img.url ? <img src={img.url} alt="" /> : <span>Chưa có ảnh</span>}
      </div>
      <div className="ad-img-ctl">
        <label className="ad-btn o">
          {busy ? "Đang tải lên…" : img.url ? "Đổi ảnh" : "Chọn ảnh"}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onPick} disabled={busy} hidden />
        </label>
        {img.url && !busy && (
          <button type="button" className="ad-link" onClick={() => setImg({ url: "", w: "", h: "" })}>Bỏ ảnh</button>
        )}
        {err && <p className="ad-msg err">{err}</p>}
        <small>Ảnh tự được thu nhỏ. Bấm &quot;Lưu&quot; để áp dụng lên website.</small>
      </div>
    </div>
  );
}
