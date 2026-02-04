"use server";

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type MenuItem = {
  id: string;
  name: string;
  serves: string;
  price: number;
  description: string;
};

const dataPath = path.join(process.cwd(), "data", "menu.json");

async function readMenu(): Promise<MenuItem[]> {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    return JSON.parse(raw) as MenuItem[];
  } catch (error) {
    return [];
  }
}

async function writeMenu(items: MenuItem[]) {
  await fs.writeFile(dataPath, JSON.stringify(items, null, 2), "utf8");
}

export async function addMenuItem(formData: FormData) {
  const items = await readMenu();
  const name = String(formData.get("name") || "").trim();
  const serves = String(formData.get("serves") || "").trim();
  const price = Number(formData.get("price") || 0);
  const description = String(formData.get("description") || "").trim();

  if (!name) return;

  const next: MenuItem = {
    id: randomUUID(),
    name,
    serves,
    price: Number.isFinite(price) ? price : 0,
    description
  };

  items.push(next);
  await writeMenu(items);
}

export async function updateMenuItem(formData: FormData) {
  const items = await readMenu();
  const id = String(formData.get("id") || "");

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return;

  const name = String(formData.get("name") || "").trim();
  const serves = String(formData.get("serves") || "").trim();
  const price = Number(formData.get("price") || 0);
  const description = String(formData.get("description") || "").trim();

  items[index] = {
    ...items[index],
    name: name || items[index].name,
    serves,
    price: Number.isFinite(price) ? price : items[index].price,
    description
  };

  await writeMenu(items);
}

export async function deleteMenuItem(formData: FormData) {
  const items = await readMenu();
  const id = String(formData.get("id") || "");
  const next = items.filter((item) => item.id !== id);
  await writeMenu(next);
}

export async function getMenuItems() {
  return readMenu();
}
