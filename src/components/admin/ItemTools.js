"use client";
import { useActionState } from "react";
import { deleteItem, moveItem } from "@/app/admin/actions";
import Notice from "./Notice";

export default function ItemTools({ table, id, title, noun, index, count }) {
  const [moveState, moveAction, moving] = useActionState(moveItem, {});
  const [deleteState, deleteAction, deleting] = useActionState(deleteItem, {});

  return (
    <div className="ad-tools">
      <form action={moveAction}>
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="id" value={id} />
        <button name="dir" value="up" disabled={index === 0 || moving || deleting} aria-label="Chuyển lên" title="Chuyển lên">↑</button>
        <button name="dir" value="down" disabled={index === count - 1 || moving || deleting} aria-label="Chuyển xuống" title="Chuyển xuống">↓</button>
      </form>
      <form action={deleteAction} onSubmit={(e) => { if (!confirm(`Xóa ${noun} "${title}"? Không thể hoàn tác.`)) e.preventDefault(); }}>
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="id" value={id} />
        <button className="del" disabled={moving || deleting} aria-label="Xóa" title="Xóa">{deleting ? "…" : "🗑"}</button>
      </form>
      <Notice state={moveState} />
      <Notice state={deleteState} />
    </div>
  );
}
