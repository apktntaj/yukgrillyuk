import { addMenuItem, deleteMenuItem, getMenuItems, updateMenuItem } from "./actions";
import MenuAddModal from "@/components/MenuAddModal";
import MenuCard from "@/components/MenuCard";

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">Menu Management</div>
          <div className="muted">Kelola menu paket, harga, dan rincian isi.</div>
        </div>
        <div className="toolbar">
          <div className="badge">Total menu: {items.length}</div>
          <MenuAddModal action={addMenuItem} />
        </div>
      </div>

      <div className="section">
        <div className="grid">
          {items.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onUpdate={updateMenuItem}
              onDelete={deleteMenuItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
