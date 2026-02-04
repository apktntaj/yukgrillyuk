"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Orders", href: "/", count: 24 },
  { label: "Menu", href: "/menu", count: 5 },
  { label: "Inventory", href: "/inventory", count: 42 },
  { label: "Suppliers", href: "/suppliers", count: 6 },
  { label: "Ingredients", href: "/ingredients", count: 28 },
  { label: "Reservations", href: "/reservations", count: 7 },
  { label: "CRM", href: "/crm", count: 214 }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
      <div className="nav-title">YGY Ops</div>
      <div className="nav-sub">Dashboard | Jangan lupa shalat</div>

      <div className="nav-group">
        {navItems.map((item) => {
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item${isActive ? " active" : ""}`}
            >
              {item.label} <span>{item.count}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
