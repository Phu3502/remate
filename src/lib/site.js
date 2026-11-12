export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const DEFAULT_SITE = {
  name: "ReMate",
  legalName: "Công ty Cổ phần Vật tư Tái sử dụng ReMate",
  tagline: "Chi phí tối ưu – Giá trị tối đa",
  description:
    "ReMate cung cấp vật tư, máy móc đã qua sử dụng và triển khai các giải pháp kỹ thuật giúp doanh nghiệp tối ưu chi phí, tiết kiệm năng lượng, nâng cao hiệu suất sản xuất.",
  phone: "032 675 2517",
  email: "Datnguyenvan1903@gmail.com",
  address: "Xóm 17, Xã Đồng Hỷ, Thái Nguyên",
  zalo: "https://zalo.me/0326752517",
  facebook: "",
  tiktok: "",
  heroTitle: "Giải pháp bền vững cho sản xuất hiện đại",
  bandText: "Đồng hành cùng doanh nghiệp trên hành trình phát triển bền vững",
  partnersLede:
    "ReMate hướng tới kết nối các đơn vị cung ứng, doanh nghiệp sản xuất và đối tác kỹ thuật để cùng phát triển những giải pháp hiệu quả, thiết thực và có trách nhiệm với tài nguyên.",
};

export const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/du-an", label: "Dự án" },
  { href: "/doi-tac", label: "Đối tác" },
  { href: "#contact", label: "Liên hệ" },
];

export const ICONS = [
  { value: "rc", label: "Tái chế (mũi tên xoay)" },
  { value: "wr", label: "Cờ lê (bảo trì)" },
  { value: "gr", label: "Bánh răng (gia công)" },
  { value: "lf", label: "Chiếc lá (tiết kiệm năng lượng)" },
];

export const DEFAULT_SERVICES = [
  { id: "d1", icon: "rc", title: "Mua bán vật tư, máy móc đã qua sử dụng", caption: "Đa dạng chủng loại – Chất lượng đảm bảo",
    image: "/images/service-vat-tu.jpg", w: 1280, h: 963, alt: "Thép ống, thép hộp và tôn tại bãi vật tư" },
  { id: "d2", icon: "wr", title: "Kiểm tra, bảo trì thiết bị tại nhà máy", caption: "Đảm bảo vận hành an toàn, ổn định",
    image: "/images/service-bao-tri.jpg", w: 960, h: 1280, alt: "Kỹ sư kiểm tra thiết bị tại nhà máy" },
  { id: "d3", icon: "gr", title: "Thiết kế, gia công, chế tạo máy theo yêu cầu", caption: "Linh hoạt theo yêu cầu khách hàng",
    image: "/images/service-gia-cong.jpg", w: 576, h: 1280, alt: "Khung thép gia công theo yêu cầu" },
  { id: "d4", icon: "lf", title: "Đo đạc, tư vấn, triển khai các giải pháp tiết kiệm năng lượng", caption: "Tối ưu chi phí, nâng cao hiệu suất",
    image: "/images/service-nang-luong.jpg", w: 1280, h: 1213, alt: "Kỹ sư đo đạc tại nhà máy" },
];

export const SETTING_GROUPS = [
  {
    title: "Thương hiệu",
    fields: [
      { key: "legalName", label: "Tên công ty đầy đủ", required: true, max: 160 },
      { key: "tagline", label: "Khẩu hiệu", required: true, max: 120 },
      { key: "description", label: "Mô tả ngắn", type: "textarea", required: true, max: 600,
        hint: "Hiện ở trang chủ, trang Giới thiệu và khi chia sẻ link lên mạng xã hội." },
    ],
  },
  {
    title: "Liên hệ",
    fields: [
      { key: "phone", label: "Số điện thoại", required: true, max: 20, hint: "Ví dụ: 032 675 2517" },
      { key: "email", label: "Email", type: "email", required: true, max: 120 },
      { key: "address", label: "Địa chỉ", required: true, max: 200 },
      { key: "zalo", label: "Link Zalo", type: "url", max: 200, hint: "Ví dụ: https://zalo.me/0326752517" },
      { key: "facebook", label: "Link Facebook", type: "url", max: 200, hint: "Để trống thì nút Facebook tự ẩn." },
      { key: "tiktok", label: "Link TikTok", type: "url", max: 200, hint: "Để trống thì nút TikTok tự ẩn." },
    ],
  },
  {
    title: "Nội dung trang chủ",
    fields: [
      { key: "heroTitle", label: "Tiêu đề lớn", required: true, max: 120 },
      { key: "bandText", label: "Dòng chữ ở dải xanh cuối trang", required: true, max: 160 },
    ],
  },
  {
    title: "Trang Đối tác",
    fields: [{ key: "partnersLede", label: "Đoạn giới thiệu", type: "textarea", required: true, max: 600 }],
  },
];
