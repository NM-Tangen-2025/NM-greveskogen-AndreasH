'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates and returns a Supabase client for server-side operations.
 * This function handles cookie management for authentication.
 * 
 * **Example:**
 * ```typescript
* import { createClient } from '@/src/utils/database/supabase/server';
* 
* // Use in a Server Component or Server Action
* const supabase = await createClient();
* const { data, error } = await supabase.from('users').select();
* ```
* 
* @returns A Supabase client configured for server-side use
*/
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.PUBLIC_SUPABASE_URL!,
    process.env.PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}