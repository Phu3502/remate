"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children = "Lưu", pending = "Đang lưu…" }) {
  const { pending: busy } = useFormStatus();
  return (
    <button className="ad-btn" type="submit" disabled={busy}>
      {busy ? pending : children}
    </button>
  );
}
