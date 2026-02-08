import { addOrder, deleteOrder, getOrders, updateOrder } from "@/app/admin/orders/actions";
import OrderAddModal from "@/components/OrderAddModal";
import OrderCard from "@/components/OrderCard";

export default async function AdminHomePage() {
  const orders = await getOrders();

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">Order Management</div>
          <div className="muted">Pantau order aktif dan siap kirim.</div>
        </div>
        <div className="toolbar">
          <div className="badge">Total order: {orders.length}</div>
          <OrderAddModal action={addOrder} />
        </div>
      </div>

      <div className="section">
        <div className="grid">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdate={updateOrder}
              onDelete={deleteOrder}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
