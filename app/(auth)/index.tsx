import { View } from "react-native";
import { AuthForm } from "@/components/auth/AuthForm";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function AuthScreen() {
    return (
        <StyledView className="flex-1 items-center justify-center bg-white p-4">
            <AuthForm />
        </StyledView>
    );
}
