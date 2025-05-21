# How to Run Supabase Migrations for AAU Partnership Management System

This guide provides step-by-step instructions for setting up the database tables required for the AAU Partnership Management System.

## Prerequisites

1. Access to your Supabase project dashboard
2. Admin privileges on your Supabase project

## Method 1: Using the SQL Editor

1. Log in to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to the **SQL Editor** tab in the left sidebar
4. Click the "New Query" button
5. Copy the entire SQL content from `supabase/migrations/20250521_create_partners_table.sql`
6. Paste the SQL content into the query editor
7. Click "Run" to execute the query
8. Verify that the table was created by checking the "Table Editor" tab

## Method 2: Using the Supabase CLI (Advanced)

If you prefer using the Supabase CLI for migrations:

1. Install the Supabase CLI if you haven't already:

   ```bash
   npm install -g supabase
   ```

2. Login to your Supabase account:

   ```bash
   supabase login
   ```

3. Link your local project to your Supabase project:

   ```bash
   supabase link --project-ref YOUR_PROJECT_ID
   ```

   Replace `YOUR_PROJECT_ID` with your Supabase project ID (found in your project settings).

4. Run the migration:
   ```bash
   supabase db push
   ```

## Verify the Setup

After running the migrations, you should:

1. Go to the **Table Editor** tab
2. Check if the `partners` table exists with the correct schema
3. Test creating a new partnership from the application

## Setting Up File Storage

For the MoU document upload functionality to work, you need to set up a storage bucket:

1. In your Supabase dashboard, go to the **Storage** tab
2. Click "Create a new bucket"
3. Name the bucket `partnership-documents`
4. Set the access level to "Private" (controlled by RLS policies)
5. Add the following policy to allow authenticated users to upload:
   - Policy name: `Allow authenticated uploads`
   - Policy definition: `auth.role() = 'authenticated'`
   - Operation: `INSERT`

## Troubleshooting

### "Table does not exist" error

If you see an error like "relation 'public.partners' does not exist" after running the migrations:

1. Go back to the SQL Editor
2. Make sure there were no error messages when running the script
3. Try running just the table creation part again:
   ```sql
   create table if not exists public.partners (
     id uuid primary key default gen_random_uuid(),
     partner_institution jsonb not null,
     aau_contact jsonb not null,
     potential_areas_of_collaboration text[] not null,
     other_collaboration_area text,
     potential_start_date date not null,
     duration_of_partnership text not null,
     partner_contact_person jsonb not null,
     partner_contact_person_secondary jsonb,
     aau_contact_person jsonb not null,
     aau_contact_person_secondary jsonb,
     status text not null,
     campus_id text,
     created_by uuid,
     is_archived boolean default false,
     mou_file_url text,
     created_at timestamp with time zone default now(),
     updated_at timestamp with time zone default now()
   );
   ```

### "Permission denied" errors

If you encounter permission errors when creating partnerships:

1. Check that Row Level Security (RLS) is properly set up
2. Make sure the appropriate policies were created
3. Try running the policy creation part of the script:

   ```sql
   -- Create basic policies
   create policy "Allow authenticated users to read partners"
     on public.partners
     for select
     to authenticated
     using (true);

   create policy "Allow authenticated users to insert partners"
     on public.partners
     for insert
     to authenticated
     with check (true);
   ```
