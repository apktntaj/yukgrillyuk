"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Orders", href: "/admin", count: 24 },
  { label: "Menu", href: "/admin/menu", count: 5 },
  { label: "Inventory", href: "/admin/inventory", count: 42 },
  { label: "Suppliers", href: "/admin/suppliers", count: 6 },
  { label: "Ingredients", href: "/admin/ingredients", count: 28 },
  { label: "Reservations", href: "/admin/reservations", count: 7 },
  { label: "CRM", href: "/admin/crm", count: 214 }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
      <div className="nav-title">F&B Ops</div>
      <div className="nav-sub">Internal Dashboard</div>

      <div className="nav-group">
        {navItems.map((item) => {
          const isActive = item.href === "/admin"
            ? pathname === "/admin"
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
