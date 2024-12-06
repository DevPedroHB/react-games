"use client";

import { hangmanGame } from "@/stores/hangman-game";
import { GameStatus } from "@/types/game-types";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

export function HangmanDisplay() {
	const { startGame, status, resetGame, showWord } = hangmanGame();
	const router = useRouter();

	useHotkeys("space", startGame, {
		enabled: status === GameStatus.IDLE,
	});

	useHotkeys("alt+r", resetGame, {
		enabled: status === GameStatus.VICTORY || status === GameStatus.GAME_OVER,
	});

	useHotkeys(
		"alt+m",
		() => {
			router.push("/");
		},
		{
			enabled: status !== GameStatus.PLAYING,
		},
	);

	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-4">
			<h2 className="text-xl">Dica: Nome de uma pessoa</h2>
			<p className="text-4xl tracking-widest">{showWord}</p>
		</div>
	);
}
