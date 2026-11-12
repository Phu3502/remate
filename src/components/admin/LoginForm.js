"use client";
import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";
import SubmitButton from "./SubmitButton";
import Notice from "./Notice";

export default function LoginForm() {
  const [state, action] = useActionState(signIn, {});
  return (
    <form action={action} className="ad-form">
      <label><span className="ad-label-title">Email<em aria-label="bắt buộc">*</em></span>
        <input name="email" type="email" autoComplete="username" required autoFocus />
      </label>
      <label><span className="ad-label-title">Mật khẩu<em aria-label="bắt buộc">*</em></span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <Notice state={state} />
      <SubmitButton pending="Đang đăng nhập…">Đăng nhập</SubmitButton>
    </form>
  );
}
