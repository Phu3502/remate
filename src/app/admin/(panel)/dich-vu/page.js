import { requireAdmin } from "@/lib/auth";
import ItemList from "@/components/admin/ItemList";
import Notice from "@/components/admin/Notice";

export default async function ServicesAdminPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("services").select("*").order("sort_order").order("created_at");
  return (
    <>
      <h1 className="ad-h1">Lĩnh vực / Dịch vụ</h1>
      <p className="ad-sub">Các thẻ hiển thị ở trang chủ, danh sách ở chân trang và trang Giới thiệu. Dùng nút ↑ ↓ để đổi thứ tự.</p>
      {error ? <Notice state={{ error: "Không tải được danh sách dịch vụ. Hãy thử tải lại trang." }} /> : <ItemList kind="service" items={data ?? []} />}
    </>
  );
}
