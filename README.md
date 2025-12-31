# Streamix

A premium Netflix-inspired streaming platform clone built with modern web technologies. Features a sleek, modern UI with glassmorphism effects, animated backgrounds, and smooth micro-animations.

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat&logo=tailwindcss)

## ✨ Features

- **Premium UI Design** - Glassmorphism effects, animated gradients, and glow effects
- **Responsive Layout** - Fully responsive design for all screen sizes
- **User Authentication** - Login and signup pages with form validation
- **Content Browsing** - Hero section, content rows, and movie cards
- **Explore Page** - Browse and filter movies/shows
- **Watchlist** - Save your favorite content
- **Profile Management** - User profiles and settings

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 7](https://vite.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing:** [React Router DOM 7](https://reactrouter.com/)
- **State Management:** [TanStack Query](https://tanstack.com/query)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ashutoshraj163/netflix-clone.git
   cd streamix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
streamix/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and media
│   ├── components/      # Reusable UI components
│   │   ├── ContentRow.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MovieCard.tsx
│   │   └── Navbar.tsx
│   ├── context/         # React context providers
│   ├── data/            # Mock data
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   │   ├── Explore.tsx
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── Watchlist.tsx
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Design Features

- **Glassmorphism** - Frosted glass effect on cards and modals
- **Animated Gradients** - Dynamic background animations
- **Glow Effects** - Subtle glow on interactive elements
- **Micro-animations** - Smooth transitions and hover effects
- **Dark Theme** - Premium dark color palette

## 📄 License

This project is for educational purposes only.

