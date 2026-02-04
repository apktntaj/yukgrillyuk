"use client";

import { useRef } from "react";
import type { MenuItem } from "@/app/menu/actions";

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

export default function MenuCard({
  item,
  onUpdate,
  onDelete
}: {
  item: MenuItem;
  onUpdate: (formData: FormData) => void | Promise<void>;
  onDelete: (formData: FormData) => void | Promise<void>;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const descriptionLines = item.description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="card menu-card span-4">
      <div className="menu-card-header">
        <div>
          <div className="menu-title">{item.name}</div>
          <div className="muted">{item.serves}</div>
        </div>
        <div className="menu-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            aria-label={`Edit ${item.name}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42L18.37 3.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"
                fill="currentColor"
              />
            </svg>
          </button>
          <form action={onDelete}>
            <input type="hidden" name="id" value={item.id} />
            <button className="icon-button" type="submit" aria-label={`Hapus ${item.name}`}>
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

      <div className="menu-price">{currency.format(item.price)}</div>

      <details className="description">
        <summary>Read more</summary>
        <div className="description-text">
          {descriptionLines.map((line, index) => (
            <div key={`${item.id}-line-${index}`}>{line}</div>
          ))}
        </div>
      </details>

      <dialog className="modal" ref={dialogRef}>
        <div className="modal-header">
          <div>
            <div className="section-title">Update {item.name}</div>
            <div className="muted">Perbarui nama, harga, dan rincian paket.</div>
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
          <input type="hidden" name="id" value={item.id} />
          <label className="field">
            <span>Nama paket</span>
            <input name="name" defaultValue={item.name} />
          </label>
          <label className="field">
            <span>Porsi</span>
            <input name="serves" defaultValue={item.serves} />
          </label>
          <label className="field">
            <span>Harga (IDR)</span>
            <input name="price" type="number" min="0" step="1000" defaultValue={item.price} />
          </label>
          <label className="field full">
            <span>Deskripsi / Rincian</span>
            <textarea name="description" rows={6} defaultValue={item.description} />
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
