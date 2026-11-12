import { requireAdmin } from "@/lib/auth";
import { getSite } from "@/lib/content";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  await requireAdmin();
  const values = await getSite();
  return (
    <>
      <h1 className="ad-h1">Thông tin chung</h1>
      <p className="ad-sub">Sửa ở đây sẽ đổi trên toàn bộ website (đầu trang, chân trang, trang chủ, nút Zalo/gọi điện…).</p>
      <SettingsForm values={values} />
    </>
  );
}
