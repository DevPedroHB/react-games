import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { games } from "@/constants/games";
import type { Metadata } from "next";
import { HangmanAlertDialogGameOver } from "./components/hangman-alert-dialog-game-over";
import { HangmanAlertDialogVictory } from "./components/hangman-alert-dialog-victory";
import { HangmanBody } from "./components/hangman-body";
import { HangmanDisplay } from "./components/hangman-display";
import { HangmanKeyboard } from "./components/hangman-keyboard";

export const metadata: Metadata = {
	title: "Jogo da forca",
};

export default function Hangman() {
	const gameInfo = games.find((game) => game.id === "hangman");

	if (!gameInfo) return;

	return (
		<main className="mx-auto max-w-7xl p-4">
			<Card>
				<CardHeader>
					<CardTitle>{gameInfo.title}</CardTitle>
					<CardDescription>{gameInfo.description}</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-4">
					<HangmanBody />
					<HangmanDisplay />
				</CardContent>
				<HangmanKeyboard />
			</Card>
			<HangmanAlertDialogVictory />
			<HangmanAlertDialogGameOver />
		</main>
	);
}
