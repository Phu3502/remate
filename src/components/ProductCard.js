import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, phoneHref }) {
  return (
    <article className="product-card">
      <Link className="product-card-media" href={`/san-pham/${product.id}`} aria-label={`Xem chi tiết ${product.title}`}>
        {product.image && product.w && product.h ? (
          <Image src={product.image} alt={product.title} width={product.w} height={product.h}
            sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 25vw" />
        ) : <span className="product-placeholder">ReMate</span>}
        {product.category && <span className="product-category">{product.category}</span>}
        {product.isNew && <span className="product-new">Mới</span>}
      </Link>
      <div className="product-card-body">
        <h2><Link href={`/san-pham/${product.id}`}>{product.title}</Link></h2>
        {product.summary && <p>{product.summary}</p>}
        <div className="product-card-actions">
          <a href={phoneHref}>Liên hệ</a>
          <Link href={`/san-pham/${product.id}`}>Xem chi tiết <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}
