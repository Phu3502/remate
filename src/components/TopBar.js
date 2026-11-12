import { getSite } from "@/lib/content";

export default async function TopBar() {
  const SITE = await getSite();
  return (
    <div className="top">
      <div className="w">
        <div>
          <span>☎ {SITE.phone}</span>
          <span>✉ {SITE.email}</span>
        </div>
        <div className="r">
          <span>⌖ {SITE.address}</span>
        </div>
      </div>
    </div>
  );
}
