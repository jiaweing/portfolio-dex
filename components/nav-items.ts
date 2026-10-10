import {
  BookOpen02Icon as BookOpen,
  Bookmark02Icon as Computer,
  FolderLibraryIcon,
  Globe02Icon,
  Home01Icon as HomeIcon,
  UserSquareIcon,
} from "hugeicons-react";
import { WrappedGiftIcon } from "@/components/wrapped/wrapped-gift-icon";

export const NAV_ITEMS = [
  { href: "/wrapped", icon: WrappedGiftIcon, label: "2025 Wrapped!" },
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/about", icon: UserSquareIcon, label: "About" },
  { href: "/blog", icon: BookOpen, label: "Writing" },
  { href: "/projects", icon: Globe02Icon, label: "Projects" },

  { href: "/books", icon: FolderLibraryIcon, label: "Books" },
  { href: "/setup", icon: Computer, label: "Setup" },
];
