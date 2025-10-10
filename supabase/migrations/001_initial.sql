-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create news table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),

  -- Japanese
  title_ja TEXT NOT NULL,
  content_ja TEXT NOT NULL,

  -- English
  title_en TEXT NOT NULL,
  content_en TEXT NOT NULL,

  -- Hindi
  title_hi TEXT NOT NULL,
  content_hi TEXT NOT NULL,

  -- Optional
  thumbnail_url TEXT,
  slug VARCHAR(255) UNIQUE
);

-- Indexes
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_published_date ON news(published_date DESC);
CREATE INDEX idx_news_created_at ON news(created_at DESC);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON news
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Contact Info
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,

  -- Metadata
  language VARCHAR(2) DEFAULT 'ja' CHECK (language IN ('ja', 'en', 'hi')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  admin_note TEXT,

  -- Tracking
  user_agent TEXT,
  ip_address INET
);

-- Indexes
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON contacts(email);

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- News: Public can read published news
CREATE POLICY "Public can read published news"
ON news FOR SELECT
USING (status = 'published');

-- News: Authenticated users can do everything
CREATE POLICY "Authenticated users can manage news"
ON news FOR ALL
USING (auth.role() = 'authenticated');

-- Contacts: Anyone can insert
CREATE POLICY "Anyone can submit contact form"
ON contacts FOR INSERT
WITH CHECK (true);

-- Contacts: Authenticated users can read/update
CREATE POLICY "Authenticated users can manage contacts"
ON contacts FOR ALL
USING (auth.role() = 'authenticated');