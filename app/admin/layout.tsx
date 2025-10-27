'use client'

import AdminSidebar from '@/components/admin/AdminSidebar'
import { usePathname } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // ログインページとセットアップページではサイドバーを表示しない
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/setup'

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* サイドバー */}
      <AdminSidebar />

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
