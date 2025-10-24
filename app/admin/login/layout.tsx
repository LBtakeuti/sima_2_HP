export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ログインページは認証不要なので、AuthGuardを適用しない
  return <>{children}</>
}
