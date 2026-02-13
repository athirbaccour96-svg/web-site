# Database Setup Instructions (Supabase)

Since GitHub Pages is static and cannot host a database, we use **Supabase** (a free Postgres database) to store your contact form messages.

## 1. Create Supabase Account
1. Go to [https://supabase.com/](https://supabase.com/) and click "Start your project".
2. Sign in with GitHub.
3. Create a **New Project**.
   - **Name**: Portfolio
   - **Database Password**: (Generate a strong password and save it)
   - **Region**: Choose one close to you.
   - Click **Create new project**.

## 2. Get API Keys
1. Once the project is ready (takes ~30s), go to **Project Settings** (Cog icon at the bottom left).
2. Go to **API**.
3. Copy the **Project URL** and the **anon public** key.
4. Open your `js/script.js` file and replace the placeholders:
   ```javascript
   const SUPABASE_URL = 'https://your-project-id.supabase.co';
   const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```

## 3. Create the Database Table
1. In Supabase, go to the **Table Editor** (Grid icon on left).
2. Click **New Table**.
   - **Name**: `messages`
   - **Enable RLS (Row Level Security)**: Checked (Keep this enabled for security).
3. Add the following columns:
   - `id`: int8 (Primary Key) - *Already there*
   - `created_at`: timestamptz - *Already there*
   - `name`: text
   - `email`: text
   - `message`: text
4. Click **Save**.

## 4. Set Permissions (Row Level Security)
By default, Supabase blocks all writes. You need to allow the public to insert messages.

1. Go to **Authentication** > **Policies**.
2. Find the `messages` table.
3. Click **New Policy**.
4. Choose **"Get started quickly"** > **"Enable insert access for all users"**.
5. Click **Use this template**.
6. Review it (Target roles: anon) and click **Save Policy**.

## Done!
Your Portfolio on GitHub Pages will now send messages directly to your Supabase database.
