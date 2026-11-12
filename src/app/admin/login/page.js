import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const { isAdmin } = await getAdmin();
  if (isAdmin) redirect("/admin");
  return (
    <main className="ad-login">
      <section className="ad-login-brand" aria-label="ReMate">
        <Image src="/images/remate-wordmark-white.png" alt="ReMate" width={320} height={80} priority />
        <div className="ad-login-brand-copy">
          <span className="ad-login-kicker">TRANG QUẢN TRỊ</span>
          <h1>Quản lý website<br />ReMate</h1>
          <p>Cập nhật thông tin doanh nghiệp, dịch vụ và dự án tại một nơi.</p>
        </div>
        <small className="ad-login-brand-foot">Không gian dành riêng cho quản trị viên</small>
      </section>
      <section className="ad-login-panel">
        <div className="ad-login-heading">
          <h2>Đăng nhập</h2>
          <p>Sử dụng tài khoản quản trị của bạn để tiếp tục.</p>
        </div>
        <LoginForm />
        <p className="ad-login-note">Chỉ tài khoản được cấp quyền mới có thể truy cập.</p>
      </section>
    </main>
  );
}
