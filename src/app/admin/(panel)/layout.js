import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { signOut } from "@/app/admin/actions";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }) {
  const { user, isAdmin } = await getAdmin();
  if (!isAdmin) redirect("/admin/login");

  return (
    <div className="ad-shell">
      <aside className="ad-side">
        <div className="ad-logo"><b>ReMate</b><small>QUẢN TRỊ WEBSITE</small></div>
        <AdminNav />
        <div className="ad-user">
          <span title={user.email}>{user.email}</span>
          <Link href="/" target="_blank">Xem website ↗</Link>
          <form action={signOut}><button type="submit" className="ad-link">Đăng xuất</button></form>
        </div>
      </aside>
      <main className="ad-main">{children}</main>
    </div>
  );
}
