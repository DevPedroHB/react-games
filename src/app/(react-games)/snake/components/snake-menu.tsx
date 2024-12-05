"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { snakeGame } from "@/stores/snake-game";
import { GameDifficulty, GameStatus } from "@/types/game-types";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { SnakeSettingsDialog } from "./snake-settings-dialog";

export function SnakeMenu() {
	const { settings, status, startGame, pauseGame, resumeGame, resetGame } =
		snakeGame();

	function handleResetGame() {
		resetGame({
			size: settings.size,
			difficulty: GameDifficulty.MEDIUM,
		});
	}

	useHotkeys("space", startGame, {
		enabled: status === GameStatus.IDLE,
	});

	useHotkeys(
		"p",
		() => {
			status === GameStatus.PAUSED ? resumeGame() : pauseGame();
		},
		{
			enabled: status === GameStatus.PLAYING || status === GameStatus.PAUSED,
		},
	);

	useHotkeys("r", handleResetGame, {
		enabled: status !== GameStatus.IDLE,
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
				{status === GameStatus.IDLE ? (
					<SnakeSettingsDialog />
				) : (
					<Button type="button" onClick={handleResetGame} className="flex-1">
						<RotateCcw className="size-4" />
						Reiniciar
					</Button>
				)}
				{status === GameStatus.IDLE && (
					<Button type="button" onClick={startGame} className="flex-1">
						<Play className="size-4" />
						Iniciar
					</Button>
				)}
				{status === GameStatus.PLAYING && (
					<Button type="button" onClick={pauseGame} className="flex-1">
						<Pause className="size-4" />
						Pausar
					</Button>
				)}
				{status === GameStatus.PAUSED && (
					<Button type="button" onClick={resumeGame} className="flex-1">
						<Play className="size-4" />
						Continuar
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
