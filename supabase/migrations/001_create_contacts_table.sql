-- Contact inquiries table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('ja', 'en', 'hi')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  admin_note TEXT,
  user_agent TEXT,
  ip_address INET,
  service_name TEXT,
  service_id TEXT
);

-- Create indexes for better performance
CREATE INDEX contacts_created_at_idx ON contacts (created_at DESC);
CREATE INDEX contacts_status_idx ON contacts (status);
CREATE INDEX contacts_email_idx ON contacts (email);
CREATE INDEX contacts_service_id_idx ON contacts (service_id) WHERE service_id IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow INSERT for authenticated users
CREATE POLICY "Allow contact submissions" ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow SELECT for authenticated admin users
CREATE POLICY "Allow admin to view contacts" ON contacts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );

-- Policy: Allow UPDATE for authenticated admin users
CREATE POLICY "Allow admin to update contacts" ON contacts
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = current_setting('app.admin_email', true)
    )
  );