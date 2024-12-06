import { GameStatus } from "@/types/game-types";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const LETTERS = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	"ç",
];

interface IHangmanGame {
	word: string;
	normalizedWord: string;
	showWord: string;
	lives: number;
	guesses: string[];
	status: GameStatus;
}

interface IHangmanGameFunctions {
	startGame: () => void;
	resetGame: () => void;
	guessLetter: (letter: string) => void;
}

export const hangmanGame = create<IHangmanGame & IHangmanGameFunctions>()(
	immer((set) => ({
		...initGame(),
		startGame() {
			set((state) => {
				state.status = GameStatus.PLAYING;
			});
		},
		resetGame() {
			set(() => initGame());
		},
		guessLetter(letter) {
			set((state) => {
				if (state.status !== GameStatus.PLAYING) return;
				if (state.guesses.includes(letter)) return;

				const normalizedLetter = normalizeString(letter);

				state.guesses.push(normalizedLetter);

				if (state.normalizedWord.includes(normalizedLetter)) {
					state.showWord = state.word
						.replace(".", "")
						.split("")
						.map((char) => {
							const normalizedChar = normalizeString(char);
							return state.guesses.includes(normalizedChar) || char === " "
								? char
								: "_";
						})
						.join("");

					if (normalizeString(state.showWord) === state.normalizedWord) {
						state.status = GameStatus.VICTORY;
					}
				} else {
					state.lives -= 1;

					if (state.lives <= 0) {
						state.status = GameStatus.GAME_OVER;
					}
				}
			});
		},
	})),
);

function initGame(): IHangmanGame {
	const word = faker.person.fullName();
	const normalizedWord = normalizeString(word);

	return {
		word,
		normalizedWord,
		showWord: word
			.replace(".", "")
			.split("")
			.map((char) => (char === " " ? " " : "_"))
			.join(""),
		lives: 6,
		guesses: [],
		status: GameStatus.PLAYING,
	};
}

function normalizeString(str: string): string {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-zA-Z\s]/g, "")
		.toLowerCase();
}
