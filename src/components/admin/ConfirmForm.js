"use client";

export default function ConfirmForm({ action, message, children, ...rest }) {
  return (
    <form action={action} onSubmit={(e) => { if (!confirm(message)) e.preventDefault(); }} {...rest}>
      {children}
    </form>
  );
}
