"use client";

import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { useStore } from "zustand";
import { User } from "@/types";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

export const DEV_USER: User = {
    id: "dev_user_001",
    email: "dev@micarpeta.com",
    name: "Desarrollador",
    preferences: {
        theme: "system"
    }
};

export const useAuthStore = createStore<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (email) => {
                // En modo dev, si es el email de dev, lo logueamos directo
                if (email === DEV_USER.email) {
                    set({ user: DEV_USER, isAuthenticated: true });
                } else {
                    // Mock generic user
                    set({
                        user: {
                            id: "user_" + Math.random().toString(36).substr(2, 9),
                            email,
                            name: email.split('@')[0]
                        },
                        isAuthenticated: true
                    });
                }
            },
            logout: () => set({ user: null, isAuthenticated: false }),
            updateUser: (updates) => set((state) => ({
                user: state.user ? { ...state.user, ...updates } : null
            })),
        }),
        { name: "auth-storage" }
    )
);

export function useAuth<T>(selector: (state: AuthState) => T): T {
    return useStore(useAuthStore, selector);
}
