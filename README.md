# QuickCart Frontend

Aplicación de e-commerce construida con Next.js 14+ App Router, TypeScript, Tailwind CSS y Zustand para gestión de estado.

## 🚀 Características

- **Stack**: Next.js 14+ con App Router, React 19, TypeScript
- **Gestión de Estado**: Zustand con persistencia en localStorage
- **Componentes UI**: Biblioteca de componentes shadcn/ui
- **Estilos**: Tailwind CSS con soporte de modo oscuro
- **Formularios**: React Hook Form con validación Zod
- **Seguridad**: Sanitización de inputs compatible con OWASP, headers CSP
- **Testing**: Jest + React Testing Library
- **Analytics**: Recharts para visualización de datos
- **Pagos**: Integración con Stripe (opcional)

## 📋 Prerequisitos

- Node.js 18+ o superior
- pnpm (recomendado) o npm
- API Backend ejecutándose (https://quickcartbackend.vercel.app)

## 🛠️ Instalación

1. Clonar el repositorio:

```bash
git clone <repository-url>
cd QuickCart-Frontend
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Crear archivo de variables de entorno:

```bash
cp .env.example .env.local
```

## 🏃 Desarrollo

Ejecutar el servidor de desarrollo:

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🧪 Testing

Ejecutar tests:

```bash
pnpm test
```

Ejecutar tests en modo watch:

```bash
pnpm test --watch
```

## 🏗️ Build

Crear un build de producción:

```bash
pnpm build
```

Iniciar servidor de producción:

```bash
pnpm start
```

## 📦 Estructura del Proyecto

```
├── app/                    # Páginas Next.js App Router
│   ├── admin/             # Panel de administración
│   ├── auth/              # Páginas de autenticación
│   ├── cart/              # Carrito de compras
│   ├── checkout/          # Flujo de checkout
│   ├── products/          # Detalles de productos
│   ├── profile/           # Perfil de usuario
│   └── shop/              # Listado de productos
├── components/            # Componentes React
│   ├── admin/             # Componentes de admin
│   ├── cart/              # Componentes de carrito
│   ├── charts/            # Visualizaciones Recharts
│   ├── checkout/          # Componentes de checkout
│   ├── profile/           # Componentes de perfil
│   ├── shop/              # Componentes de tienda
│   └── ui/                # Componentes shadcn/ui
├── lib/                   # Utilidades y librerías
│   ├── api/               # Funciones cliente API
│   ├── hooks/             # Hooks personalizados React
│   ├── store.ts           # Stores Zustand
│   ├── types.ts           # Tipos TypeScript
│   ├── utils.ts           # Funciones utilitarias
│   └── validators.ts      # Validación de inputs
├── __tests__/             # Tests Jest
└── public/                # Assets estáticos
```

## 🔐 Características de Seguridad

- **Sanitización de Inputs**: Sanitización compatible con OWASP para todos los inputs de usuario
- **Headers CSP**: Content Security Policy para prevenir ataques XSS
- **Headers Seguros**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Validación de URLs**: Sanitización de parámetros URL
- **Manejo de Errores**: Mensajes de error seguros sin detalles del sistema

## 🎨 Tecnologías Clave

- **Next.js 16**: Framework React con App Router
- **TypeScript**: Desarrollo con tipado seguro
- **Tailwind CSS**: Framework CSS utility-first
- **Zustand**: Gestión de estado ligera
- **shadcn/ui**: Componentes UI de alta calidad
- **React Hook Form**: Manejo de formularios performante
- **Zod**: Validación de esquemas
- **Recharts**: Gráficos y visualización de datos
- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes

## 📝 Variables de Entorno

Requeridas:

- `NEXT_PUBLIC_API_BASE_URL`: URL del API Backend

Opcionales:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Clave pública de Stripe
- `STRIPE_SECRET_KEY`: Clave secreta de Stripe (solo lado del servidor)
