import Image from "next/image";
import ServiceCards from "@/components/ServiceCards";
import ProductCards from "@/components/ProductCards";
import Icon from "@/components/Icon";
import { getSite } from "@/lib/content";

export default async function HomePage() {
  const SITE = await getSite();
  return (
    <>
      <section className="hero">
        <div className="w">
          <div className="id rv">
            <Image src="/images/logo.png" alt={SITE.name} width={700} height={667} priority />
            <h2>{SITE.legalName}</h2>
            <div className="tag">{SITE.tagline}</div>
          </div>
          <div className="hl rv">
            <h1>{SITE.heroTitle}</h1>
            <p>{SITE.description}</p>
            <div className="row">
              <a className="btn" href="/san-pham">Sản phẩm kinh doanh</a>
              <a className="btn o" href="#services">Dịch vụ cung cấp</a>
            </div>
          </div>
        </div>
      </section>

      <ServiceCards />
      <ProductCards />

      <div className="band">
        <div className="w">
          <p><Icon name="lf" />{SITE.bandText}</p>
        </div>
      </div>
    </>
  );
}
