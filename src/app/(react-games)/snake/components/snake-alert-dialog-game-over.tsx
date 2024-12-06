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
import { snakeGame } from "@/stores/snake-game";
import { GameStatus } from "@/types/game-types";
import { Frown } from "lucide-react";
import Link from "next/link";

export function SnakeAlertDialogGameOver() {
	const { resetGame, settings, status, score } = snakeGame();

	function handleResetGame() {
		resetGame({
			size: settings.size,
			difficulty: settings.difficulty,
		});
	}

	return (
		<AlertDialog open={status === GameStatus.GAME_OVER}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<Frown className="size-6 text-red-500" aria-hidden="true" />
						Game Over!
					</AlertDialogTitle>
					<AlertDialogDescription>
						Que pena! Você perdeu o jogo com um{" "}
						<strong className="font-medium text-red-500">
							tamanho de {score.size}
						</strong>
						, realizando{" "}
						<strong className="font-medium text-red-500">
							{score.movements} movimentos
						</strong>{" "}
						e consumindo{" "}
						<strong className="font-medium text-red-500">
							{score.energy} unidades de energia
						</strong>
						. Não desista! Tente novamente e supere sua última pontuação.
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
