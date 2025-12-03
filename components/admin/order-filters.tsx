import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderFiltersProps {
  statusFilter: string;
  searchId: string;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export function OrderFilters({
  statusFilter,
  searchId,
  onStatusChange,
  onSearchChange,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 space-y-2">
        <Label htmlFor="statusFilter" className="text-sm">
          Estado
        </Label>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger id="statusFilter" className="w-full">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 space-y-2">
        <Label htmlFor="searchId" className="text-sm">
          Buscar por ID
        </Label>
        <Input
          id="searchId"
          type="text"
          value={searchId}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
