import { useState, useEffect } from "react";
import { View, Text, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User as UserIcon, Mail, LogOut, Save, Lock } from "lucide-react-native";
import { styled } from "nativewind";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ProfilePage() {
    const { user, signOut } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [updatingPassword, setUpdatingPassword] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .maybeSingle();

            if (error) {
                Alert.alert("Error", "Failed to load profile");
            } else if (data) {
                setProfile(data);
                setUsername(data.username);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!user || !username.trim()) return;

        setSaving(true);
        const { error } = await supabase
            .from("profiles")
            .update({ username: username.trim() })
            .eq("id", user.id);

        if (error) {
            Alert.alert("Error", "Failed to update profile");
        } else {
            Alert.alert("Success", "Profile updated");
        }
        setSaving(false);
    };

    const handleUpdatePassword = async () => {
        if (!newPassword.trim()) {
            Alert.alert("Error", "Password cannot be empty");
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert("Error", "Password should be at least 6 characters");
            return;
        }

        setUpdatingPassword(true);
        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "Password updated successfully");
            setNewPassword("");
        }
        setUpdatingPassword(false);
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-6">
                <View className="items-center mb-8">
                    <View className="h-24 w-24 bg-indigo-600 rounded-full items-center justify-center mb-4 shadow-lg shadow-indigo-200">
                        <UserIcon size={40} color="white" />
                    </View>
                </View>

                <View className="space-y-6">
                    {/* Profile Info Section */}
                    <View className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <StyledText className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Profile Information</StyledText>

                        <View className="mb-4">
                            <StyledText className="text-sm font-medium text-gray-700 mb-2">Username</StyledText>
                            <View className="relative justify-center">
                                <UserIcon style={{ position: 'absolute', left: 12, zIndex: 10 }} size={16} color="#6b7280" />
                                <Input
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder="Your username"
                                    className="pl-10 bg-white"
                                    editable={!saving}
                                />
                            </View>
                        </View>

                        <View className="mb-4">
                            <StyledText className="text-sm font-medium text-gray-700 mb-2">Email</StyledText>
                            <View className="relative justify-center">
                                <Mail style={{ position: 'absolute', left: 12, zIndex: 10 }} size={16} color="#9ca3af" />
                                <Input
                                    value={profile?.email ?? user?.email ?? ""}
                                    editable={false}
                                    className="bg-gray-100 pl-10 text-gray-500 border-gray-200"
                                />
                            </View>
                        </View>

                        <Button
                            onPress={handleUpdateProfile}
                            disabled={saving || !username.trim() || username === profile?.username}
                            isLoading={saving}
                            className="bg-indigo-600 mt-2"
                        >
                            Save Profile Changes
                        </Button>
                    </View>

                    {/* Password Section */}
                    <View className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <StyledText className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Security</StyledText>

                        <View className="mb-4">
                            <StyledText className="text-sm font-medium text-gray-700 mb-2">New Password</StyledText>
                            <View className="relative justify-center">
                                <Lock style={{ position: 'absolute', left: 12, zIndex: 10 }} size={16} color="#6b7280" />
                                <Input
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    placeholder="Enter new password"
                                    secureTextEntry
                                    className="pl-10 bg-white"
                                    editable={!updatingPassword}
                                />
                            </View>
                            <StyledText className="text-xs text-gray-400 mt-1">Minimum 6 characters</StyledText>
                        </View>

                        <Button
                            onPress={handleUpdatePassword}
                            disabled={updatingPassword || !newPassword}
                            isLoading={updatingPassword}
                            variant="outline"
                            className="border-gray-300"
                        >
                            Update Password
                        </Button>
                    </View>

                    <View className="my-2" />

                    <Button
                        variant="outline"
                        onPress={() => signOut()}
                        className="border-red-100 bg-red-50"
                    >
                        <StyledText className="text-red-600 mr-2 font-semibold">Sign Out</StyledText>
                        <LogOut size={16} color="#dc2626" />
                    </Button>
                </View>

                <StyledText className="text-center text-gray-400 mt-8 text-xs pb-10">
                    Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "—"}
                </StyledText>
            </View>
        </ScrollView>
    );
}
