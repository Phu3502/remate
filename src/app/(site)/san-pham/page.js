import { getProducts, getSite } from "@/lib/content";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Sản phẩm",
  description: "Danh mục vật tư, máy móc và sản phẩm ReMate đang cung cấp.",
  alternates: { canonical: "/san-pham" },
};

export default async function ProductsPage() {
  const [products, site] = await Promise.all([getProducts(), getSite()]);
  return (
    <section className="page products-page">
      <div className="w">
        <div className="ey">Sản phẩm</div>
        <h1 className="h2">Danh mục sản phẩm</h1>
        <p className="lede">Khám phá các sản phẩm và vật tư ReMate đang cung cấp.</p>
        {products.length ? (
          <div className="product-grid product-grid-all">
            {products.map((product) => <ProductCard key={product.id} product={product} phoneHref={site.phoneHref} />)}
          </div>
        ) : (
          <div className="products-empty">Danh mục sản phẩm đang được cập nhật. Vui lòng liên hệ với ReMate để được tư vấn.</div>
        )}
      </div>
    </section>
  );
}
