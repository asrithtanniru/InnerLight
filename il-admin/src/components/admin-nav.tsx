
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BookCopy,
  BookText,
  LayoutDashboard,
  MessageSquare,
  Star,
  Trophy,
  Users,
} from "lucide-react"

const links = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Programs", href: "/programs", icon: BookCopy },
  { name: "Lessons", href: "/lessons", icon: BookText },
  { name: "Challenges", href: "/challenges", icon: Trophy },
  { name: "Achievements", href: "/achievements", icon: Star },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname === link.href && "bg-muted text-primary"
          )}
        >
          <link.icon className="h-4 w-4" />
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
