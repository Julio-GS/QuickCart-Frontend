"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

const SORT_FIELDS = [
  { value: "price", label: "Precio" },
  { value: "name", label: "Nombre" },
  { value: "stock", label: "Stock" },
];

const CATEGORIES = [
  { id: "electronicos", label: "Electrónicos" },
  { id: "hogar-y-jardin", label: "Hogar y Jardín" },
  { id: "ropa", label: "Ropa" },
  { id: "libros", label: "Libros" },
];

interface ShopFiltersProps {
  onFilterApply?: () => void;
}

export default function ShopFilters({ onFilterApply }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State hooks
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (minPrice) params.set("minPrice", String(Number(minPrice) * 100));
    if (maxPrice) params.set("maxPrice", String(Number(maxPrice) * 100));
    if (inStock) params.set("inStock", "true");
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder.toUpperCase());
    router.push(`/shop?${params.toString()}`);
    onFilterApply?.();
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setInStock(false);
    setSortBy("");
    setSortOrder("asc");
    router.push("/shop");
    onFilterApply?.();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1">
            Aplicar Filtros
          </Button>
          <Button onClick={clearFilters} variant="outline">
            Limpiar
          </Button>
        </div>
      </div>

      {/* Ordenar por */}
      <div className="space-y-2">
        <Label htmlFor="sort-by">Ordenar Por</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar campo..." />
          </SelectTrigger>
          <SelectContent>
            {SORT_FIELDS.map((field) => (
              <SelectItem key={field.value} value={field.value}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label htmlFor="sort-order">Orden</Label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ascendente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascendente</SelectItem>
            <SelectItem value="desc">Descendente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger>Categorías</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              {CATEGORIES.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.id} id={category.id} />
                  <Label htmlFor={category.id}>{category.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Rango de Precio</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="min-price" className="text-xs">
                  Mín
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="max-price" className="text-xs">
                  Máx
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="Máx"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="status">
          <AccordionTrigger>Estado</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={inStock}
                  onCheckedChange={(checked) => setInStock(checked as boolean)}
                />
                <Label htmlFor="in-stock">Solo en Stock</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
