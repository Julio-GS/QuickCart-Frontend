"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import ShopFilters from "./filters";

export function MobileFilters() {
  const [open, setOpen] = useState(false);

  const handleFilterApply = () => {
    setOpen(false);
  };

  // Clear focus when sheet closes to prevent aria-hidden warning
  useEffect(() => {
    if (!open && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden mb-4 w-full">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>Filtros de Productos</SheetTitle>
          <SheetDescription>
            Selecciona los filtros para encontrar productos específicos
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2 px-4">
          <ShopFilters onFilterApply={handleFilterApply} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
