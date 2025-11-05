/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  outputFileTracingRoot: __dirname,
  
  // セキュリティ設定
  reactStrictMode: true,
  poweredByHeader: false, // X-Powered-Byヘッダーを非表示
  
  // 本番環境でのソースマップを無効化（セキュリティ向上）
  productionBrowserSourceMaps: false,
  
  // HTTPヘッダーの追加設定
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig