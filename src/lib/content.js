import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { DEFAULT_SITE, DEFAULT_SERVICES, SITE_URL } from "@/lib/site";

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function derive(s) {
  const digits = s.phone.replace(/\D/g, "");
  return {
    ...s,
    url: SITE_URL,
    phoneHref: `tel:${digits}`,
    phoneIntl: "+84" + digits.replace(/^0/, ""),
    zalo: s.zalo || (digits ? `https://zalo.me/${digits}` : ""),
    mapUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.address),
  };
}

export const getSite = cache(async () => {
  const db = publicClient();
  let merged = { ...DEFAULT_SITE };
  if (db) {
    const { data, error } = await db.from("site_settings").select("key,value");
    if (!error && data) {
      for (const { key, value } of data) if (key in DEFAULT_SITE) merged[key] = value;
    }
  }
  return derive(merged);
});

export const getServices = cache(async () => {
  const db = publicClient();
  if (!db) return DEFAULT_SERVICES;
  const { data, error } = await db.from("services").select("*").eq("visible", true).order("sort_order");
  if (error || !data) return DEFAULT_SERVICES;
  return data.map((r) => ({
    id: r.id, icon: r.icon, title: r.title, caption: r.caption,
    image: r.image_url, w: r.image_w, h: r.image_h, alt: r.alt || r.title,
  }));
});

export const getProjects = cache(async () => {
  const db = publicClient();
  if (!db) return [];
  const { data, error } = await db.from("projects").select("*").eq("visible", true).order("sort_order");
  if (error || !data) return [];
  return data.map((r) => ({
    id: r.id, title: r.title, summary: r.summary, description: r.description,
    image: r.image_url, w: r.image_w, h: r.image_h,
  }));
});

export const getProducts = cache(async () => {
  const db = publicClient();
  if (!db) return [];
  const { data, error } = await db.from("products").select("*").eq("visible", true).order("sort_order");
  if (error || !data) return [];
  return data.map((r) => ({
    id: r.id, category: r.category, title: r.title, summary: r.summary,
    description: r.description, image: r.image_url, w: r.image_w, h: r.image_h,
    isNew: r.is_new,
  }));
});

export const getProduct = cache(async (id) => {
  const db = publicClient();
  if (!db) return null;
  const { data, error } = await db.from("products").select("*").eq("id", id).eq("visible", true).maybeSingle();
  if (error || !data) return null;
  return {
    id: data.id, category: data.category, title: data.title, summary: data.summary,
    description: data.description, image: data.image_url, w: data.image_w, h: data.image_h,
    isNew: data.is_new,
  };
});
