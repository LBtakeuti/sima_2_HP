-- news_categoriesテーブルのデータを修正
-- パートナーシップのカテゴリが誤って入っていたため、適切なニュースカテゴリに置き換え

-- 既存のデータを削除
DELETE FROM news_categories;

-- 適切なニュースカテゴリを追加
INSERT INTO news_categories (name_ja, name_en, slug, color, display_order, is_active) VALUES
  ('お知らせ', 'Announcement', 'announcement', 'blue', 1, true),
  ('イベント', 'Event', 'event', 'green', 2, true),
  ('プレスリリース', 'Press Release', 'press-release', 'purple', 3, true),
  ('企業情報', 'Company News', 'company-news', 'gray', 4, true),
  ('メディア掲載', 'Media Coverage', 'media-coverage', 'yellow', 5, true),
  ('セミナー', 'Seminar', 'seminar', 'red', 6, true);
