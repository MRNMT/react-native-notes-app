import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, Lock, User, BookOpen } from "lucide-react-native";
import { z } from "zod";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
    username: z.string().min(2, "Username must be at least 2 characters").max(50),
});

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { signIn, signUp } = useAuth();
    const router = useRouter();

    const validateForm = () => {
        try {
            if (isLogin) {
                loginSchema.parse({ email, password });
            } else {
                signupSchema.parse({ email, password, username });
            }
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                err.errors.forEach((e) => {
                    if (e.path[0]) {
                        newErrors[e.path[0] as string] = e.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await signIn(email, password);
                if (error) {
                    Alert.alert("Login failed", error.message === "Invalid login credentials" ? "Invalid email or password" : error.message);
                } else {
                    // Toast usually here
                    router.replace('/(main)');
                }
            } else {
                const { error } = await signUp(email, password, username);
                if (error) {
                    Alert.alert("Signup failed", error.message.includes("already registered") ? "This email is already registered" : error.message);
                } else {
                    Alert.alert("Account created!", "Welcome to Notes.");
                    router.replace('/(main)');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledView className="w-full max-w-sm">
            <StyledView className="mb-8 items-center">
                <StyledView className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg">
                    <BookOpen color="white" size={32} />
                </StyledView>
                <StyledText className="text-3xl font-semibold text-gray-900">
                    {isLogin ? "Welcome back" : "Create account"}
                </StyledText>
                <StyledText className="mt-2 text-gray-500">
                    {isLogin ? "Sign in to access your notes" : "Start your note-taking journey"}
                </StyledText>
            </StyledView>

            <StyledView className="space-y-4">
                {!isLogin && (
                    <StyledView>
                        <StyledText className="mb-1 text-sm font-medium text-gray-700">Username</StyledText>
                        <StyledView className="relative justify-center">
                            <User style={{ position: 'absolute', left: 12, zIndex: 10 }} size={16} color="gray" />
                            <Input
                                placeholder="Your name"
                                value={username}
                                onChangeText={setUsername}
                                className="pl-10"
                                editable={!loading}
                            />
                        </StyledView>
                        {errors.username && (
                            <StyledText className="text-sm text-red-500 mt-1">{errors.username}</StyledText>
                        )}
                    </StyledView>
                )}

                <StyledView>
                    <StyledText className="mb-1 text-sm font-medium text-gray-700">Email</StyledText>
                    <StyledView className="relative justify-center">
                        <Mail style={{ position: 'absolute', left: 12, zIndex: 10 }} size={16} color="gray" />
                        <Input
                            placeholder="you@example.com"
                            value={email}
                            onChangeText={setEmail}
                            className="pl-10"
                            editable={!loading}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </StyledView>
                    {errors.email && (
                        <StyledText className="text-sm text-red-500 mt-1">{errors.email}</StyledText>
                    )}
                </StyledView>

                <StyledView>
                    <StyledText className="mb-1 text-sm font-medium text-gray-700">Password</StyledText>
                    <StyledView className="relative justify-center">
                        <Lock style={{ position: 'absolute', left: 12, zIndex: 10 }} size={16} color="gray" />
                        <Input
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            className="pl-10"
                            editable={!loading}
                            secureTextEntry
                        />
                    </StyledView>
                    {errors.password && (
                        <StyledText className="text-sm text-red-500 mt-1">{errors.password}</StyledText>
                    )}
                </StyledView>

                <Button
                    onPress={handleSubmit}
                    className="w-full mt-4 bg-indigo-600"
                    size="lg"
                    isLoading={loading}
                >
                    {isLogin ? "Sign in" : "Create account"}
                </Button>
            </StyledView>

            <StyledView className="mt-6 items-center">
                <TouchableOpacity
                    onPress={() => {
                        setIsLogin(!isLogin);
                        setErrors({});
                    }}
                    disabled={loading}
                >
                    <StyledText className="text-sm text-gray-500">
                        {isLogin
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                    </StyledText>
                </TouchableOpacity>
            </StyledView>
        </StyledView>
    );
}
