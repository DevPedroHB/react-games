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
import { Smile } from "lucide-react";
import Link from "next/link";

export function SnakeAlertDialogVictory() {
	const { resetGame, settings, status, score } = snakeGame();

	function handleResetGame() {
		resetGame({
			size: settings.size,
			difficulty: settings.difficulty,
		});
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
						Você completou o jogo com um{" "}
						<strong className="font-medium text-green-500">
							tamanho de {score.size}
						</strong>
						, utilizando{" "}
						<strong className="font-medium text-green-500">
							{score.movements} movimentos
						</strong>{" "}
						e consumindo{" "}
						<strong className="font-medium text-green-500">
							{score.energy} unidades de energia
						</strong>
						. Deseja jogar novamente?
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
