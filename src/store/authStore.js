import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isHydrated: false,
      login: (data) => {
        console.log('Auth store: Login called with data:', data);
        set({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          isHydrated: true
        });
      },
      logout: () => {
        console.log('Auth store: Logout called');
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          isHydrated: true
        });
      },
      setCredentials: (data) => {
        console.log('Auth store: setCredentials called with data:', data);
        set({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          isHydrated: true
        });
      },
      updateUser: (userData) => {
        console.log('Auth store: updateUser called with data:', userData);
        set((state) => ({
          ...state,
          user: { ...state.user, ...userData }
        }));
      },
      setHydrated: () => {
        const currentState = get();
        if (!currentState.isHydrated) {
          console.log('Auth store: Setting hydrated to true');
          set((state) => ({ ...state, isHydrated: true }));
        }
      },
      fetchUser: async () => {
        const state = get();
        if (!state.token) {
          console.log('No token found in auth store');
          return null;
        }

        try {
          console.log('Fetching user data with token...');
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${state.token}`
            }
          });

          console.log('Response status:', response.status);
          const data = await response.json();
          console.log('Response data:', data);

          if (response.ok && data.success && data.data?.user) {
            set((state) => ({
              ...state,
              user: data.data.user
            }));
            console.log('User data updated successfully');
            return data.data.user;
          } else {
            console.log('API call failed or invalid response:', data);
            // Token is invalid, logout
            set({
              isAuthenticated: false,
              user: null,
              token: null,
              isHydrated: true
            });
            return null;
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          // On network error, don't automatically logout - let the component handle it
          return null;
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token
      }),
      onRehydrateStorage: () => (state) => {
        // Set hydrated when rehydration is complete
        if (state) {
          console.log('Auth store: Rehydration complete, setting hydrated');
          state.setHydrated();
        }
      }
    }
  )
);

export default useAuthStore; 