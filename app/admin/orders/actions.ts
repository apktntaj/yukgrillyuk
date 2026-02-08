"use server";

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type OrderItem = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  channel: string;
  status: string;
  scheduled: string;
  total: number;
  items: string;
  notes: string;
  orderCount: number;
};

const dataPath = path.join(process.cwd(), "data", "orders.json");

async function readOrders(): Promise<OrderItem[]> {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    return JSON.parse(raw) as OrderItem[];
  } catch {
    return [];
  }
}

async function writeOrders(items: OrderItem[]) {
  await fs.writeFile(dataPath, JSON.stringify(items, null, 2), "utf8");
}

export async function addOrder(formData: FormData) {
  const orders = await readOrders();
  const customer = String(formData.get("customer") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const channel = String(formData.get("channel") || "").trim();
  const status = String(formData.get("status") || "").trim();
  const scheduled = String(formData.get("scheduled") || "").trim();
  const total = Number(formData.get("total") || 0);
  const items = String(formData.get("items") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const orderCount = Number(formData.get("orderCount") || 0);

  if (!customer || !items) return;

  const next: OrderItem = {
    id: `ORD-${randomUUID().slice(0, 6).toUpperCase()}`,
    customer,
    phone,
    address,
    channel: channel || "Delivery",
    status: status || "inquiry",
    scheduled,
    total: Number.isFinite(total) ? total : 0,
    items,
    notes,
    orderCount: Number.isFinite(orderCount) ? orderCount : 0
  };

  orders.unshift(next);
  await writeOrders(orders);
}

export async function updateOrder(formData: FormData) {
  const orders = await readOrders();
  const id = String(formData.get("id") || "");
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return;

  const customer = String(formData.get("customer") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const channel = String(formData.get("channel") || "").trim();
  const status = String(formData.get("status") || "").trim();
  const scheduled = String(formData.get("scheduled") || "").trim();
  const total = Number(formData.get("total") || 0);
  const items = String(formData.get("items") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const orderCount = Number(formData.get("orderCount") || 0);

  orders[index] = {
    ...orders[index],
    customer: customer || orders[index].customer,
    phone,
    address,
    channel,
    status,
    scheduled,
    total: Number.isFinite(total) ? total : orders[index].total,
    items,
    notes,
    orderCount: Number.isFinite(orderCount) ? orderCount : orders[index].orderCount
  };

  await writeOrders(orders);
}

export async function deleteOrder(formData: FormData) {
  const orders = await readOrders();
  const id = String(formData.get("id") || "");
  await writeOrders(orders.filter((order) => order.id !== id));
}

export async function getOrders() {
  return readOrders();
}
