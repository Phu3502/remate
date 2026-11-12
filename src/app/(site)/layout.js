import Splash from "@/components/Splash";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { getSite } from "@/lib/content";

export const revalidate = 3600;

export default async function SiteLayout({ children }) {
  const SITE = await getSite();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    telephone: SITE.phoneIntl,
    email: SITE.email,
    address: { "@type": "PostalAddress", streetAddress: SITE.address, addressCountry: "VN" },
  };
  return (
    <>
      <Splash />
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
    </>
  );
}
