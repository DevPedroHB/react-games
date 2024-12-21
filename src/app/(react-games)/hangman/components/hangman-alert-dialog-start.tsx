"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { HangmanThemes, hangmanGame } from "@/stores/hangman-game";
import { GameStatus } from "@/types/game-types";
import { Smile } from "lucide-react";
import Link from "next/link";

export function HangmanAlertDialogStart() {
	const { status, theme, changeTheme, startGame } = hangmanGame();

	return (
		<AlertDialog open={status === GameStatus.IDLE}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<Smile className="size-6 text-primary" />
						Escolha um tema
					</AlertDialogTitle>
					<AlertDialogDescription>
						Escolha um tema para você adivinhar.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Select value={theme} onValueChange={changeTheme}>
					<SelectTrigger>
						<SelectValue placeholder="Selecione um tema" />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(HangmanThemes).map(([key, value]) => (
							<SelectItem key={key} value={key}>
								{key}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Link href="/">Voltar ao menu</Link>
					</AlertDialogCancel>
					<AlertDialogAction onClick={startGame}>Jogar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
