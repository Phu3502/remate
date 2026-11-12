import Image from "next/image";
import Icon from "@/components/Icon";
import { getSite } from "@/lib/content";

export const metadata = {
  title: "Đối tác",
  description: "ReMate kết nối đơn vị cung ứng, doanh nghiệp sản xuất và đối tác kỹ thuật để cùng tạo giá trị bền vững.",
  alternates: { canonical: "/doi-tac" },
};

export default async function PartnersPage() {
  const SITE = await getSite();
  return (
    <section className="page">
      <div className="w two">
        <div className="rv">
          <div className="ey">Mạng lưới hợp tác</div>
          <h1 className="h2">Kết nối nguồn lực.<em>Cùng tạo giá trị bền vững.</em></h1>
          <p className="lede">{SITE.partnersLede}</p>
          <div className="row" style={{ marginTop: "1.6rem" }}>
            <a className="btn" href="#contact">Khám phá cơ hội hợp tác <Icon name="ar" /></a>
          </div>
          <div className="vals">
            {["Minh bạch", "Linh hoạt", "Cùng phát triển"].map((v) => (
              <span key={v}><Icon name="ck" />{v}</span>
            ))}
          </div>
        </div>
        <div className="orb rv">
          <div className="core"><Image src="/images/logo-icon.png" alt="ReMate" width={240} height={176} /></div>
          <span className="pl" style={{ top: "12%", left: "2%" }}>Vật tư &amp; máy móc</span>
          <span className="pl" style={{ top: "42%", right: "-2%" }}>Bảo trì thiết bị</span>
          <span className="pl" style={{ bottom: "12%", left: "6%" }}>Thiết kế &amp; chế tạo</span>
        </div>
      </div>
    </section>
  );
}
