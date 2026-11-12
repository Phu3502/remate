import Image from "next/image";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Dự án",
  description: "Các dự án tiêu biểu của ReMate.",
  alternates: { canonical: "/du-an" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <section className="page">
      <div className="w">
        <div className="ey">Dự án</div>
        <h1 className="h2">Dự án tiêu biểu</h1>
        {projects.length === 0 ? (
          <div className="card" style={{ marginTop: "1.75rem" }}>
            <p style={{ color: "var(--muted)" }}>Nội dung đang được cập nhật.</p>
          </div>
        ) : (
          <div className="pj-grid">
            {projects.map((p) => (
              <article className="pj" key={p.id}>
                {p.image && p.w && p.h && (
                  <Image src={p.image} alt={p.title} width={p.w} height={p.h}
                    sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                )}
                <div className="tx">
                  <h3>{p.title}</h3>
                  {p.summary && <p className="sm">{p.summary}</p>}
                  {p.description && <p className="ds">{p.description}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
