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
import { Smile } from "lucide-react";
import Link from "next/link";

export function HangmanAlertDialogVictory() {
	const { resetGame, status, word, guesses, lives } = hangmanGame();

	function handleResetGame() {
		resetGame();
	}

	return (
		<AlertDialog open={status === GameStatus.VICTORY}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<Smile className="size-6 text-green-500" />
						Parabéns, você venceu!
					</AlertDialogTitle>
					<AlertDialogDescription>
						<p>
							A palavra era:{" "}
							<span className="font-medium text-green-500">{word}</span>.
						</p>
						<p>
							Você acertou com{" "}
							<span className="font-medium text-green-500">
								{guesses.length} palpite(s)
							</span>{" "}
							e tinha{" "}
							<span className="font-medium text-green-500">
								{lives} vida(s)
							</span>{" "}
							restante(s).
						</p>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Link href="/">Voltar ao menu</Link>
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleResetGame}>
						Jogar novamente
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
