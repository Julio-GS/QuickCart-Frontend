import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">QuickCart</h3>
            <p className="text-sm text-muted-foreground">
              Tu tienda online para productos de calidad a excelentes precios.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Tienda</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop?category=electronicos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Electrónicos
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=hogar-y-jardin"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Hogar y Jardín
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=ropa"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Ropa
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=libros"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Libros
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Atención al Cliente</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Información de Envío
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Trabaja con Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Términos de Servicio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} QuickCart. Proyecto Demo. Sitio no
            comercial.
          </p>
        </div>
      </div>
    </footer>
  );
}
