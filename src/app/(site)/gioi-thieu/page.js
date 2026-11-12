import Image from "next/image";
import Icon from "@/components/Icon";
import { getSite, getServices } from "@/lib/content";

export async function generateMetadata() {
  const SITE = await getSite();
  return { title: "Giới thiệu", description: SITE.description, alternates: { canonical: "/gioi-thieu" } };
}

export default async function AboutPage() {
  const [SITE, services] = await Promise.all([getSite(), getServices()]);
  return (
    <section className="page">
      <div className="w two">
        <div className="card pic rv">
          <Image src="/images/logo.png" alt={SITE.name} width={700} height={667} />
          <br />
          <span className="cap">{SITE.tagline}</span>
        </div>
        <div className="rv">
          <div className="ey">Về chúng tôi</div>
          <h1 className="h2">{SITE.legalName.replace(SITE.name, SITE.name.toUpperCase())}</h1>
          <p className="lede">{SITE.description}</p>
          <ul className="ck">
            {services.map((s) => (
              <li key={s.id}><span className="cb"><Icon name={s.icon} /></span>{s.title}</li>
            ))}
          </ul>
          <a className="btn" href="#contact">Liên hệ hợp tác</a>
        </div>
      </div>
    </section>
  );
}
