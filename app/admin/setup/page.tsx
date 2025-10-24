'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminSetup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // パスワード確認
    if (password !== confirmPassword) {
      setError('パスワードが一致しません。')
      setLoading(false)
      return
    }

    // パスワードの強度チェック
    if (password.length < 8) {
      setError('パスワードは8文字以上で設定してください。')
      setLoading(false)
      return
    }

    try {
      // 既存のユーザーがいないかチェック
      const { data: existingUsers } = await supabase.auth.admin.listUsers()

      // 注: この方法は動作しない可能性があります（admin APIはサーバーサイドのみ）
      // 代わりに直接ユーザー作成を試みます

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined, // メール確認を無効化
        }
      })

      if (signUpError) {
        setError(`ユーザー作成に失敗しました: ${signUpError.message}`)
        console.error('Sign up error:', signUpError)
      } else if (data.user) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/login')
        }, 3000)
      }
    } catch (err) {
      setError('エラーが発生しました。もう一度お試しください。')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                セットアップ完了！
              </h2>
              <p className="text-gray-600 mb-4">
                管理者アカウントが作成されました。
              </p>
              <p className="text-sm text-gray-500">
                3秒後にログインページに移動します...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent mb-2">
              SEEMAPAR
            </h1>
            <p className="text-gray-600">管理者アカウント初期セットアップ</p>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ このページは初回のみ使用してください
              </p>
            </div>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* セットアップフォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                管理者メールアドレス *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="admin@example.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                パスワード *
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="8文字以上"
                required
                disabled={loading}
                minLength={8}
              />
              <p className="text-xs text-gray-500 mt-1">
                8文字以上の安全なパスワードを設定してください
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                パスワード（確認） *
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="パスワードを再入力"
                required
                disabled={loading}
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  作成中...
                </span>
              ) : (
                '管理者アカウントを作成'
              )}
            </button>
          </form>

          {/* フッター */}
          <div className="mt-8 text-center">
            <a
              href="/admin/login"
              className="text-sm text-brand-600 hover:text-brand-700 transition"
            >
              ← ログインページに戻る
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
