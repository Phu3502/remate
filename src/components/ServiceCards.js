import Image from "next/image";
import Icon from "@/components/Icon";
import { getServices } from "@/lib/content";

export default async function ServiceCards() {
  const services = await getServices();
  return (
    <section className="sec" id="services" aria-label="Lĩnh vực hoạt động">
      <div className="w g4">
        {services.map((s) => (
          <article className="pc" key={s.id}>
            {s.image && s.w && s.h && (
              <Image src={s.image} alt={s.alt} width={s.w} height={s.h}
                sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 25vw" />
            )}
            <div className="tx">
              <span className="ci"><Icon name={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
