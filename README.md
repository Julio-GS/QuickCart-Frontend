# QuickCart Frontend

E-commerce application built with Next.js 14+ App Router, TypeScript, Tailwind CSS, and Zustand for state management.

## 🚀 Features

- **Modern Stack**: Next.js 14+ with App Router, React 19, TypeScript
- **State Management**: Zustand with localStorage persistence
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS with dark mode support
- **Forms**: React Hook Form with Zod validation
- **Security**: OWASP-compliant input sanitization, CSP headers
- **Testing**: Jest + React Testing Library
- **Analytics**: Recharts for data visualization
- **Payments**: Stripe integration (optional)

## 📋 Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm
- Backend API running (https://quickcartbackend.vercel.app)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd QuickCart-Frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://quickcartbackend.vercel.app/api/v1
```

## 🏃 Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

Run tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test --watch
```

## 🏗️ Build

Create a production build:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## 📦 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── products/          # Product details
│   ├── profile/           # User profile
│   └── shop/              # Product listing
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── cart/              # Cart components
│   ├── charts/            # Recharts visualizations
│   ├── checkout/          # Checkout components
│   ├── profile/           # Profile components
│   ├── shop/              # Shop components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utilities and libraries
│   ├── api/               # API client functions
│   ├── hooks/             # Custom React hooks
│   ├── store.ts           # Zustand stores
│   ├── types.ts           # TypeScript types
│   ├── utils.ts           # Utility functions
│   └── validators.ts      # Input validation
├── __tests__/             # Jest tests
└── public/                # Static assets
```

## 🔐 Security Features

- **Input Sanitization**: OWASP-compliant sanitization for all user inputs
- **CSP Headers**: Content Security Policy to prevent XSS attacks
- **Secure Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **URL Validation**: Sanitization of URL parameters
- **Error Handling**: Secure error messages without system details

## 🎨 Key Technologies

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **shadcn/ui**: High-quality UI components
- **React Hook Form**: Performant form handling
- **Zod**: Schema validation
- **Recharts**: Charts and data visualization
- **Jest**: Testing framework
- **React Testing Library**: Component testing

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
pnpm build
```

## 📝 Environment Variables

Required:

- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL

Optional:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe public key
- `STRIPE_SECRET_KEY`: Stripe secret key (server-side only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- Warning about `baseline-browser-mapping` being outdated (non-critical)

## 📞 Support

For issues and questions, please open an issue on GitHub.
