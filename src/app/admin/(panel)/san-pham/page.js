import { requireAdmin } from "@/lib/auth";
import ItemList from "@/components/admin/ItemList";
import Notice from "@/components/admin/Notice";

export default async function ProductsAdminPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("products").select("*").order("sort_order").order("created_at");
  return (
    <>
      <h1 className="ad-h1">Sản phẩm</h1>
      <p className="ad-sub">Quản lý sản phẩm nổi bật trên website. Thêm ảnh, nhóm sản phẩm và thông tin chi tiết để khách hàng tham khảo.</p>
      {error ? <Notice state={{ error: "Chưa tải được sản phẩm. Hãy chạy supabase/migrations/20261112_products.sql trong Supabase SQL Editor rồi tải lại trang." }} /> : <ItemList kind="product" items={data ?? []} />}
    </>
  );
}
