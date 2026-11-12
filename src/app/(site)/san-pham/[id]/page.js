import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getSite } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Không tìm thấy sản phẩm" };
  return {
    title: product.title,
    description: product.summary || product.description.slice(0, 160),
    alternates: { canonical: `/san-pham/${product.id}` },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const [product, site] = await Promise.all([getProduct(id), getSite()]);
  if (!product) notFound();
  return (
    <section className="page product-detail-page">
      <div className="w">
        <Link className="product-back" href="/san-pham">← Tất cả sản phẩm</Link>
        <article className="product-detail">
          <div className="product-detail-image">
            {product.image && product.w && product.h
              ? <Image src={product.image} alt={product.title} width={product.w} height={product.h} priority sizes="(max-width: 760px) 100vw, 50vw" />
              : <span className="product-placeholder">ReMate</span>}
          </div>
          <div className="product-detail-content">
            {product.category && <div className="ey">{product.category}</div>}
            <h1 className="h2">{product.title}</h1>
            {product.summary && <p className="product-detail-summary">{product.summary}</p>}
            {product.description && <div className="product-detail-description">{product.description}</div>}
            <div className="product-detail-contact">
              <a className="btn" href={site.phoneHref}>Liên hệ: {site.phone}</a>
              <a className="btn o" href={`mailto:${site.email}`}>Gửi email</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
