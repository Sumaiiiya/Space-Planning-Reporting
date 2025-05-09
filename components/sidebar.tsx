"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, Clock, FileText, History, Home, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Point-in-Time Report",
    icon: Clock,
    href: "/dashboard/point-in-time",
    color: "text-violet-500",
  },
  {
    label: "Historical Report",
    icon: History,
    href: "/dashboard/historical",
    color: "text-pink-700",
  },
  {
    label: "Measurement Frequency",
    icon: Calendar,
    href: "/dashboard/measurement-frequency",
    color: "text-orange-500",
  },
  {
    label: "Frequency Dashboard",
    icon: BarChart3,
    href: "/dashboard/frequency-dashboard",
    color: "text-emerald-500",
  },
  {
    label: "Risk Report",
    icon: AlertTriangle,
    href: "/dashboard/risk-report",
    color: "text-red-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-white border-r shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 px-1">
          <FileText className="h-8 w-8 text-[#1876D2]" />
          <span className="text-xl font-bold">Space Planning</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1 px-3">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-[#1876D2]",
              pathname === route.href ? "bg-sky-50 text-[#1876D2]" : "text-gray-500",
            )}
          >
            <route.icon className={cn("h-5 w-5", route.color)} />
            {route.label}
          </Link>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#1876D2] flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div>
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-muted-foreground">Corporate User</p>
          </div>
        </div>
      </div>
    </div>
  )
}
