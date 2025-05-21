-- Create partners table
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  status text not null,
  duration text,
  region text,
  college text,
  description text,
  started_at date,
  ends_at date,
  contact_name text,
  contact_email text,
  contact_phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.partners enable row level security;

-- Create basic policies
-- Allow all authenticated users to read partners
create policy "Allow authenticated users to read partners"
  on public.partners
  for select
  to authenticated
  using (true);

-- Allow authenticated users to insert partners
create policy "Allow authenticated users to insert partners"
  on public.partners
  for insert
  to authenticated
  with check (true);

-- Allow authenticated users to update their own partners
create policy "Allow authenticated users to update partners"
  on public.partners
  for update
  to authenticated
  using (true);

-- Allow authenticated users to delete their own partners
create policy "Allow authenticated users to delete partners"
  on public.partners
  for delete
  to authenticated
  using (true);

-- Create a function to update the updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create a trigger to update the updated_at column
create trigger update_partners_updated_at
before update on public.partners
for each row
execute function public.update_updated_at_column();
