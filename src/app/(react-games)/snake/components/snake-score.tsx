"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { games } from "@/constants/games";
import { snakeGame } from "@/stores/snake-game";
import { GAME_STATUS } from "@/types/game-types";

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
				<Separator className="my-4" />
				<CardFooter className="flex-col items-start p-0">
					<CardTitle>Resumo das Teclas:</CardTitle>
					<div className="mt-4 flex flex-col gap-2">
						<CardDescription>
							<strong className="font-semibold text-card-foreground">
								W, A, S, D
							</strong>{" "}
							/{" "}
							<strong className="font-semibold text-card-foreground">
								Setas direcionais
							</strong>{" "}
							- Movimentam a cobra.
						</CardDescription>
						<CardDescription>
							<strong className="font-semibold text-card-foreground">E</strong>{" "}
							- Edita as configurações do jogo.
						</CardDescription>
						<CardDescription>
							<strong className="font-semibold text-card-foreground">R</strong>{" "}
							- Reinicia o jogo.
						</CardDescription>
						<CardDescription>
							<strong className="font-semibold text-card-foreground">P</strong>{" "}
							- Pausa ou continua o jogo.
						</CardDescription>
						<CardDescription>
							<strong className="font-semibold text-card-foreground">
								Espaço
							</strong>{" "}
							- Inicia o jogo.
						</CardDescription>
						<CardDescription>
							<strong className="font-semibold text-card-foreground">M</strong>{" "}
							- Volta ao menu.
						</CardDescription>
					</div>
				</CardFooter>
			</CardContent>
		</Card>
	);
}
