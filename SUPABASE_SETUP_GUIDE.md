# Supabase Setup Guide for Mohini Undergarments

## Step 1: Connect to Supabase

Since you've already authorized Supabase, follow these steps:

1. **Click "Connect to Supabase"** button in the top right corner of Bolt
2. **Select your project** from the list of available projects
3. **Copy the environment variables** that appear after connection

## Step 2: Set Up Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Run Database Migration

1. **Go to your Supabase Dashboard** (https://supabase.com/dashboard)
2. **Select your project**
3. **Navigate to SQL Editor** (in the left sidebar)
4. **Create a new query**
5. **Copy and paste** the entire content from `supabase/migrations/20250618080857_smooth_poetry.sql`
6. **Click "Run"** to execute the migration

## Step 4: Verify Database Setup

After running the migration, you should see these tables in your database:

- `admins` - Admin user management
- `users` - Customer information  
- `products` - Product catalog
- `orders` - Order management
- `order_items` - Order line items

## Step 5: Test the Application

1. **Start the development server** (should already be running)
2. **Visit the website** - you should see the homepage
3. **Test admin access**:
   - Click the small "A" button in bottom right corner
   - Login with: `admin@mohini.com` / `admin123`
4. **Test product management** in the admin panel

## Step 6: Add Sample Data (Optional)

The migration includes sample products. You can:

1. **View products** in the admin panel
2. **Add more products** using the admin interface
3. **Test the shopping cart** by adding products from the shop page

## Troubleshooting

### If you get connection errors:
1. Check that your `.env` file has the correct Supabase URL and key
2. Ensure the migration ran successfully without errors
3. Verify RLS (Row Level Security) policies are enabled

### If admin login doesn't work:
1. Check that the `admins` table was created
2. Verify the sample admin user was inserted
3. Try creating a new admin user manually in Supabase dashboard

### If products don't appear:
1. Check that the `products` table has data
2. Verify the `is_active` column is set to `true`
3. Check browser console for any JavaScript errors

## Security Notes

- The demo admin credentials should be changed in production
- RLS policies are configured for security
- All sensitive operations require proper authentication
- Environment variables keep your Supabase keys secure

## Next Steps

Once everything is working:

1. **Customize the store details** (name, contact info, etc.)
2. **Add real product images** and descriptions
3. **Configure payment processing** if needed
4. **Set up email notifications** for orders
5. **Deploy to production** when ready

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify your Supabase project is active
3. Ensure all environment variables are correct
4. Test the database connection in Supabase dashboard