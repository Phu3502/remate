import { SITE_URL } from "@/lib/site";
import { getProducts } from "@/lib/content";

export default async function sitemap() {
  const now = new Date();
  const products = await getProducts();
  const paths = ["", "/gioi-thieu", "/san-pham", "/du-an", "/doi-tac", ...products.map((p) => `/san-pham/${p.id}`)];
  return paths.map((p) => ({ url: SITE_URL + p, lastModified: now }));
}
