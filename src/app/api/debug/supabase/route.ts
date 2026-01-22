import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Check if environment variables are loaded
    const envCheck = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
      anonKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    };

    // Try a simple query to test connection
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    // Try to get auth user (this will be null since it's a public endpoint)
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    return NextResponse.json({
      status: 'Debug Info',
      timestamp: new Date().toISOString(),
      environment: {
        ...envCheck,
        nodeEnv: process.env.NODE_ENV,
      },
      supabaseConnection: {
        profileQuery: profileError ? { error: profileError.message } : { success: true, data: profiles },
        authCheck: userError ? { error: userError.message } : { user: user?.email || 'No user (expected for public endpoint)' },
      },
      message: 'If you see errors above, Supabase is not connecting properly',
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      status: 'Error',
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
