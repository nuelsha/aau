# Supabase Setup Instructions

This document provides instructions for setting up the Supabase backend for the AAU Partnership Management System.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com) if you don't already have one
2. Create a new Supabase project
3. Save your Supabase URL and anon key in the `.env.local` file

## Database Setup

1. Navigate to your Supabase project's SQL Editor
2. Run the following SQL scripts in order:
   - `supabase/migrations/20250521_create_partners_table.sql`

## Authentication Setup

1. Go to Authentication > Settings
2. Configure Email Auth provider settings
3. Set up email templates for sign-up, password recovery, etc.
4. (Optional) Set up additional providers like Google Auth

## Storage Setup (If needed)

1. Go to Storage
2. Create a new bucket called "partner-documents"
3. Set the following bucket policies:
   - Allow authenticated users to upload files
   - Allow authenticated users to download files

## Environment Variables

Make sure your `.env.local` file is properly configured with these variables:

```
VITE_SUPABASE_URL=https://awtthccfyrjdwgcjfuth.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dHRoY2NmeXJqZHdnY2pmdXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MDk2OTMsImV4cCI6MjA2MzM4NTY5M30.cGJ5EDDqZNJf7rATXkbhC3bzNF4Sa5_5yRXwg3qakBs
```

## Database Tables

### Partners Table

This table stores partnership information:

- `id`: UUID primary key
- `name`: Text (required) - Partner organization name
- `type`: Text (required) - Partnership type
- `status`: Text (required) - Current status
- `duration`: Text - Duration category
- `region`: Text - Geographic region
- `college`: Text - Associated college
- `description`: Text - Partnership description
- `started_at`: Date - Start date
- `ends_at`: Date - End date
- `contact_name`: Text - Primary contact name
- `contact_email`: Text - Contact email
- `contact_phone`: Text - Contact phone
- `created_at`: Timestamp - Creation time
- `updated_at`: Timestamp - Last update time
