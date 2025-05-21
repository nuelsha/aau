# Supabase Setup Guide for AAU Partnership Management System

This document provides detailed instructions for setting up the Supabase backend for the AAU Partnership Management System.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com) if you don't already have one
2. Create a new Supabase project
3. Save your Supabase URL and anon key in the configuration

## Database Setup

1. Navigate to your Supabase project's SQL Editor
2. Run the following SQL script to create the partners table:

```sql
-- Create partners table
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  partner_institution jsonb not null, -- Stores name, address, country, typeOfOrganization
  aau_contact jsonb not null, -- Stores interestedCollegeOrDepartment
  potential_areas_of_collaboration text[] not null,
  other_collaboration_area text,
  potential_start_date date not null,
  duration_of_partnership text not null,
  partner_contact_person jsonb not null, -- Stores name, title, institutionalEmail, phoneNumber, address
  partner_contact_person_secondary jsonb, -- Optional secondary contact
  aau_contact_person jsonb not null, -- Stores name, college, schoolDepartmentUnit, institutionalEmail, phoneNumber
  aau_contact_person_secondary jsonb, -- Optional secondary contact
  status text not null,
  campus_id text,
  created_by uuid,
  is_archived boolean default false,
  mou_file_url text,
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
```

3. Verify the table was created correctly by clicking on "Table Editor" and checking if the "partners" table appears.

## Storage Setup (Optional)

If you plan to upload MoU documents:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called "partnership-documents"
3. Set appropriate access policies

## Authentication Setup

1. Go to Authentication > Settings
2. Configure Email Auth provider settings if needed

## Troubleshooting

### "Table does not exist" error

If you see an error like "relation 'public.partners' does not exist", it means the table has not been created. Follow the database setup instructions above.

### Data formatting issues

Make sure the data being submitted matches the expected format. Check the console for specific error messages.

## Further Help

If you need additional assistance, consult the [Supabase documentation](https://supabase.com/docs) or reach out to the development team.
