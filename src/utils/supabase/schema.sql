-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create companies table
CREATE TABLE companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('admin', 'manager', 'user')) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create contacts table
CREATE TABLE contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('todo', 'in_progress', 'done')) NOT NULL DEFAULT 'todo',
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create notes table
CREATE TABLE notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security Policies

-- Companies: Users can only access their own company
CREATE POLICY company_isolation_policy ON companies
  USING (id = (SELECT company_id FROM profiles WHERE id = auth.uid()));

-- Profiles: Users can read all profiles in their company, but only update their own
CREATE POLICY profiles_read_policy ON profiles
  FOR SELECT USING (company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY profiles_update_policy ON profiles
  FOR UPDATE USING (id = auth.uid());

-- Contacts: Users can access contacts within their company
CREATE POLICY contacts_company_policy ON contacts
  USING (company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()));

-- Tasks: Users can access tasks within their company
CREATE POLICY tasks_company_policy ON tasks
  USING (company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()));

-- Notes: Users can access notes within their company
CREATE POLICY notes_company_policy ON notes
  USING (company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()));

-- Events: Users can access events within their company
CREATE POLICY events_company_policy ON events
  USING (company_id = (SELECT company_id FROM profiles WHERE id = auth.uid()));

-- Notifications: Users can only access their own notifications
CREATE POLICY notifications_user_policy ON notifications
  USING (user_id = auth.uid());

-- Enable Row Level Security for all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;




create table public.companies (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    created_at timestamp with time zone default now() not null
);

-- Enable Row Level Security (RLS)
alter table public.companies enable row level security;

CREATE POLICY company_isolation_policy ON companies
  USING (id = (SELECT company_id FROM profiles WHERE id = auth.uid()));

-- Create policy to allow authenticated users to read all records
create policy "Allow authenticated users to read companies"
on public.companies
for select
to authenticated
using (true);

-- Create policy to allow authenticated users to insert records
create policy "Allow authenticated users to insert companies"
on public.companies
for insert
to authenticated
with check (true);

-- Create policy to allow authenticated users to update their records
create policy "Allow authenticated users to update companies"
on public.companies
for update
to authenticated
using (true);

-- Create policy to allow authenticated users to delete their records
create policy "Allow authenticated users to delete companies"
on public.companies
for delete
to authenticated
using (true);