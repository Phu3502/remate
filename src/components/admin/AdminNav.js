"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/admin", label: "Thông tin chung" },
  { href: "/admin/dich-vu", label: "Dịch vụ" },
  { href: "/admin/san-pham", label: "Sản phẩm" },
  { href: "/admin/du-an", label: "Dự án" },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="ad-nav" aria-label="Quản trị">
      {ITEMS.map((i) => (
        <Link key={i.href} href={i.href} aria-current={path === i.href ? "page" : undefined}>{i.label}</Link>
      ))}
    </nav>
  );
}
