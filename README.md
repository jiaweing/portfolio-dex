<div align="center">

# Jia Wei Ng — Portfolio (Dex)

  <img src="public/images/avatars/jiawei.png" alt="Jia Wei Ng" width="120" />
  <p><em>Software engineer, entrepreneur, and tech enthusiast based in Singapore</em></p>

</div>

## About Me

I'm a 25-year-old designer & software engineer based in Singapore (you can call me Jay), currently pursuing a BSc in Computer Science at the University of Glasgow and Singapore Institute of Technology. I create digital experiences with expertise in artificial intelligence, blockchain, non-fungible tokens, business intelligence, and game development.

I've founded several tech ventures including decosmic.com, been.place, and supply.tf. Beyond technology, I'm interested in space, quantum mechanics, strange anomalies, and mysteries of the universe.

> **Note:** This portfolio is codenamed "Dex" as it's the first of several portfolio variations that I've open-sourced.

## What I Do

- **Software Development** - Building web and mobile applications with modern technologies
- **Entrepreneurship** - Founding and growing tech startups
- **Open Source** - Contributing to and maintaining various open source projects
- **Content Creation** - Sharing insights through my newsletter (updatenight.com) and YouTube channel
- **Photography** - Sharing my photography on Unsplash with over 360k views

## 🖥️ Tech Stack

This portfolio is built with:

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- [Motion](https://motion.dev/) - Animation library
- [next-pwa](https://github.com/shadowwalker/next-pwa) - Progressive Web App support

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/) (v9.15.0 or newer)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/jiaweing/portfolio-dex.git
   cd portfolio-dex
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the development server

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Project Structure

```
portfolio-dex/
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── core/             # Core components like InView
│   ├── hero/             # Portfolio section components
│   ├── ui/               # UI components from shadcn/ui
│   └── ...               # Other components
├── data/                 # JSON data files
│   └── profile.json      # Portfolio content
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── images/           # Images
│   └── logos/            # Logo assets
└── ...                   # Config files
```

## 🎨 Features

- **Modern Design** - Clean, minimalist design with beautiful animations
- **Responsive** - Fully responsive design that works on all devices
- **Animations** - Smooth animations with InView components
- **Experience Sections** - Organized into Present, Past, and Open Source categories
- **Dynamic Content** - Content stored in JSON format for easy updates
- **Dark Mode** - Supports both light and dark themes
- **Performance** - Optimized for performance with Next.js

### Animation Components

The portfolio uses custom InView animation components that create beautiful fade-in effects when elements come into view during scrolling:

```jsx
<InView
  variants={{
    hidden: { opacity: 0, filter: "blur(4px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  viewOptions={{ once: true }}
>
  <YourComponent />
</InView>
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact Me

Interested in collaborating or have questions about my projects? Feel free to [email me](mailto:hey@jiaweing.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/jiaweing/).

---

<div align="center">
  <p>© 2025 Jia Wei Ng</p>
</div>
