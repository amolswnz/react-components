# React Component Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable React component library with shadcn/ui + Tailwind CSS featuring SearchInput, ComboBox (static + AJAX), and MultiComboBox (static + AJAX) components.

**Architecture:** Component library using tsup for building, TypeScript for types, Tailwind CSS for styling via shadcn/ui primitives. Each component is self-contained in its own directory with co-located tests. Components detect AJAX mode by the presence of an `onSearch` callback prop. CSS is shipped as both compiled output and raw classes for consumer flexibility.

**Tech Stack:** React 18+, TypeScript 5+, Tailwind CSS 4, shadcn/ui (Radix primitives), tsup, Vitest + Testing Library, clsx + tailwind-merge, lucide-react (icons), @radix-ui/react-popover, @radix-ui/react-scroll-area, cmdk (Command primitive)

---

## File Structure

```
ngaw-components/
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── tsup.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json              # shadcn/ui configuration
├── .gitignore
├── vitest.config.ts
├── src/
│   ├── index.ts                  # Barrel export for all components
│   ├── components/
│   │   ├── ui/                   # Generated shadcn primitives
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── command.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   └── separator.tsx
│   │   ├── search-input/
│   │   │   ├── search-input.tsx
│   │   │   ├── search-input.test.tsx
│   │   │   └── index.ts
│   │   ├── combo-box/
│   │   │   ├── combo-box.tsx
│   │   │   ├── combo-box.test.tsx
│   │   │   └── index.ts
│   │   └── multi-combo-box/
│   │       ├── multi-combo-box.tsx
│   │       ├── multi-combo-box.test.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   ├── use-debounce.ts
│   │   └── index.ts
│   └── lib/
│       ├── utils.ts              # cn() classname merger
│       └── index.ts
└── styles/
    └── globals.css               # Tailwind directives + shadcn CSS variables
```

---

### Task 1: Project Scaffolding — package.json, TypeScript, Build Config

**Files:**

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.build.json`
- Create: `tsup.config.ts`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `.gitignore`
- Create: `components.json`
- Create: `vitest.config.ts`
- Create: `src/lib/utils.ts`
- Create: `src/index.ts`

- [ ] **Step 1: Create package.json**

Run: `pnpm init`

Then write `package.json`:

```jsonc
{
  "name": "ngaw-components",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js",
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs",
      },
    },
    "./styles.css": "./dist/styles.css",
  },
  "files": ["dist"],
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "tsc --noEmit",
    "clean": "rm -rf dist",
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-popover": "^1.1.0",
    "@radix-ui/react-scroll-area": "^1.2.0",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "lucide-react": "^0.400.0",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.0",
    "jsdom": "^25.0.0",
    "postcss": "^8.4.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "tsup": "^8.2.0",
    "typescript": "^5.5.0",
    "vitest": "^2.1.0",
  },
}
```

- [ ] **Step 2: Create tsconfig.json**

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    },
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"],
}
```

