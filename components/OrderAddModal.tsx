"use client";

import { useRef } from "react";

const statusOptions = [
  "inquiry",
  "confirmed",
  "in_transit",
  "delivered",
  "returned",
  "cancelled"
];

const channelOptions = ["Delivery", "Pickup"];

export default function OrderAddModal({
  action
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        className="button primary"
        type="button"
        onClick={() => dialogRef.current?.showModal()}
      >
        Tambah Order
      </button>

      <dialog className="modal" ref={dialogRef}>
        <div className="modal-header">
          <div>
            <div className="section-title">Tambah Order Baru</div>
            <div className="muted">Lengkapi detail order pelanggan.</div>
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
          action={action}
          className="form-grid"
          onSubmit={() => dialogRef.current?.close()}
        >
          <label className="field">
            <span>Nama pelanggan</span>
            <input name="customer" placeholder="Nama pelanggan" required />
          </label>
          <label className="field">
            <span>No. HP</span>
            <input name="phone" placeholder="08xxxxxxxxxx" />
          </label>
          <label className="field full">
            <span>Alamat pengiriman</span>
            <textarea name="address" rows={2} placeholder="Alamat lengkap" />
          </label>
          <label className="field">
            <span>Channel</span>
            <select name="channel" defaultValue="Delivery">
              {channelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Status</span>
            <select name="status" defaultValue="inquiry">
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Jadwal</span>
            <input name="scheduled" placeholder="Hari ini 18:30" />
          </label>
          <label className="field">
            <span>Total (IDR)</span>
            <input name="total" type="number" min="0" step="1000" placeholder="119000" />
          </label>
          <label className="field">
            <span>Jumlah order sebelumnya</span>
            <input name="orderCount" type="number" min="0" step="1" placeholder="0" />
          </label>
          <label className="field full">
            <span>Items</span>
            <textarea name="items" rows={3} placeholder="Paket Durang x1" required />
          </label>
          <label className="field full">
            <span>Catatan</span>
            <textarea name="notes" rows={2} placeholder="Catatan tambahan" />
          </label>
          <div className="row-actions">
            <button className="button primary" type="submit">
              Simpan order
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
    </>
  );
}
