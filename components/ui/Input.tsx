import { TextInput, TextInputProps, View } from "react-native";
import { styled } from "nativewind";
import { cn } from "@/lib/utils";
import React from "react";

const StyledTextInput = styled(TextInput);

export const Input = React.forwardRef<TextInput, TextInputProps>(
    ({ className, placeholderTextColor, ...props }, ref) => {
        return (
            <StyledTextInput
                ref={ref}
                className={cn(
                    "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                placeholderTextColor={placeholderTextColor ?? "#6b7280"}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";
