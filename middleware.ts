import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // レスポンスの作成
  let response = NextResponse.next()
  
  // セキュリティヘッダーの追加
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )
  
  // Content Security Policy
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.jsで必要
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-ancestors 'none'",
  ]
  response.headers.set('Content-Security-Policy', cspDirectives.join('; '))

  // セットアップページの保護：既にユーザーが存在する場合はアクセス禁止
  if (pathname.startsWith('/admin/setup')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
          },
        },
      }
    )

    // 既にログイン済みの場合は管理画面にリダイレクト
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      response = NextResponse.redirect(new URL('/admin', request.url))
      // リダイレクト時もセキュリティヘッダーを保持
      response.headers.set('X-Frame-Options', 'DENY')
      response.headers.set('X-Content-Type-Options', 'nosniff')
      return response
    }

    // Note: クライアント側からは全ユーザー数の確認ができないため、
    // セットアップページ自体でチェックを実装する必要があります
  }

  // 管理画面のルート保護（ログインとセットアップを除く）
  if (pathname.startsWith('/admin') && 
      !pathname.startsWith('/admin/login') && 
      !pathname.startsWith('/admin/setup')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      response = NextResponse.redirect(new URL('/admin/login', request.url))
      // リダイレクト時もセキュリティヘッダーを保持
      response.headers.set('X-Frame-Options', 'DENY')
      response.headers.set('X-Content-Type-Options', 'nosniff')
      return response
    }
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    // 静的ファイルとAPIルートを除外
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ]
}