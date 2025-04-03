"use client"

import { Home, Search, Heart, BarChart2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-60 fixed top-16 bottom-0 left-0 z-30 border-r bg-gray-50 overflow-y-auto">
      <nav className="space-y-1 px-2 py-4">
        <Link
          href="/"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            pathname === "/" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Home className="h-5 w-5" />
          <span>ホーム</span>
        </Link>
        <Link
          href="/search"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            pathname === "/search" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Search className="h-5 w-5" />
          <span>検索</span>
        </Link>
        <Link
          href="/favorites"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            pathname === "/favorites" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Heart className="h-5 w-5" />
          <span>お気に入り</span>
        </Link>
        <Link
          href="/analysis"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            pathname === "/analysis" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <BarChart2 className="h-5 w-5" />
          <span>好み分析</span>
        </Link>
      </nav>
    </div>
  )
}

