create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins_read_own" on public.admins;
create policy "admins_read_own" on public.admins
  for select to authenticated using (user_id = auth.uid());

create table if not exists public.site_settings (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;

drop policy if exists "settings_read"  on public.site_settings;
drop policy if exists "settings_write" on public.site_settings;
create policy "settings_read"  on public.site_settings for select using (true);
create policy "settings_write" on public.site_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create table if not exists public.services (
  id         uuid primary key default gen_random_uuid(),
  icon       text not null default 'rc' check (icon in ('rc','wr','gr','lf')),
  title      text not null,
  caption    text not null default '',
  image_url  text,
  image_w    int,
  image_h    int,
  alt        text not null default '',
  sort_order int  not null default 0,
  visible    boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.services enable row level security;

drop policy if exists "services_read"  on public.services;
drop policy if exists "services_write" on public.services;
create policy "services_read"  on public.services for select using (visible or public.is_admin());
create policy "services_write" on public.services for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  summary     text not null default '',
  description text not null default '',
  image_url   text,
  image_w     int,
  image_h     int,
  sort_order  int  not null default 0,
  visible     boolean not null default true,
  created_at  timestamptz not null default now()
);
alter table public.projects enable row level security;

drop policy if exists "projects_read"  on public.projects;
drop policy if exists "projects_write" on public.projects;
create policy "projects_read"  on public.projects for select using (visible or public.is_admin());
create policy "projects_write" on public.projects for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  category    text not null default '',
  title       text not null,
  summary     text not null default '',
  description text not null default '',
  image_url   text,
  image_w     int,
  image_h     int,
  is_new      boolean not null default false,
  sort_order  int not null default 0,
  visible     boolean not null default true,
  created_at  timestamptz not null default now()
);
alter table public.products enable row level security;

drop policy if exists "products_read" on public.products;
drop policy if exists "products_write" on public.products;
create policy "products_read" on public.products for select using (visible or public.is_admin());
create policy "products_write" on public.products for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 5242880,
        array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
  set public = true, file_size_limit = 5242880,
      allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "site_images_insert" on storage.objects;
drop policy if exists "site_images_update" on storage.objects;
drop policy if exists "site_images_delete" on storage.objects;
create policy "site_images_insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images' and public.is_admin());
create policy "site_images_update" on storage.objects for update to authenticated
  using (bucket_id = 'site-images' and public.is_admin())
  with check (bucket_id = 'site-images' and public.is_admin());
create policy "site_images_delete" on storage.objects for delete to authenticated
  using (bucket_id = 'site-images' and public.is_admin());

insert into public.site_settings (key, value) values
  ('name',         'ReMate'),
  ('legalName',    'Công ty Cổ phần Vật tư Tái sử dụng ReMate'),
  ('tagline',      'Chi phí tối ưu – Giá trị tối đa'),
  ('description',  'ReMate cung cấp vật tư, máy móc đã qua sử dụng và triển khai các giải pháp kỹ thuật giúp doanh nghiệp tối ưu chi phí, tiết kiệm năng lượng, nâng cao hiệu suất sản xuất.'),
  ('phone',        '032 675 2517'),
  ('email',        'Datnguyenvan1903@gmail.com'),
  ('address',      'Xóm 17, Xã Đồng Hỷ, Thái Nguyên'),
  ('zalo',         'https://zalo.me/0326752517'),
  ('facebook',     ''),
  ('tiktok',       ''),
  ('heroTitle',    'Giải pháp bền vững cho sản xuất hiện đại'),
  ('bandText',     'Đồng hành cùng doanh nghiệp trên hành trình phát triển bền vững'),
  ('partnersLede', 'ReMate hướng tới kết nối các đơn vị cung ứng, doanh nghiệp sản xuất và đối tác kỹ thuật để cùng phát triển những giải pháp hiệu quả, thiết thực và có trách nhiệm với tài nguyên.')
on conflict (key) do nothing;

insert into public.services (icon, title, caption, image_url, image_w, image_h, alt, sort_order)
select * from (values
  ('rc','Mua bán vật tư, máy móc đã qua sử dụng','Đa dạng chủng loại – Chất lượng đảm bảo','/images/service-vat-tu.jpg',1280,963,'Thép ống, thép hộp và tôn tại bãi vật tư',1),
  ('wr','Kiểm tra, bảo trì thiết bị tại nhà máy','Đảm bảo vận hành an toàn, ổn định','/images/service-bao-tri.jpg',960,1280,'Kỹ sư kiểm tra thiết bị tại nhà máy',2),
  ('gr','Thiết kế, gia công, chế tạo máy theo yêu cầu','Linh hoạt theo yêu cầu khách hàng','/images/service-gia-cong.jpg',576,1280,'Khung thép gia công theo yêu cầu',3),
  ('lf','Đo đạc, tư vấn, triển khai các giải pháp tiết kiệm năng lượng','Tối ưu chi phí, nâng cao hiệu suất','/images/service-nang-luong.jpg',1280,1213,'Kỹ sư đo đạc tại nhà máy',4)
) as v(icon,title,caption,image_url,image_w,image_h,alt,sort_order)
where not exists (select 1 from public.services);

