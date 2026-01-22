import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create supabase client only if credentials are provided
// This prevents build errors when env vars are not set
let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    // Create a mock client for build time
    // This will be replaced with real client at runtime
    console.warn('Supabase credentials not found. Auth features will not work.');
    supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
}

export { supabase };

// Admin client with service role key for elevated privileges
// Only use this on the server side for admin operations
export const createAdminClient = () => {
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        console.warn('Admin client credentials not found.');
        return null;
    }

    return createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
};

// Type definitions for user roles
export type UserRole = 'admin' | 'user';

export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    role: UserRole;
    created_at: string;
    updated_at: string;
    avatar_url: string | null;
    is_active: boolean;
}
