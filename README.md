# Geek Devs - Admin Dashboard Template

A modern, responsive Admin Dashboard built with React, TypeScript, and Vite. This project features a robust set of tools for data visualization, user management, and system administration, tailored for a seamless user experience.

## 🚀 Technologies

-   **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind)
-   **Routing:** [TanStack Router](https://tanstack.com/router)
-   **Charts:** [Recharts](https://recharts.org/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Key Features

### 📊 Admin Dashboard
-   **Overview**: Interactive KPI cards showing total revenue, subscriptions, sales, and active users.
-   **Analytics**: Visual data representation using bar charts and recent sales lists.
-   **Animations**: Smooth entry animations for all dashboard elements.

### 📝 Reports & Analytics
-   **Reports Page**: Dedicated section for generating and viewing system reports.
-   **Data Visualization**: Integrated charts for measuring performance key metrics.

### 👥 User & Product Management
-   **Users**: tabular view of system users with pagination.
-   **Products**: Product inventory management with pagination.

### 🛠️ Support & Tools
-   **AI Assistant**: A conversational AI interface for quick help and tasks. Features chat history and auto-scrolling.
-   **Help Center**: A support hub with categories, popular articles, and contact options.

### ⚙️ System Settings
-   **Profile**: Manage user details, including a **Profile Avatar** with upload functionality.
-   **Appearance**: Toggle between Light, Dark, and System themes.
-   **Notifications**: granular control over email and push notifications.

### 🎨 UI/UX
-   **Sidebar**: Collapsible navigation with a "Settings" popover containing quick links (Terms, What's New, Logout).
-   **ScrollArea**: Custom, consistent scrollbars across the application.
-   **Responsive Design**: Fully responsive layout adapting to mobile and desktop screens.

## 📂 Project Structure

```bash
src/
├── components/         # Shared UI components
│   ├── layout/         # Layout components (Sidebar, Header)
│   ├── ui/             # shadcn/ui primitives (Button, Card, etc.)
│   └── theme-provider  # Theme context provider
├── features/           # Feature-based architecture
│   ├── admin/          # Admin-specific components & pages
│   │   ├── components/ # Dashboard, Analytics, Settings
│   │   ├── supports/   # Help Center, AI Assistant
│   └── auth/           # Authentication logic
├── lib/                # Utilities (utils.ts)
├── router.tsx          # TanStack Router configuration
└── main.tsx            # Entry point
```

## 🛠️ Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
