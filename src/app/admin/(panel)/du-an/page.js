import { requireAdmin } from "@/lib/auth";
import ItemList from "@/components/admin/ItemList";
import Notice from "@/components/admin/Notice";

export default async function ProjectsAdminPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("projects").select("*").order("sort_order").order("created_at");
  return (
    <>
      <h1 className="ad-h1">Dự án</h1>
      <p className="ad-sub">Hiển thị ở trang Dự án. Chưa có dự án nào hiện thì trang sẽ báo &quot;Nội dung đang được cập nhật&quot;.</p>
      {error ? <Notice state={{ error: "Không tải được danh sách dự án. Hãy thử tải lại trang." }} /> : <ItemList kind="project" items={data ?? []} />}
    </>
  );
}
