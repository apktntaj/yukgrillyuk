"use client";

import { useRef } from "react";

export default function MenuAddModal({
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
        Tambah Menu
      </button>

      <dialog className="modal" ref={dialogRef}>
        <div className="modal-header">
          <div>
            <div className="section-title">Tambah Menu Baru</div>
            <div className="muted">Gunakan format isi satu baris per item.</div>
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
            <span>Nama paket</span>
            <input name="name" placeholder="Paket Baru" required />
          </label>
          <label className="field">
            <span>Porsi</span>
            <input name="serves" placeholder="2-3 orang" />
          </label>
          <label className="field">
            <span>Harga (IDR)</span>
            <input name="price" type="number" min="0" step="1000" placeholder="119000" />
          </label>
          <label className="field full">
            <span>Deskripsi / Rincian</span>
            <textarea
              name="description"
              rows={6}
              placeholder="Beef slice - 250 gr\nChicken - 250 gr\n..."
            />
          </label>
          <div className="row-actions">
            <button className="button primary" type="submit">
              Simpan menu
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
