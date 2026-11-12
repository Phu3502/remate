import Link from "next/link";
import { getProducts, getSite } from "@/lib/content";
import ProductCard from "@/components/ProductCard";

export default async function ProductCards() {
  const [products, site] = await Promise.all([getProducts(), getSite()]);
  const featured = products.slice(0, 4);
  return (
    <section className="products-section" aria-labelledby="products-heading">
      <div className="w">
        <div className="products-heading-row">
          <div>
            <div className="ey">Sản phẩm</div>
            <h2 className="h2" id="products-heading">Sản phẩm nổi bật</h2>
            <p className="lede">Vật tư, máy móc đã qua sử dụng – đa dạng chủng loại, chất lượng đảm bảo.</p>
          </div>
          <Link className="btn o products-all" href="/san-pham">Tất cả sản phẩm <span aria-hidden="true">→</span></Link>
        </div>
        {featured.length ? (
          <div className="product-grid">
            {featured.map((product) => <ProductCard key={product.id} product={product} phoneHref={site.phoneHref} />)}
          </div>
        ) : (
          <div className="products-empty">Sản phẩm đang được cập nhật. Vui lòng liên hệ với ReMate để được tư vấn.</div>
        )}
      </div>
    </section>
  );
}
