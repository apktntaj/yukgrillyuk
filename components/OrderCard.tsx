"use client";

import { useRef } from "react";
import type { OrderItem } from "@/app/admin/orders/actions";

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

const statusOptions = [
  "inquiry",
  "confirmed",
  "in_transit",
  "delivered",
  "returned",
  "cancelled"
];

const channelOptions = ["Delivery", "Pickup"];

export default function OrderCard({
  order,
  onUpdate,
  onDelete
}: {
  order: OrderItem;
  onUpdate: (formData: FormData) => void | Promise<void>;
  onDelete: (formData: FormData) => void | Promise<void>;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const orderCountLabel = order.orderCount > 0 ? `${order.orderCount}x order` : "new";
  const statusClass = `tag status-${order.status}`;

  return (
    <div className="card order-card span-6">
      <div className="menu-card-header">
        <div>
          <div className="menu-title">{order.customer}</div>
          <div className="muted">{order.phone || "-"}</div>
        </div>
        <div className="menu-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            aria-label={`Edit ${order.id}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42L18.37 3.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"
                fill="currentColor"
              />
            </svg>
          </button>
          <form action={onDelete}>
            <input type="hidden" name="id" value={order.id} />
            <button className="icon-button" type="submit" aria-label={`Hapus ${order.id}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zm3.46-8.12 1.41-1.41L12 10.59l1.12-1.12 1.41 1.41L13.41 12l1.12 1.12-1.41 1.41L12 13.41l-1.13 1.12-1.41-1.41L10.59 12l-1.13-1.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="order-meta">
        <span className={statusClass}>{order.status}</span>
        <span className="tag">{orderCountLabel}</span>
        <span className="muted">{order.scheduled}</span>
      </div>

      {order.address ? <div className="order-items">{order.address}</div> : null}
      <div className="order-items">{order.items}</div>

      <div className="order-footer">
        <div className="muted">{order.id}</div>
        <div className="menu-price">{currency.format(order.total)}</div>
      </div>

      {order.notes ? <div className="order-notes">Catatan: {order.notes}</div> : null}

      <dialog className="modal" ref={dialogRef}>
        <div className="modal-header">
          <div>
            <div className="section-title">Update {order.id}</div>
            <div className="muted">Perbarui detail order pelanggan.</div>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Tutup"
          >
            ×
          </button>
        </div>
        <form
          action={onUpdate}
          className="form-grid"
          onSubmit={() => dialogRef.current?.close()}
        >
          <input type="hidden" name="id" value={order.id} />
          <label className="field">
            <span>Nama pelanggan</span>
            <input name="customer" defaultValue={order.customer} />
          </label>
          <label className="field">
            <span>No. HP</span>
            <input name="phone" defaultValue={order.phone} />
          </label>
          <label className="field full">
            <span>Alamat pengiriman</span>
            <textarea name="address" rows={2} defaultValue={order.address} />
          </label>
          <label className="field">
            <span>Channel</span>
            <select name="channel" defaultValue={order.channel}>
              {channelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Status</span>
            <select name="status" defaultValue={order.status}>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Jadwal</span>
            <input name="scheduled" defaultValue={order.scheduled} />
          </label>
          <label className="field">
            <span>Total (IDR)</span>
            <input name="total" type="number" min="0" step="1000" defaultValue={order.total} />
          </label>
          <label className="field">
            <span>Jumlah order sebelumnya</span>
            <input name="orderCount" type="number" min="0" step="1" defaultValue={order.orderCount} />
          </label>
          <label className="field full">
            <span>Items</span>
            <textarea name="items" rows={3} defaultValue={order.items} />
          </label>
          <label className="field full">
            <span>Catatan</span>
            <textarea name="notes" rows={2} defaultValue={order.notes} />
          </label>
          <div className="row-actions">
            <button className="button primary" type="submit">
              Simpan perubahan
            </button>
            <button
              className="button"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              Batal
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