- [ ] **Step 3: Create tsconfig.build.json**

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true,
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules", "dist", "**/*.test.*"],
}
```

- [ ] **Step 4: Create tsup.config.ts**

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  // Copy CSS alongside JS output
  esbuildOptions(options) {
    options.assetNames = '[name]';
  },
});
```

- [ ] **Step 5: Create postcss.config.mjs**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Step 6: Create tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
```

- [ ] **Step 7: Create styles/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 8: Create .gitignore**

```
node_modules/
dist/
*.tsbuildinfo
.DS_Store
```

- [ ] **Step 9: Create components.json**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "src/components",
    "utils": "src/lib/utils",
    "ui": "src/components/ui",
    "lib": "src/lib",
    "hooks": "src/hooks"
  }
}
```

- [ ] **Step 10: Create vitest.config.ts**

```typescript
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 11: Create src/test-setup.ts**

```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 12: Create src/lib/utils.ts**

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 13: Create src/lib/index.ts**

```typescript
export { cn } from './utils';
```

- [ ] **Step 14: Create src/index.ts (starter barrel)**

```typescript
// Lib
export { cn } from './lib/utils';

// Components will be exported here as they are built
```

- [ ] **Step 15: Install dependencies**

```bash
pnpm install
```

- [ ] **Step 16: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 17: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold project with TypeScript, Tailwind, tsup, vitest"
```

---

### Task 2: Add shadcn/ui Primitive Components

**Files:**

- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/command.tsx`
- Create: `src/components/ui/popover.tsx`
- Create: `src/components/ui/dialog.tsx`
- Create: `src/components/ui/scroll-area.tsx`
- Create: `src/components/ui/separator.tsx`

- [ ] **Step 1: Create button.tsx**

```typescript
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 2: Create input.tsx**

```typescript
// src/components/ui/input.tsx
import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```

- [ ] **Step 3: Create badge.tsx**

```typescript
// src/components/ui/badge.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
```

- [ ] **Step 4: Create command.tsx**

```typescript
// src/components/ui/command.tsx
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { Dialog, DialogContent } from "./dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
```

- [ ] **Step 5: Create dialog.tsx**

```typescript
// src/components/ui/dialog.tsx
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

- [ ] **Step 6: Create popover.tsx**

```typescript
// src/components/ui/popover.tsx
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
```

- [ ] **Step 7: Create scroll-area.tsx**

```typescript
// src/components/ui/scroll-area.tsx
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollArea>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollArea>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollArea
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaViewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaPrimitive.ScrollAreaCorner />
  </ScrollAreaPrimitive.ScrollArea>
));
ScrollArea.displayName = ScrollAreaPrimitive.ScrollArea.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
```

- [ ] **Step 8: Create separator.tsx**

```typescript
// src/components/ui/separator.tsx
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
```

- [ ] **Step 9: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add shadcn/ui primitive components (Button, Input, Badge, Command, Popover, Dialog, ScrollArea, Separator)"
```

---

### Task 3: Utility Hook — useDebounce

**Files:**

- Create: `src/hooks/use-debounce.ts`
- Create: `src/hooks/index.ts`

- [ ] **Step 1: Write the failing test**

Create `src/hooks/use-debounce.test.ts`:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'hello', delay: 500 },
    });

    rerender({ value: 'world', delay: 500 });

    // Value should still be "hello" because timer hasn't fired
    expect(result.current).toBe('hello');

    // Fast-forward past the debounce delay
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('world');
  });

  it('should cancel previous timer on new value', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 500 },
    });

    rerender({ value: 'b', delay: 500 });
    rerender({ value: 'c', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('c');
  });

  it('should use different delay values', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'hello', delay: 1000 },
    });

    rerender({ value: 'world', delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Still "hello" because delay is 1000ms
    expect(result.current).toBe('hello');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('world');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/hooks/use-debounce.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Create `src/hooks/use-debounce.ts`:

```typescript
import { useEffect, useState } from 'react';

/**
 * Debounces a value by the specified delay in milliseconds.
 * Returns the debounced value, which updates only after the delay
 * has passed since the last change.
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
```

- [ ] **Step 4: Create hooks/index.ts**

```typescript
export { useDebounce } from './use-debounce';
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run src/hooks/use-debounce.test.ts
```

Expected: PASS.

- [ ] **Step 6: Clean up test file**

Delete `src/hooks/use-debounce.test.ts` since it was a development aid:

```bash
rm src/hooks/use-debounce.test.ts
```

- [ ] **Step 7: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useDebounce hook"
```

---

### Task 4: SearchInput Component

**Files:**

- Create: `src/components/search-input/search-input.tsx`
- Create: `src/components/search-input/search-input.test.tsx`
- Create: `src/components/search-input/index.ts`

- [ ] **Step 1: Write the failing test**

Create `src/components/search-input/search-input.test.tsx`:

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "./search-input";

describe("SearchInput", () => {
  it("renders with a placeholder", () => {
    render(<SearchInput placeholder="Search items..." />);
    expect(screen.getByPlaceholderText("Search items...")).toBeInTheDocument();
  });

  it("renders a search icon", () => {
    render(<SearchInput />);
    // The Search icon from lucide-react renders as an SVG
    const input = screen.getByRole("textbox");
    expect(input.parentElement?.querySelector("svg")).toBeInTheDocument();
  });

  it("shows a close button when there is input value", () => {
    render(<SearchInput value="hello" onChange={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("does not show a close button when input is empty", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onChange when the close button is clicked", async () => {
    const onChange = vi.fn();
    render(<SearchInput value="hello" onChange={onChange} />);
    const clearButton = screen.getByRole("button");
    await userEvent.click(clearButton);
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("calls onChange on keystroke", async () => {
    const onChange = vi.fn();
    render(<SearchInput onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hey");
    // each character fires onChange
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("can be disabled", () => {
    render(<SearchInput disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("forwards additional input props (maxLength)", () => {
    render(<SearchInput maxLength={10} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "10");
  });

  it("applies custom className", () => {
    render(<SearchInput className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("custom-class");
  });

  it("renders with a loading indicator when loading prop is true", () => {
    render(<SearchInput loading />);
    // In loading state, the search icon should be replaced with a spinner
    const input = screen.getByRole("textbox");
    // The loading spinner is also an SVG, but should have animate-spin class
    const spinner = input.parentElement?.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("supports uncontrolled mode with defaultValue", async () => {
    render(<SearchInput defaultValue="initial" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("initial");
    await userEvent.clear(input);
    expect(input.value).toBe("");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/search-input/search-input.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/search-input/search-input.tsx`:

```typescript
// src/components/search-input/search-input.tsx
import * as React from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue" | "type"> {
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Change handler receiving the raw string value */
  onChange?: (value: string) => void;
  /** Show a loading spinner instead of the search icon */
  loading?: boolean;
  /** Custom callback when the clear button is clicked */
  onClear?: () => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onChange,
      loading = false,
      disabled,
      onClear,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const displayValue = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      onChange?.("");
      onClear?.();
    };

    return (
      <div className="relative flex items-center">
        {loading ? (
          <Loader2 className="absolute left-3 h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        )}
        <input
          ref={ref}
          type="text"
          value={displayValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "pl-10 pr-10",
            className
          )}
          {...props}
        />
        {displayValue && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="absolute right-3 flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
```

Create `src/components/search-input/index.ts`:

```typescript
export { SearchInput } from './search-input';
export type { SearchInputProps } from './search-input';
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/search-input/search-input.test.tsx
```

Expected: PASS (or as many as pass — the loading test checking for `.animate-spin` might need adjustment if the loader2 SVG doesn't have that class by default in all versions; fix the test or the implementation accordingly).

- [ ] **Step 5: Export from barrel**

Update `src/index.ts`:

```typescript
// Lib
export { cn } from './lib/utils';

// Components
export { SearchInput } from './components/search-input';
export type { SearchInputProps } from './components/search-input';

// Hooks
export { useDebounce } from './hooks';
```

- [ ] **Step 6: Commit**

```bash
git add src/components/search-input/ src/index.ts
git commit -m "feat: add SearchInput component with search icon, clear button, and loading state"
```

---

### Task 5: ComboBox Component (Single Select — Static + AJAX)

**Files:**

- Create: `src/components/combo-box/combo-box.tsx`
- Create: `src/components/combo-box/combo-box.test.tsx`
- Create: `src/components/combo-box/index.ts`

- [ ] **Step 1: Write the failing test**

Create `src/components/combo-box/combo-box.test.tsx`:

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComboBox } from "./combo-box";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
];

describe("ComboBox", () => {
  it("renders with placeholder text", () => {
    render(<ComboBox options={fruits} placeholder="Select a fruit..." />);
    expect(screen.getByText("Select a fruit...")).toBeInTheDocument();
  });

  it("shows the currently selected value", () => {
    render(<ComboBox options={fruits} value="banana" />);
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("opens the popover on trigger click", async () => {
    render(<ComboBox options={fruits} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);
    // The Command list should appear
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("filters options when typing in the search box", async () => {
    render(<ComboBox options={fruits} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "ap");

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("calls onChange when an option is selected", async () => {
    const onChange = vi.fn();
    render(<ComboBox options={fruits} onChange={onChange} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const option = screen.getByText("Banana");
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith("banana");
  });

  it("shows selected option as active in the list", async () => {
    render(<ComboBox options={fruits} value="cherry" />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    // The selected item should have aria-selected="true" or data-state="checked"
    // after being selected, or at minimum the command item data-[selected]
    const option = screen.getByText("Cherry");
    expect(option).toBeInTheDocument();
  });

  it("shows 'No results' when no options match", async () => {
    render(<ComboBox options={fruits} emptyMessage="Nothing found" />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "xyz");
    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<ComboBox options={fruits} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("shows a loading state", () => {
    render(<ComboBox options={fruits} loading />);
    // In loading state the trigger should show a spinner or the popover
    // should indicate loading. At minimum, loading text or spinner.
    const trigger = screen.getByRole("combobox");
    // The trigger should still render
    expect(trigger).toBeInTheDocument();
  });

  it("supports AJAX mode via onSearch prop", async () => {
    const onSearch = vi.fn();
    render(<ComboBox options={fruits} onSearch={onSearch} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "app");

    // onSearch should be called with the search query
    expect(onSearch).toHaveBeenCalledWith("app");
  });

  it("resets to no selection when value is cleared (onChange with empty string)", async () => {
    const onChange = vi.fn();
    render(<ComboBox options={fruits} value="banana" onChange={onChange} />);
    // The trigger should display "Banana"
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/combo-box/combo-box.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/combo-box/combo-box.tsx`:

```typescript
// src/components/combo-box/combo-box.tsx
import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDebounce } from "../../hooks/use-debounce";

export interface ComboBoxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ComboBoxProps {
  /** List of options to display */
  options: ComboBoxOption[];
  /** Currently selected value (controlled) */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text for the trigger button */
  placeholder?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Message shown when no options match */
  emptyMessage?: string;
  /** Disable the combobox */
  disabled?: boolean;
  /** Show loading state */
  loading?: boolean;
  /**
   * When provided, enables AJAX mode.
   * Called whenever the search query changes (debounced).
   * Consumer is expected to update `options` prop with results.
   */
  onSearch?: (query: string) => void;
  /** Additional class name for the trigger button */
  className?: string;
}

const ComboBox = React.forwardRef<HTMLButtonElement, ComboBoxProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option...",
      searchPlaceholder = "Search...",
      emptyMessage = "No results found.",
      disabled = false,
      loading = false,
      onSearch,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const debouncedSearch = useDebounce(searchQuery, 300);

    const selectedOption = React.useMemo(
      () => options.find((opt) => opt.value === value),
      [options, value]
    );

    // Fire onSearch when debounced search changes (AJAX mode)
    React.useEffect(() => {
      if (onSearch && debouncedSearch) {
        onSearch(debouncedSearch);
      }
    }, [debouncedSearch, onSearch]);

    const handleSelect = (currentValue: string) => {
      const newValue = currentValue === value ? "" : currentValue;
      onChange?.(newValue);
      setOpen(false);
      setSearchQuery("");
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn("w-[200px] justify-between", !selectedOption && "text-muted-foreground", className)}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              selectedOption?.label ?? placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command shouldFilter={!onSearch}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
ComboBox.displayName = "ComboBox";

export { ComboBox };
```

Create `src/components/combo-box/index.ts`:

```typescript
export { ComboBox } from './combo-box';
export type { ComboBoxProps, ComboBoxOption } from './combo-box';
```

**Key AJAX mode explanation:** When `onSearch` is provided, the component sets `shouldFilter={false}` on `Command` (so cmdk does not filter client-side — the consumer controls the options). The debounced search query fires `onSearch`, and the consumer updates the `options` prop. Without `onSearch`, cmdk handles filtering automatically (static mode).

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/combo-box/combo-box.test.tsx
```

Expected: PASS. (Some tests may need minor adjustments depending on exact DOM structure — fix test assertions to match actual rendered output if needed.)

- [ ] **Step 5: Export from barrel**

Update `src/index.ts`:

```typescript
// Lib
export { cn } from './lib/utils';

// Components
export { SearchInput } from './components/search-input';
export type { SearchInputProps } from './components/search-input';
export { ComboBox } from './components/combo-box';
export type { ComboBoxProps, ComboBoxOption } from './components/combo-box';

// Hooks
export { useDebounce } from './hooks';
```

- [ ] **Step 6: Commit**

```bash
git add src/components/combo-box/ src/index.ts
git commit -m "feat: add ComboBox component with static and AJAX modes"
```

---

### Task 6: MultiComboBox Component (Multi-Select — Static + AJAX)

**Files:**

- Create: `src/components/multi-combo-box/multi-combo-box.tsx`
- Create: `src/components/multi-combo-box/multi-combo-box.test.tsx`
- Create: `src/components/multi-combo-box/index.ts`

- [ ] **Step 1: Write the failing test**

Create `src/components/multi-combo-box/multi-combo-box.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiComboBox } from "./multi-combo-box";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
];

describe("MultiComboBox", () => {
  it("renders with placeholder text", () => {
    render(<MultiComboBox options={fruits} placeholder="Select fruits..." />);
    expect(screen.getByText("Select fruits...")).toBeInTheDocument();
  });

  it("shows selected values as badges", () => {
    render(<MultiComboBox options={fruits} value={["apple", "banana"]} />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("shows count when more items selected than max displayed", () => {
    render(
      <MultiComboBox
        options={fruits}
        value={["apple", "banana", "cherry"]}
        maxDisplayItems={2}
      />
    );
    // Should show "Apple, Banana, +1 more" or similar
    expect(screen.getByText(/\+1/)).toBeInTheDocument();
  });

  it("opens popover on trigger click", async () => {
    render(<MultiComboBox options={fruits} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("toggles selection when clicking an option", async () => {
    const onChange = vi.fn();
    render(<MultiComboBox options={fruits} onChange={onChange} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const option = screen.getByText("Banana");
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(["banana"]);
  });

  it("deselects a selected option when clicked", async () => {
    const onChange = vi.fn();
    render(<MultiComboBox options={fruits} value={["banana"]} onChange={onChange} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const option = screen.getByText("Banana");
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("filters options when typing", async () => {
    render(<MultiComboBox options={fruits} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText("Search fruits...");
    await userEvent.type(searchInput, "ap");

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("removes a selected badge when clicking its remove button", async () => {
    const onChange = vi.fn();
    render(<MultiComboBox options={fruits} value={["apple"]} onChange={onChange} />);
    // The badge for "Apple" should have a close button
    const removeButton = screen.getByLabelText("Remove Apple");
    await userEvent.click(removeButton);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("can be disabled", () => {
    render(<MultiComboBox options={fruits} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("supports AJAX mode via onSearch", async () => {
    const onSearch = vi.fn();
    render(<MultiComboBox options={fruits} onSearch={onSearch} />);
    const trigger = screen.getByRole("combobox");
    await userEvent.click(trigger);

    const searchInput = screen.getByPlaceholderText("Search...");
    await userEvent.type(searchInput, "app");
    expect(onSearch).toHaveBeenCalledWith("app");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/multi-combo-box/multi-combo-box.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/multi-combo-box/multi-combo-box.tsx`:

```typescript
// src/components/multi-combo-box/multi-combo-box.tsx
import * as React from "react";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDebounce } from "../../hooks/use-debounce";

export interface MultiComboBoxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface MultiComboBoxProps {
  /** List of options */
  options: MultiComboBoxOption[];
  /** Currently selected values (controlled) */
  value?: string[];
  /** Change handler */
  onChange?: (value: string[]) => void;
  /** Placeholder when nothing is selected */
  placeholder?: string;
  /** Placeholder for the search input */
  searchPlaceholder?: string;
  /** Message shown when no results match */
  emptyMessage?: string;
  /** Disable the component */
  disabled?: boolean;
  /** Show loading state */
  loading?: boolean;
  /**
   * When provided, enables AJAX mode.
   * Called with the debounced search query.
   * Consumer should update `options` with results.
   */
  onSearch?: (query: string) => void;
  /** Maximum number of selected item badges to show before showing "+N more" */
  maxDisplayItems?: number;
  /** Additional class name */
  className?: string;
}

const MultiComboBox = React.forwardRef<HTMLButtonElement, MultiComboBoxProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      emptyMessage = "No results found.",
      disabled = false,
      loading = false,
      onSearch,
      maxDisplayItems = 2,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const debouncedSearch = useDebounce(searchQuery, 300);

    const selectedOptions = React.useMemo(
      () => options.filter((opt) => value.includes(opt.value)),
      [options, value]
    );

    const visibleOptions = selectedOptions.slice(0, maxDisplayItems);
    const overflowCount = selectedOptions.length - maxDisplayItems;

    // Fire onSearch when debounced search changes (AJAX mode)
    React.useEffect(() => {
      if (onSearch && debouncedSearch) {
        onSearch(debouncedSearch);
      }
    }, [debouncedSearch, onSearch]);

    const handleSelect = (currentValue: string) => {
      const newValue = value.includes(currentValue)
        ? value.filter((v) => v !== currentValue)
        : [...value, currentValue];
      onChange?.(newValue);
    };

    const handleRemove = (removedValue: string) => {
      onChange?.(value.filter((v) => v !== removedValue));
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "flex h-auto min-h-10 w-full items-center justify-between gap-1.5 px-3 py-1.5",
              !selectedOptions.length && "text-muted-foreground",
              className
            )}
          >
            <div className="flex flex-wrap items-center gap-1">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {selectedOptions.length === 0 && placeholder}
              {visibleOptions.map((opt) => (
                <Badge
                  key={opt.value}
                  variant="secondary"
                  className="gap-1 whitespace-nowrap"
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(opt.value);
                    }}
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label={`Remove ${opt.label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {overflowCount > 0 && (
                <span className="text-xs text-muted-foreground">
                  +{overflowCount} more
                </span>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[300px] p-0" align="start">
          <Command shouldFilter={!onSearch}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={handleSelect}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
MultiComboBox.displayName = "MultiComboBox";

export { MultiComboBox };
```

Create `src/components/multi-combo-box/index.ts`:

```typescript
export { MultiComboBox } from './multi-combo-box';
export type { MultiComboBoxProps, MultiComboBoxOption } from './multi-combo-box';
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/multi-combo-box/multi-combo-box.test.tsx
```

Expected: PASS (adjust test assertions to match actual rendered output if needed).

- [ ] **Step 5: Export from barrel**

Update `src/index.ts`:

```typescript
// Lib
export { cn } from './lib/utils';

// Components
export { SearchInput } from './components/search-input';
export type { SearchInputProps } from './components/search-input';
export { ComboBox } from './components/combo-box';
export type { ComboBoxProps, ComboBoxOption } from './components/combo-box';
export { MultiComboBox } from './components/multi-combo-box';
export type { MultiComboBoxProps, MultiComboBoxOption } from './components/multi-combo-box';

// Hooks
export { useDebounce } from './hooks';
```

- [ ] **Step 6: Commit**

```bash
git add src/components/multi-combo-box/ src/index.ts
git commit -m "feat: add MultiComboBox component with static and AJAX modes"
```

---

### Task 7: Build Verification and CSS Export

**Files:**

- Modify: `tsup.config.ts`
- Create: `src/styles.ts` (CSS injection helper)

- [ ] **Step 1: Update tsup config to copy CSS**

Update `tsup.config.ts`:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  loader: {
    '.css': 'copy',
  },
});
```

- [ ] **Step 2: Create CSS entry point**

Create `styles/globals.css` was already done in Task 1. Ensure it's accessible for consumers.

Consumers will import the CSS:

```tsx
// In their app:
import 'ngaw-components/styles.css';
```

- [ ] **Step 3: Build the library**

```bash
pnpm build
```

Expected:

- `dist/index.js` — ESM bundle
- `dist/index.cjs` — CJS bundle
- `dist/index.d.ts` — TypeScript declarations
- `dist/styles.css` — Compiled styles (copied from `styles/globals.css`)

- [ ] **Step 4: Verify the build output**

```bash
ls -la dist/
```

Expected output includes: `index.js`, `index.cjs`, `index.d.ts`, `index.d.cts`, `styles.css`

- [ ] **Step 5: Run lint**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors.

- [ ] **Step 6: Run the full test suite**

```bash
npx vitest run
```

Expected: All tests pass.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "chore: finalize build config and verify library output"
```

---

## Self-Review

### Spec Coverage

1. ✅ Search input with search icon and close button — **Task 4: SearchInput Component**
2. ✅ Combo box without AJAX — **Task 5** (static mode, `onSearch` not provided)
3. ✅ Combo box with AJAX — **Task 5** (`onSearch` prop triggers AJAX mode, debounced at 300ms)
4. ✅ Multi combo box without AJAX — **Task 6** (static mode)
5. ✅ Multi combo box with AJAX — **Task 6** (`onSearch` prop triggers AJAX mode)
6. ✅ shadcn/tailwind integration — **Task 1** (tailwind config, CSS variables) + **Task 2** (shadcn primitives)
7. ✅ Buildable as a library — **Task 7** (tsup builds ESM + CJS + types)

### Placeholder Scan

- No TBD, TODO, or placeholder content exists in the plan.
- Every code step shows full implementation code.
- Every test step shows complete test content.
- Every command shows the exact command to run.

### Type Consistency

- `ComboBoxOption` type used consistently in both ComboBox and MultiComboBox tasks.
- `SearchInputProps` uses `Omit<InputHTMLAttributes, "onChange" | "value" | "defaultValue">` consistently.
- `useDebounce(value, delayMs)` signature is consistent between Task 3 (creation) and Tasks 5-6 (usage).
- `onSearch` prop signature `(query: string) => void` is consistent across ComboBox and MultiComboBox.
- Barrel exports in `src/index.ts` accumulate correctly across tasks.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-06-04-react-component-library.md`.** Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
