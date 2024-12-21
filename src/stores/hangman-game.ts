import { GameStatus } from "@/types/game-types";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const HangmanThemes = {
	Pessoas: () => faker.person.fullName(),
	Animais: () => faker.animal.cat(),
	Comidas: () => faker.food.dish(),
	Cidades: () => faker.location.city(),
};

interface IHangmanGame {
	theme: keyof typeof HangmanThemes;
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
	changeTheme: (theme: keyof typeof HangmanThemes) => void;
	guessLetter: (letter: string) => void;
}

export const hangmanGame = create<IHangmanGame & IHangmanGameFunctions>()(
	immer((set) => ({
		...initGame("Pessoas"),
		startGame() {
			set((state) => {
				state.status = GameStatus.PLAYING;
			});
		},
		resetGame() {
			set(() => initGame("Pessoas"));
		},
		changeTheme(theme) {
			set((state) => {
				const word = HangmanThemes[theme]();

				state.theme = theme;
				state.word = word;
				state.normalizedWord = normalizeString(word);
				state.showWord = showWord(word);
			});
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

function initGame(theme: keyof typeof HangmanThemes): IHangmanGame {
	const word = HangmanThemes[theme]();
	const normalizedWord = normalizeString(word);

	return {
		theme,
		word,
		normalizedWord,
		showWord: showWord(word),
		lives: 6,
		guesses: [],
		status: GameStatus.IDLE,
	};
}

function normalizeString(str: string): string {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-zA-Z\s]/g, "")
		.toLowerCase();
}

function showWord(word: string) {
	return word
		.replace(".", "")
		.split("")
		.map((char) => (char === " " ? " " : "_"))
		.join("");
}
