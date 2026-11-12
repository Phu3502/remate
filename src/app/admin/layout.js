import "./admin.css";

export const metadata = {
  title: "Quản trị",
  robots: { index: false, follow: false },
};

export default function AdminRoot({ children }) {
  return <div className="ad">{children}</div>;
}
