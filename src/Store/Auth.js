import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../Supabase/Supabase';

const useAuth = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      session: null,
      accessToken: null,

      initialize: async () => {
        console.log('Initializing auth...');
        set({ loading: true });

        try {
          const { data: { session }, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (!session) {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (user) {
              const {
                data: { session: refreshedSession, user: refreshedUser },
                error: refreshError,
              } = await supabase.auth.refreshSession();

              if (refreshError) throw refreshError;

              const jwt = refreshedSession.access_token;
              localStorage.setItem('jwt', jwt);

              set({
                user: refreshedUser,
                session: refreshedSession,
                accessToken: jwt,
                loading: false,
              });
              return;
            }
          }

          const jwt = session.access_token;
          localStorage.setItem('jwt', jwt);

          set({
            user: session?.user || null,
            session,
            accessToken: jwt,
            loading: false,
          });

          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
              console.log('Auth state changed:', event);
              if (event === 'SIGNED_OUT') {
                set({ user: null, session: null, accessToken: null });
                localStorage.removeItem('jwt');
              } else {
                const newToken = newSession?.access_token || null;
                if (newToken) localStorage.setItem('jwt', newToken);

                set({
                  user: newSession?.user || null,
                  session: newSession,
                  accessToken: newToken,
                });
              }
            }
          );

          return () => subscription?.unsubscribe();
        } catch (error) {
          console.error('Auth init error:', error);
          set({
            error: error.message,
            loading: false,
            user: null,
            session: null,
            accessToken: null,
          });
          localStorage.removeItem('jwt');
          await supabase.auth.signOut();
        }
      },

      login: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          const jwt = data?.session?.access_token;
          if (jwt) {
            localStorage.setItem('jwt', jwt);
           
          }

          set({
            user: data.user,
            session: data.session,
            accessToken: jwt,
            loading: false,
          });

          return data.user;
        } catch (error) {
          console.error('Login failed:', error);
          set({ error: error.message, loading: false });
          return null;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await supabase.auth.signOut();
          set({
            user: null,
            session: null,
            accessToken: null,
            loading: false,
          });
          localStorage.removeItem('jwt');
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      signup: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;

          const jwt = data.session?.access_token;
          if (jwt) localStorage.setItem('jwt', jwt);

          set({
            user: data.user,
            session: data.session,
            accessToken: jwt || null,
            loading: false,
          });

          return data.user;
        } catch (error) {
          set({ error: error.message, loading: false });
          return null;
        }
      },

      refreshUser: async () => {
        set({ loading: true });
        try {
          const { data: { user }, error } = await supabase.auth.getUser();
          if (error) throw error;

          set({ user, loading: false });
          return user;
        } catch (error) {
          set({ error: error.message, loading: false });
          return null;
        }
      },

      checkSession: async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          set({ user: null });
          return null;
        }
        if (user) {
          set({ user });
          return user;
        }
        return null;
      },

      updateProfile: async (updates) => {
        set({ loading: true });
        try {
          const { data, error } = await supabase.auth.updateUser(updates);
          if (error) throw error;

          set({ user: data.user, loading: false });
          return data.user;
        } catch (error) {
          set({ error: error.message, loading: false });
          return null;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        accessToken: state.accessToken,
      }),
    }
  )
);

export default useAuth;
