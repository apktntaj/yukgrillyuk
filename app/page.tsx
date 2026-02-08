import { promises as fs } from "fs";
import path from "path";

type MenuItem = {
  id: string;
  name: string;
  serves: string;
  price: number;
  description: string;
};

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

async function getMenu(): Promise<MenuItem[]> {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "data", "menu.json"), "utf8");
    return JSON.parse(raw) as MenuItem[];
  } catch {
    return [];
  }
}

export default async function LandingPage() {
  const items = await getMenu();
  const waNumber =
    process.env.WHATSAPP_ADMIN ||
    process.env.WHATSAPP_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "";
  const waLink = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(
        "Halo, saya ingin pesan paket YGY."
      )}`
    : "#";

  const testimonials = [
    {
      name: "Dina",
      note: "Paketnya lengkap dan praktis. Tinggal grill, semuanya sudah siap."
    },
    {
      name: "Raka",
      note: "Rasa dan porsinya pas untuk rame-rame. Sangat membantu."
    },
    {
      name: "Salsa",
      note: "Pengiriman cepat, alat grill bersih dan siap pakai."
    }
  ];

  return (
    <div className="landing">
      <header className="landing-hero">
        <div className="landing-kicker">YGY Grill Set</div>
        <div className="landing-title">
          Paket grill lengkap untuk acara rame-rame, rapi, dan cepat.
        </div>
        <div className="landing-subtitle">
          Setiap paket sudah termasuk 1 set alat grill. Cocok untuk keluarga, kantor,
          atau kumpul bareng.
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <div className="section-title" id="menu">
            Daftar Menu
          </div>
          <div className="muted">Paket lengkap + 1 set alat grill</div>
        </div>

        <div className="menu-carousel">
          {items.map((item) => {
            const descriptionLines = item.description
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
              ;

            return (
              <div className="menu-card-public" key={item.id}>
                <div className="menu-row-title">{item.name}</div>
                <div className="menu-row-sub">{item.serves}</div>
                <div className="menu-row-price">{currency.format(item.price)}</div>
                <details className="menu-row-desc">
                  <summary>Read more</summary>
                  <div className="menu-row-desc-text">
                    {descriptionLines.map((line, index) => (
                      <div key={`${item.id}-desc-${index}`}>{line}</div>
                    ))}
                  </div>
                </details>
                <div className="menu-card-actions">
                  <a className="button maroon" href={waLink} target="_blank" rel="noreferrer">
                    Yuk Tanya Yuk
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="carousel-hint muted">Geser untuk melihat paket lainnya.</div>
      </section>

      <section className="section">
        <div className="section-header">
          <div className="section-title">Testimoni</div>
          <div className="muted">Kesan dari pelanggan</div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <div className="card testimonial-card" key={item.name}>
              <div className="testimonial-note">“{item.note}”</div>
              <div className="muted">— {item.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
