"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/site";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") setOpen(false); };
    const out = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    window.addEventListener("keydown", esc);
    document.addEventListener("click", out);
    return () => {
      window.removeEventListener("keydown", esc);
      document.removeEventListener("click", out);
    };
  }, []);

  return (
    <header className={`hd${open ? " open" : ""}`} ref={ref}>
      <div className="w">
        <Link className="brand" href="/" aria-label="ReMate – Trang chủ">
          <Image src="/images/logo-icon.png" alt="" width={240} height={176} />
          <span><b>ReMate</b><small>VẬT TƯ TÁI SỬ DỤNG</small></span>
        </Link>

        <nav className="nav" id="nav" aria-label="Điều hướng chính">
          {NAV.map((n) =>
            n.href.startsWith("#") ? (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
            ) : (
              <Link key={n.href} href={n.href} aria-current={path === n.href || (n.href !== "/" && path.startsWith(`${n.href}/`)) ? "page" : undefined}>{n.label}</Link>
            )
          )}
        </nav>

        <button
          className="mb"
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((o) => !o)}
        >
          <i />
        </button>
      </div>
    </header>
  );
}
