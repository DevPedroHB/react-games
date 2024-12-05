"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { games } from "@/constants/games";
import { snakeGame } from "@/stores/snake-game";
import { GameStatus } from "@/types/game-types";

const GAME_STATUS: Record<GameStatus, string> = {
	[GameStatus.IDLE]: "Aguardando",
	[GameStatus.PLAYING]: "Jogando",
	[GameStatus.PAUSED]: "Pausado",
	[GameStatus.VICTORY]: "Vitória",
	[GameStatus.GAME_OVER]: "Derrota",
};

export function SnakeScore() {
	const gameInfo = games.find((game) => game.id === "snake");

	if (!gameInfo) return;

	const { score, status } = snakeGame();

	return (
		<Card className="h-fit w-full max-w-xs">
			<CardHeader>
				<CardTitle>{gameInfo.title}</CardTitle>
				<CardDescription>{gameInfo.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-2">
					<CardTitle>Tamanho:</CardTitle>
					<CardDescription>{score.size}</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<CardTitle>Movimentos:</CardTitle>
					<CardDescription>{score.movements}</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<CardTitle>Energia:</CardTitle>
					<CardDescription>{score.energy}</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<CardTitle>Status:</CardTitle>
					<CardDescription>{GAME_STATUS[status]}</CardDescription>
				</div>
			</CardContent>
		</Card>
	);
}
