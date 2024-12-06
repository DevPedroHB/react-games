"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { LETTERS, hangmanGame } from "@/stores/hangman-game";
import { GameStatus } from "@/types/game-types";
import { useHotkeys } from "react-hotkeys-hook";

export function HangmanKeyboard() {
	const { guesses, guessLetter, status } = hangmanGame();

	useHotkeys(
		LETTERS,
		({ key }) => {
			guessLetter(key);
		},
		{
			enabled: status === GameStatus.PLAYING,
		},
	);

	return (
		<CardFooter className="mx-auto max-w-lg flex-wrap items-center justify-center gap-2">
			{LETTERS.map((letter) => {
				const isGuessed = guesses.includes(letter);

				return (
					<Button
						key={letter}
						type="button"
						variant={isGuessed ? "outline" : "default"}
						size="icon"
						disabled={isGuessed}
						onClick={() => !isGuessed && guessLetter(letter)}
						className="uppercase"
					>
						{letter}
					</Button>
				);
			})}
		</CardFooter>
	);
}
