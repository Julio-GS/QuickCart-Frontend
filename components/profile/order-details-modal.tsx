import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/types";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalle de la orden #{order.id}</DialogTitle>
        </DialogHeader>
        <div className="mb-2 text-sm text-muted-foreground">
          <div>
            <b>Estado:</b> {order.status}
          </div>
          <div>
            <b>Dirección de envío:</b> {order.deliveryAddress}
          </div>
          <div>
            <b>Fecha:</b>{" "}
            {new Date(order.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>
            <b>Total:</b> ${(order.totalAmountInCents / 100).toFixed(2)}
          </div>
        </div>
        <h4 className="font-semibold mb-2">Productos comprados</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio unitario</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${(item.priceInCents / 100).toFixed(2)}</TableCell>
                <TableCell>${item.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
