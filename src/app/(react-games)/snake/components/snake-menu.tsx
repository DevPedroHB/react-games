"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { snakeGame } from "@/stores/snake-game";
import { GAME_DIFFICULTY, GameStatus } from "@/types/game-types";
import { useHotkeys } from "react-hotkeys-hook";
import { SnakeSettingsDialog } from "./snake-settings-dialog";

export function SnakeMenu() {
	const { settings, status, startGame, resetGame } = snakeGame();

	function handleResetGame() {
		resetGame({
			size: settings.size,
			difficulty: settings.difficulty,
		});
	}

	useHotkeys("space", startGame, {
		enabled: status === GameStatus.IDLE,
	});

	useHotkeys("r", handleResetGame, {
		enabled: status === GameStatus.VICTORY || status === GameStatus.GAME_OVER,
	});

	return (
		<Card className="h-fit w-full max-w-xs">
			<CardHeader>
				<CardTitle>Configurações</CardTitle>
				<CardDescription>Ajuste as configurações do jogo.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-2">
					<CardTitle>Tamanho:</CardTitle>
					<CardDescription>{settings.size}</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<CardTitle>Dificuldade:</CardTitle>
					<CardDescription>
						{GAME_DIFFICULTY[settings.difficulty]}
					</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<CardTitle>Velocidade:</CardTitle>
					<CardDescription>{settings.speed}ms</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<CardTitle>Energia:</CardTitle>
					<CardDescription>{settings.energy}</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<CardTitle>Buffer:</CardTitle>
					<CardDescription>{settings.buffer}</CardDescription>
				</div>
			</CardContent>
			<CardFooter className="gap-2">
				<SnakeSettingsDialog />
			</CardFooter>
		</Card>
	);
}
