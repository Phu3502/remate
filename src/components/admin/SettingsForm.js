"use client";
import { useActionState } from "react";
import { saveSettings } from "@/app/admin/actions";
import { SETTING_GROUPS } from "@/lib/site";
import SubmitButton from "./SubmitButton";
import Notice from "./Notice";

export default function SettingsForm({ values }) {
  const [state, action] = useActionState(saveSettings, {});
  return (
    <form action={action} className="ad-form">
      {SETTING_GROUPS.map((g) => (
        <fieldset key={g.title} className="ad-card">
          <legend>{g.title}</legend>
          {g.fields.map((f) => (
            <label key={f.key} className={f.type === "textarea" ? "ad-wide" : undefined}>
              <span className="ad-label-title">{f.label}{f.required && <em aria-label="bắt buộc">*</em>}</span>
              {f.type === "textarea" ? (
                <textarea name={f.key} rows={4} defaultValue={values[f.key]} maxLength={f.max} required={f.required} />
              ) : (
                <input name={f.key} type={f.type || "text"} defaultValue={values[f.key]} maxLength={f.max} required={f.required} />
              )}
              {f.hint && <small>{f.hint}</small>}
            </label>
          ))}
        </fieldset>
      ))}
      <div className="ad-bar">
        <SubmitButton>Lưu thay đổi</SubmitButton>
        <Notice state={state} />
      </div>
    </form>
  );
}
