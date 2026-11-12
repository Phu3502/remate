import ItemForm from "./ItemForm";
import ItemTools from "./ItemTools";

export default function ItemList({ kind, items }) {
  const table = kind === "service" ? "services" : kind === "product" ? "products" : "projects";
  const noun = kind === "service" ? "dịch vụ" : kind === "product" ? "sản phẩm" : "dự án";

  return (
    <>
      <details className="ad-card ad-new" open={items.length === 0}>
        <summary>＋ Thêm {noun} mới</summary>
        <ItemForm kind={kind} />
      </details>

      {items.length === 0 && <p className="ad-empty">Chưa có {noun} nào.</p>}

      {items.map((it, i) => (
        <div className="ad-item" key={it.id}>
          <details className="ad-card">
            <summary>
              <span className="ad-mini">{it.image_url ? <img src={it.image_url} alt="" /> : null}</span>
              <span className="ad-t">{it.title}</span>
              {!it.visible && <span className="ad-tag">Đang ẩn</span>}
            </summary>
            <ItemForm kind={kind} item={it} />
          </details>
          <ItemTools table={table} id={it.id} title={it.title} noun={noun} index={i} count={items.length} />
        </div>
      ))}
    </>
  );
}
