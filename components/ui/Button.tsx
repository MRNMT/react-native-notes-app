import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from "react-native";
import { styled } from "nativewind";
import { cn } from "@/lib/utils";

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ButtonProps extends TouchableOpacityProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    isLoading?: boolean;
}

export function Button({
    className,
    variant = "default",
    size = "default",
    isLoading,
    children,
    ...props
}: ButtonProps) {
    const baseStyles = "flex-row items-center justify-center rounded-lg font-medium disabled:opacity-50";

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };

    const textStyles = {
        default: "text-white",
        outline: "text-black",
        ghost: "text-black",
        link: "text-blue-600",
        destructive: "text-white",
        secondary: "text-black",
    };

    const safeVariants = {
        default: "bg-black",
        destructive: "bg-red-500",
        outline: "border border-gray-200 bg-white",
        secondary: "bg-gray-100",
        ghost: "",
        link: "",
    };

    const currentVariantStyle = safeVariants[variant] || safeVariants.default;
    const currentSizeStyle = sizes[size] || sizes.default;

    // Determine activity indicator color to contrast with button text
    const spinnerColor = (variant === "outline" || variant === "ghost" || variant === "link") ? "black" : "white";

    return (
        <StyledTouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.85}
            className={cn(baseStyles, currentVariantStyle, currentSizeStyle, className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <ActivityIndicator size="small" color={spinnerColor} className="mr-2" />}
            <StyledText className={cn(textStyles[variant] || "text-white", "font-medium")}>{children}</StyledText>
        </StyledTouchableOpacity>
    );
}
