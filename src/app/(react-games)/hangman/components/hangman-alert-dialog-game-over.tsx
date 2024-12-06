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
import { hangmanGame } from "@/stores/hangman-game";
import { GameStatus } from "@/types/game-types";
import { Frown } from "lucide-react";
import Link from "next/link";

export function HangmanAlertDialogGameOver() {
	const { resetGame, status, word, guesses } = hangmanGame();

	function handleResetGame() {
		resetGame();
	}

	return (
		<AlertDialog open={status === GameStatus.GAME_OVER}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<Frown className="size-6 text-red-500" />
						Que pena, você perdeu!
					</AlertDialogTitle>
					<AlertDialogDescription>
						<p>
							A palavra correta era:{" "}
							<span className="font-medium text-red-500">{word}</span>.
						</p>
						<p>
							Você usou{" "}
							<span className="font-medium text-red-500">
								{guesses.length} palpite(s)
							</span>{" "}
							mas infelizmente não conseguiu adivinhar.
						</p>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Link href="/">Voltar ao menu</Link>
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleResetGame}>
						Tentar novamente
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
