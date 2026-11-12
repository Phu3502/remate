import Icon from "@/components/Icon";
import { getSite } from "@/lib/content";

export default async function FloatingButtons() {
  const SITE = await getSite();
  return (
    <div className="fl">
      {SITE.facebook && (<a className="fb" href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>)}
      {SITE.zalo && (<a className="zl" href={SITE.zalo} target="_blank" rel="noopener noreferrer" aria-label="Chat Zalo">Zalo</a>)}
      {SITE.tiktok && (<a className="tt" href={SITE.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">♪</a>)}
      <a className="cl" href={SITE.phoneHref} aria-label="Gọi ngay"><Icon name="ph" /></a>
    </div>
  );
}
