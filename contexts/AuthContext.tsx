"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase, UserProfile, UserRole } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    isLoading: boolean;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
    updatePassword: (newPassword: string) => Promise<{ error: AuthError | null }>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Fetch user profile from database
    const fetchProfile = async (userId: string) => {
        try {
            console.log("🔍 fetchProfile: Starting query for userId:", userId);

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            console.log("🔍 fetchProfile: Query completed", {
                hasData: !!data,
                hasError: !!error,
                errorCode: error?.code,
                errorMessage: error?.message
            });

            if (error) {
                console.error("❌ Error fetching profile:", error);
                console.error("User ID:", userId);
                console.error("Error details:", JSON.stringify(error, null, 2));
                return null;
            }

            console.log("✅ fetchProfile: Success", data);
            return data as UserProfile;
        } catch (error) {
            console.error("❌ Exception fetching profile:", error);
            return null;
        }
    };

    // Refresh profile data
    const refreshProfile = async () => {
        if (user) {
            const profileData = await fetchProfile(user.id);
            setProfile(profileData);
        }
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                const profileData = await fetchProfile(session.user.id);
                setProfile(profileData);
            }

            setIsLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("🔔 Auth state changed:", event, session?.user?.email);

            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                console.log("📋 Fetching profile for:", session.user.id);
                const profileData = await fetchProfile(session.user.id);
                console.log("📋 Profile fetched:", {
                    found: !!profileData,
                    role: profileData?.role,
                    email: profileData?.email
                });

                setProfile(profileData);

                // Handle navigation after successful sign in
                if (event === 'SIGNED_IN') {
                    console.log("🔍 Checking if should navigate:", {
                        event: event,
                        hasProfile: !!profileData,
                        role: profileData?.role,
                        isAdmin: profileData?.role === 'admin'
                    });

                    if (profileData?.role === 'admin') {
                        console.log("✅ Navigating to dashboard...");
                        router.replace('/admin/dashboard');
                    } else {
                        console.log("❌ Not admin, role:", profileData?.role);
                    }
                }
            } else {
                setProfile(null);
            }

            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [router, supabase]);

    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        try {
            const { error, data } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error("SignIn error:", error);
                return { error };
            }

            // Verify profile exists
            if (data.user) {
                const profileData = await fetchProfile(data.user.id);

                if (!profileData) {
                    console.error("Profile not found for user:", data.user.id);
                    await supabase.auth.signOut();
                    return {
                        error: {
                            message: "Profile not found. Please contact support.",
                            name: "ProfileNotFound",
                            status: 404
                        } as any
                    };
                }

                setProfile(profileData);
            }

            // Navigation will happen automatically via onAuthStateChange
            return { error: null };
        } catch (err) {
            console.error("SignIn exception:", err);
            return {
                error: {
                    message: "Failed to sign in. Please try again.",
                    name: "SignInError",
                    status: 500
                } as any
            };
        }
    };

    // Sign up with email and password
    const signUp = async (email: string, password: string, fullName: string) => {
        const { error, data } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        // Create profile entry
        if (!error && data.user) {
            await supabase.from("profiles").insert({
                id: data.user.id,
                email: email,
                full_name: fullName,
                role: "user" as UserRole,
                is_active: true,
            });
        }

        return { error };
    };

    // Sign out
    const signOut = async () => {
        await supabase.auth.signOut();
        setProfile(null);
        router.push("/auth/login");
    };

    // Reset password (sends email)
    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        return { error };
    };

    // Update password
    const updatePassword = async (newPassword: string) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        return { error };
    };

    const isAdmin = profile?.role === "admin";

    const value = {
        user,
        session,
        profile,
        isLoading,
        isAdmin,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
