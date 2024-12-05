import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/functions/cn";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: {
		template: "%s | React games",
		default: "React games",
	},
	description: "Uma coleção de jogos em react.",
};

interface IRootLayout {
	children: ReactNode;
}

export default function RootLayout({ children }: Readonly<IRootLayout>) {
	return (
		<html
			lang="pt-BR"
			className={cn(
				"scroll-smooth antialiased font-sans dark",
				"scrollbar-thin scrollbar-track-muted scrollbar-thumb-primary scrollbar-thumb-rounded-full",
				inter.variable,
			)}
		>
			<body className="min-h-screen bg-background text-foreground">
				<ThemeProvider>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
