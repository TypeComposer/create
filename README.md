# Create TypeComposer

A fast, powerful CLI for kickstarting TypeComposer projects with ready-to-use modern templates and configurations.

## 🚀 Quick Start

```bash
npm create typecomposer@latest
```

## 📋 What is TypeComposer?

TypeComposer is a modern TypeScript framework for building web applications with a component-based architecture. This CLI tool helps you quickly set up new TypeComposer projects with various templates and configurations.

## ✨ Features

- **Interactive CLI**: User-friendly prompts to configure your project
- **Multiple Templates**: Choose from project and library templates
- **TypeScript Support**: Full TypeScript configuration out of the box
- **Router Integration**: Optional client-side routing setup
- **Tailwind CSS**: Optional utility-first CSS framework integration
- **Mobile Support**: Capacitor integration for mobile app development
- **Modern Tooling**: Vite build system with hot module replacement

## 🛠️ Available Templates

### Project Templates
- **TypeScript Project**: Full-featured web application template
- **TypeScript + Router**: Project with client-side routing
- **TypeScript + Tailwind CSS**: Project with utility-first CSS framework
- **TypeScript + Router + Tailwind CSS**: Complete setup with routing and styling

### Library Templates
- **TypeScript Library**: Reusable component library template

## 📦 Installation & Usage

### Prerequisites
- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Create a New Project

```bash
npm create typecomposer@latest
```

The CLI will automatically download the latest version and start the interactive setup.

### Interactive Setup

The CLI will guide you through the following options:

```
? TypeComposer Template: › - Use arrow-keys. Return to submit.
❯   Project
    Library
✔ Project name: … my-awesome-project
✔ Package name: … my-awesome-project
✔ router: … yes
✔ tailwindcss: … no
✔ Project created successfully
✔ Run the following commands to start the project:

🔹 cd my-awesome-project
🔹 npm start
```

## 🎯 Project Options

### Project Configuration
- **Project Name**: Name of your project directory
- **Package Name**: npm package name (defaults to project name)
- **Router**: Enable client-side routing
- **Tailwind CSS**: Include Tailwind CSS for styling

### Template Structure

Each generated project includes:
- **Vite Configuration**: Fast build tool with HMR
- **TypeScript Setup**: Full TypeScript configuration
- **Component Structure**: Organized component architecture
- **Styling**: CSS/SCSS with optional Tailwind CSS
- **Development Scripts**: Start, build, and test commands

## 🚀 Getting Started

After creating your project:

```bash
cd your-project-name
npm install
npm start
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run dev` - Development mode with hot reload
- `npm run typecheck` - TypeScript type checking

## 📁 Project Structure

```
your-project/
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Dependency lock file
├── postcss.config.js       # PostCSS configuration (if Tailwind CSS enabled)
├── public/                 # Static assets
│   ├── typecomposer.svg    # TypeComposer logo
│   └── typescript.svg      # TypeScript logo
├── src/                    # Source code
│   ├── AppPage.ts          # Main application component
│   ├── main.ts             # Application entry point
│   ├── router/             # Router configuration (if enabled)
│   │   └── router.ts       # Route definitions
│   ├── style.css           # Global styles
│   └── vite-env.d.ts       # Vite type definitions
├── tailwind.config.js      # Tailwind CSS configuration (if enabled)
├── tsconfig.json           # TypeScript configuration
└── vite.config.js          # Vite build configuration
```

### Key Files Explained

- **`src/main.ts`**: Application entry point where TypeComposer is initialized
- **`src/AppPage.ts`**: Main application component with your UI logic
- **`src/router/router.ts`**: Client-side routing configuration (when router is enabled)
- **`vite.config.js`**: Vite build tool configuration with hot module replacement
- **`tailwind.config.js`**: Tailwind CSS utility framework configuration (when enabled)

## 🔧 Configuration Options

### Router Setup
When you enable routing, the project includes:
- Client-side routing with TypeComposer Router
- Route configuration in `src/router/router.ts`
- Navigation components and utilities

### Tailwind CSS Integration
When Tailwind CSS is selected:
- Utility-first CSS framework setup
- PostCSS configuration for processing
- Responsive design utilities
- Custom Tailwind configuration

## 🚀 Development Workflow

### Starting Development
```bash
npm start
# or
npm run dev
```

### Building for Production
```bash
npm run build
```

### Type Checking
```bash
npm run typecheck
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
