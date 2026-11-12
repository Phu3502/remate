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
create policy "products_read" on public.products for select
  using (visible or public.is_admin());
create policy "products_write" on public.products for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
