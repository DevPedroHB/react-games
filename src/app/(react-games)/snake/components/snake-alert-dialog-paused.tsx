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
import { PauseCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

export function SnakeAlertDialogPaused() {
	const { pauseGame, resumeGame, status } = snakeGame();
	const router = useRouter();

	function handleResumeGame() {
		status === GameStatus.PAUSED ? resumeGame() : pauseGame();
	}

	useHotkeys("p", handleResumeGame, {
		enabled: status === GameStatus.PLAYING || status === GameStatus.PAUSED,
	});

	useHotkeys(
		"m",
		() => {
			router.push("/");
		},
		{
			enabled: status !== GameStatus.PLAYING,
		},
	);

	return (
		<AlertDialog open={status === GameStatus.PAUSED}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<PauseCircle
							className="size-6 text-yellow-500"
							aria-hidden="true"
						/>
						Jogo Pausado
					</AlertDialogTitle>
					<AlertDialogDescription>
						Você pausou o jogo. Aproveite para respirar um pouco e continuar
						quando estiver pronto. Deseja retomar ou voltar ao menu principal?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Link href="/">Voltar ao menu</Link>
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleResumeGame}>
						Retomar jogo
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
