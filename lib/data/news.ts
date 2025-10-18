import type { Language } from '@/lib/i18n/config'

export interface NewsItemData {
  id: string
  published_date: string
  category_ja: string
  category_en: string
  category_hi?: string
  category_color: 'green' | 'blue' | 'purple' | 'gray'
  title_ja: string
  title_en: string
  title_hi?: string
  content_ja: string
  content_en: string
  content_hi?: string
  excerpt_ja?: string
  excerpt_en?: string
  excerpt_hi?: string
  image_url?: string
  tags?: string[]
  featured?: boolean
}

// 拡張されたダミーニュースデータ
export const newsData: NewsItemData[] = [
  {
    id: '1',
    published_date: '2025.10.15',
    category_ja: 'お知らせ',
    category_en: 'Announcement',
    category_hi: 'घोषणा',
    category_color: 'green',
    title_ja: '【会社設立】株式会社SEEMAPARを設立いたしました',
    title_en: '[Company Establishment] SEEMAPAR Corporation has been established',
    title_hi: '[कंपनी स्थापना] SEEMAPAR कॉर्पोरेशन की स्थापना की गई है',
    content_ja: `この度、株式会社SEEMAPARを設立いたしました。SEEMAPARは、日本とインドの架け橋となり、両国間のビジネス発展に貢献することを使命としています。

私たちの名前「SEEMAPAR」は、代表取締役のSEEMA PATILの名前から来ており、「境界を越える」という意味を込めています。日本とインド、二つの異なる文化とビジネス環境を結び、新たな価値を創造していきます。

当社は「実働型コンサルティング」を特徴とし、机上の理論ではなく、現場での実践を通じて成果を生み出します。1989年から続く日印ビジネスの経験と実績を活かし、お客様の成功をサポートいたします。`,
    content_en: `We are pleased to announce the establishment of SEEMAPAR Corporation. SEEMAPAR's mission is to serve as a bridge between Japan and India, contributing to business development between both countries.

Our name "SEEMAPAR" comes from our CEO SEEMA PATIL's name and embodies the meaning of "crossing boundaries." We connect Japan and India, two different cultures and business environments, to create new value.

Our company is characterized by "hands-on consulting," generating results through practical implementation rather than theoretical approaches. Leveraging our experience and achievements in Japan-India business since 1989, we support our clients' success.`,
    excerpt_ja: 'この度、株式会社SEEMAPARを設立いたしました。日本とインドの架け橋となり、両国間のビジネス発展に貢献することを使命としています。',
    excerpt_en: 'We are pleased to announce the establishment of SEEMAPAR Corporation, serving as a bridge between Japan and India.',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    tags: ['会社設立', 'SEEMAPAR', '日印ビジネス'],
    featured: true
  },
  {
    id: '2',
    published_date: '2025.10.10',
    category_ja: 'サービス',
    category_en: 'Services',
    category_hi: 'सेवाएं',
    category_color: 'blue',
    title_ja: '【サービス開始】日印クロスボーダー事業コンサルティングサービスを開始',
    title_en: '[Service Launch] Japan-India Cross-Border Business Consulting Service Started',
    title_hi: '[सेवा शुरुआत] जापान-भारत क्रॉस-बॉर्डर बिजनेस कंसल्टिंग सेवा शुरू',
    content_ja: `日印クロスボーダー事業コンサルティングサービスを正式に開始いたします。

## サービス内容

### 初回コンサルティング
現状課題の整理と最適な方向性の提示を行います。¥20,000（毎月第1土曜日は無料枠あり）

### 市場調査・競合分析
現地訪問を含む徹底的な調査を実施し、規制・競合・消費者動向を月次レポートで提供します。

### 展示会同行・商談支援
展示会への同行、重要会議の設計・同席、多言語対応メールドラフト作成を行います。

### 直接調達・製造管理
小ロット製造対応、第三者検査済み、価格透明性を保ちつつ自走化支援を提供します。`,
    content_en: `We are officially launching our Japan-India Cross-Border Business Consulting Service.

## Service Overview

### Initial Consultation
We organize current challenges and suggest optimal directions. ¥20,000 (Free slots available on the 1st Saturday of every month)

### Market Research & Analysis
Thorough research including site visits, providing monthly reports on regulations, competition, and consumer trends.

### Exhibition & Negotiation Support
Accompany to exhibitions, design and attend important meetings, create multilingual email drafts.

### Direct Procurement & Manufacturing
Small lot manufacturing support, third-party inspection, price transparency with self-sufficiency support.`,
    excerpt_ja: '日印クロスボーダー事業コンサルティングサービスを正式に開始。実働型コンサルティングで成果を創出します。',
    excerpt_en: 'Officially launching Japan-India Cross-Border Business Consulting Service with hands-on approach.',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    tags: ['サービス開始', 'コンサルティング', '日印ビジネス'],
    featured: true
  },
  {
    id: '3',
    published_date: '2025.10.08',
    category_ja: 'メディア掲載',
    category_en: 'Media Coverage',
    category_hi: 'मीडिया कवरेज',
    category_color: 'purple',
    title_ja: '【メディア掲載】日経ビジネスにて代表・PATIL SEEMAのインタビュー記事が掲載',
    title_en: '[Media Coverage] Interview with CEO PATIL SEEMA published in Nikkei Business',
    title_hi: '[मीडिया कवरेज] निक्केई बिजनेस में सीईओ पाटिल सीमा का इंटरव्यू प्रकाशित',
    content_ja: `日経ビジネス2025年10月号にて、代表取締役PATIL SEEMAのインタビュー記事が掲載されました。

## インタビューの主な内容

「日印ビジネスの未来：真珠のように価値ある関係の構築」と題した記事では、以下の内容について語られています：

- 1989年来日から現在までの日印ビジネス経験
- MukTI設立・売却の経験から学んだ教訓
- 500名以上の人材育成で培ったノウハウ
- SEEMAPARの「実働型コンサルティング」への想い
- AI時代における人間関係の重要性

「技術は進歩しても、ビジネスの本質は人と人との信頼関係にある。私たちは、その信頼を『真珠』のように磨き上げ、価値ある関係を築いていきたい」と語っています。`,
    content_en: `An interview article with CEO PATIL SEEMA was published in Nikkei Business October 2025 issue.

## Main Interview Content

The article titled "The Future of Japan-India Business: Building Pearl-like Valuable Relationships" covers:

- Japan-India business experience from 1989 arrival to present
- Lessons learned from MukTI founding and exit experience
- Know-how cultivated through training 500+ professionals
- Thoughts on SEEMAPAR's "hands-on consulting" approach
- Importance of human relationships in the AI era

"Even as technology advances, the essence of business lies in trust between people. We want to polish that trust like a 'pearl' and build valuable relationships," she states.`,
    excerpt_ja: '日経ビジネス2025年10月号にて、代表・PATIL SEEMAのインタビュー記事が掲載されました。',
    excerpt_en: 'Interview with CEO PATIL SEEMA published in Nikkei Business October 2025 issue.',
    image_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    tags: ['メディア掲載', '日経ビジネス', 'インタビュー'],
    featured: false
  },
  {
    id: '4',
    published_date: '2025.10.05',
    category_ja: 'イベント',
    category_en: 'Events',
    category_hi: 'कार्यक्रम',
    category_color: 'blue',
    title_ja: '【イベント予告】インド進出セミナー「真珠のように価値ある展開を」開催決定',
    title_en: '[Event Announcement] India Expansion Seminar "Creating Pearl-like Value" Scheduled',
    title_hi: '[कार्यक्रम घोषणा] भारत विस्तार सेमिनार "मोती जैसा मूल्य निर्माण" निर्धारित',
    content_ja: `2025年11月15日（土）、東京国際フォーラムにてインド進出セミナー「真珠のように価値ある展開を」を開催いたします。

## セミナー概要

**日時**: 2025年11月15日（土）13:00-17:00
**会場**: 東京国際フォーラム ホールC
**参加費**: 無料（事前登録制）
**定員**: 200名

## プログラム

### 13:00-13:40 基調講演
「インド市場の真珠を見つける方法」
講師：PATIL SEEMA（株式会社SEEMAPAR 代表取締役）

### 14:00-14:40 パネルディスカッション
「成功企業に学ぶインド展開の秘訣」
モデレーター：PATIL SEEMA
パネリスト：
- インド進出成功企業CEO 3名
- 現地パートナー企業代表

### 15:00-16:00 分科会
A. 製造業のインド展開戦略
B. IT・サービス業のインド市場参入
C. 小売・消費財業界の現地化戦略

### 16:10-17:00 ネットワーキング
参加者同士の交流タイム

お申し込みは弊社ウェブサイトのお問い合わせフォームからお願いいたします。`,
    content_en: `We will hold the India Expansion Seminar "Creating Pearl-like Value" at Tokyo International Forum on Saturday, November 15, 2025.

## Seminar Overview

**Date & Time**: Saturday, November 15, 2025, 13:00-17:00
**Venue**: Tokyo International Forum Hall C
**Fee**: Free (Advance registration required)
**Capacity**: 200 participants

## Program

### 13:00-13:40 Keynote Speech
"How to Find Pearls in the Indian Market"
Speaker: PATIL SEEMA (CEO, SEEMAPAR Corporation)

### 14:00-14:40 Panel Discussion
"Secrets of India Expansion from Successful Companies"
Moderator: PATIL SEEMA
Panelists:
- 3 CEOs of successful India expansion companies
- Local partner company representatives

### 15:00-16:00 Breakout Sessions
A. India Expansion Strategy for Manufacturing
B. IT & Service Industry Market Entry
C. Retail & Consumer Goods Localization Strategy

### 16:10-17:00 Networking
Participant interaction time

Please apply through the contact form on our website.`,
    excerpt_ja: '2025年11月15日、東京国際フォーラムにてインド進出セミナー「真珠のように価値ある展開を」を開催します。',
    excerpt_en: 'India Expansion Seminar "Creating Pearl-like Value" scheduled for November 15, 2025 at Tokyo International Forum.',
    image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    tags: ['イベント', 'セミナー', 'インド進出'],
    featured: false
  }
]

export const getCategoryStyle = (color: string) => {
  switch (color) {
    case 'green':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'purple':
      return 'bg-purple-100 text-purple-800 border border-purple-200'
    case 'blue':
      return 'bg-brand-100 text-brand-800 border border-brand-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

export const getLocalizedNewsItem = (item: NewsItemData, lang: Language) => {
  return {
    id: item.id,
    published_date: item.published_date,
    category: item[`category_${lang}` as keyof NewsItemData] as string || item.category_ja,
    category_color: item.category_color,
    title: item[`title_${lang}` as keyof NewsItemData] as string || item.title_ja,
    content: item[`content_${lang}` as keyof NewsItemData] as string || item.content_ja,
    excerpt: item[`excerpt_${lang}` as keyof NewsItemData] as string || item.excerpt_ja,
    image_url: item.image_url,
    tags: item.tags,
    featured: item.featured
  }
}