import { getSupabaseClient } from './storage';

/**
 * Sign in user with email and password via Supabase Auth
 */
export const loginWithEmail = async (email, password) => {
  const client = getSupabaseClient();
  if (!client) {
    return { 
      data: null, 
      error: { message: 'Pangkalan data Supabase belum dikonfigurasi.' } 
    };
  }
  
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.trim(),
      password: password
    });
    return { data, error };
  } catch (err) {
    console.error('Login error:', err);
    return { data: null, error: err };
  }
};

/**
 * Sign out current user
 */
export const logoutUser = async () => {
  const client = getSupabaseClient();
  if (!client) return { error: null };
  
  try {
    const { error } = await client.auth.signOut();
    return { error };
  } catch (err) {
    console.error('Logout error:', err);
    return { error: err };
  }
};

/**
 * Get current active session
 */
export const getAuthSession = async () => {
  const client = getSupabaseClient();
  if (!client) return null;
  
  try {
    const { data: { session }, error } = await client.auth.getSession();
    if (error) {
      console.warn('Could not get session:', error.message);
      return null;
    }
    return session;
  } catch (err) {
    console.error('Error fetching auth session:', err);
    return null;
  }
};

/**
 * Listen to auth state changes (sign in, sign out, token refresh)
 */
export const onAuthStateChange = (callback) => {
  const client = getSupabaseClient();
  if (!client) {
    return { 
      data: { 
        subscription: { 
          unsubscribe: () => {} 
        } 
      } 
    };
  }
  
  return client.auth.onAuthStateChange(callback);
};
