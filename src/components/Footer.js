import Image from "next/image";
import Icon from "@/components/Icon";
import { getSite, getServices } from "@/lib/content";

export default async function Footer() {
  const [SITE, services] = await Promise.all([getSite(), getServices()]);
  return (
    <footer className="ft" id="contact">
      <div className="w">
        <div className="cols">
          <div>
            <Image className="wm" src="/images/remate-wordmark-white.png" alt={SITE.name} width={400} height={87} />
            <p className="co">{SITE.legalName}</p>
            <p className="sl">{SITE.tagline}</p>
          </div>
          <div>
            <h4>Lĩnh vực</h4>
            <ul>
              {services.map((s) => (<li key={s.id}>{s.title}</li>))}
            </ul>
          </div>
          <div>
            <h4>Liên hệ</h4>
            <dl>
              <div><dt>Số điện thoại</dt><dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></div>
              <div>
                <dt>Địa chỉ</dt>
                <dd className="ad">
                  <span>{SITE.address}</span>
                  <a className="mp" href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" aria-label="Xem địa chỉ trên Google Maps" title="Xem trên Google Maps">
                    <Icon name="pn" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="cp">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
