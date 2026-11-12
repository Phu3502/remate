"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { saveService, saveProject, saveProduct } from "@/app/admin/actions";
import { ICONS } from "@/lib/site";
import ImageField from "./ImageField";
import SubmitButton from "./SubmitButton";
import Notice from "./Notice";

export default function ItemForm({ kind, item }) {
  const isNew = !item;
  const saveAction = kind === "service" ? saveService : kind === "product" ? saveProduct : saveProject;
  const [state, action] = useActionState(saveAction, {});
  const ref = useRef(null);
  const [imgKey, setImgKey] = useState(0);

  useEffect(() => {
    if (state.ok && isNew) { ref.current?.reset(); setImgKey((k) => k + 1); }
  }, [state, isNew]);

  return (
    <form ref={ref} action={action} className="ad-form">
      {item && <input type="hidden" name="id" value={item.id} />}

      <label><span className="ad-label-title">{kind === "service" ? "Tiêu đề" : kind === "product" ? "Tên sản phẩm" : "Tên dự án"}<em aria-label="bắt buộc">*</em></span>
        <input name="title" defaultValue={item?.title} maxLength={200} required />
      </label>

      {kind === "service" ? (
        <>
          <label>Mô tả ngắn
            <input name="caption" defaultValue={item?.caption} maxLength={200} />
          </label>
          <label>Biểu tượng
            <select name="icon" defaultValue={item?.icon || "rc"}>
              {ICONS.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
            </select>
          </label>
        </>
      ) : kind === "product" ? (
        <>
          <label>Nhóm sản phẩm
            <input name="category" defaultValue={item?.category} maxLength={100} placeholder="Ví dụ: Phế liệu, Vật tư công nghiệp" />
          </label>
          <label>Mô tả ngắn
            <input name="summary" defaultValue={item?.summary} maxLength={240} placeholder="Thông tin nổi bật để hiển thị trên thẻ" />
          </label>
          <label className="ad-wide">Thông tin chi tiết
            <textarea name="description" rows={6} defaultValue={item?.description} maxLength={5000} />
          </label>
          <label className="ad-check">
            <input type="checkbox" name="is_new" defaultChecked={item?.is_new || false} />
            Gắn nhãn sản phẩm mới
          </label>
        </>
      ) : (
        <>
          <label>Dòng giới thiệu ngắn
            <input name="summary" defaultValue={item?.summary} maxLength={200} placeholder="Ví dụ: Sản xuất tại nhà máy A" />
          </label>
          <label>Nội dung chi tiết
            <textarea name="description" rows={5} defaultValue={item?.description} maxLength={3000} />
          </label>
        </>
      )}

      <ImageField
        key={imgKey}
        folder={kind === "service" ? "services" : kind === "product" ? "products" : "projects"}
        initial={item?.image_url ? { url: item.image_url, w: item.image_w, h: item.image_h } : null}
      />

      {kind === "service" && (
        <label>Mô tả ảnh (cho người khiếm thị &amp; Google)
          <input name="alt" defaultValue={item?.alt} maxLength={200} />
        </label>
      )}

      <label className="ad-check">
        <input type="checkbox" name="visible" defaultChecked={item ? item.visible : true} />
        Hiển thị trên website
      </label>

      <div className="ad-bar">
        <SubmitButton>{isNew ? "Thêm mới" : "Lưu"}</SubmitButton>
        <Notice state={state} />
      </div>
    </form>
  );
}
