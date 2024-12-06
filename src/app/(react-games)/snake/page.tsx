import type { Metadata } from "next";
import { SnakeAlertDialogGameOver } from "./components/snake-alert-dialog-game-over";
import { SnakeAlertDialogPaused } from "./components/snake-alert-dialog-paused";
import { SnakeAlertDialogVictory } from "./components/snake-alert-dialog-victory";
import { SnakeBoard } from "./components/snake-board";
import { SnakeMenu } from "./components/snake-menu";
import { SnakeScore } from "./components/snake-score";

export const metadata: Metadata = {
	title: "Jogo da cobrinha",
};

export default function Snake() {
	return (
		<main className="flex min-h-screen flex-wrap gap-4 p-4 justify-center">
			<SnakeScore />
			<SnakeBoard />
			<SnakeMenu />
			<SnakeAlertDialogVictory />
			<SnakeAlertDialogGameOver />
			<SnakeAlertDialogPaused />
		</main>
	);
}
