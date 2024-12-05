"use client";

import { THEME_KEY } from "@/constants/keys";
import {
	ThemeProvider as NextThemeProvider,
	type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...rest }: ThemeProviderProps) {
	return (
		<NextThemeProvider
			attribute="class"
			defaultTheme="system"
			storageKey={THEME_KEY}
			enableSystem
			{...rest}
		>
			{children}
		</NextThemeProvider>
	);
}
