import {
	type GameCoord,
	GameDifficulty,
	GameDirection,
	GameStatus,
} from "@/types/game-types";
import type { SnakeSettingsSchema } from "@/types/schemas/snake-settings-schema";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const SnakeGameDirection: Record<string, SnakeGameCoord> = {
	ArrowUp: GameDirection.UP,
	ArrowRight: GameDirection.RIGHT,
	ArrowDown: GameDirection.DOWN,
	ArrowLeft: GameDirection.LEFT,
	w: GameDirection.UP,
	d: GameDirection.RIGHT,
	s: GameDirection.DOWN,
	a: GameDirection.LEFT,
} as const;

export type SnakeGameDirectionKeys = keyof typeof SnakeGameDirection;

const SnakeGameDifficulty: Record<GameDifficulty, number> = {
	EASY: 500,
	MEDIUM: 450,
	HARD: 400,
};

interface SnakeGameSettings {
	size: number;
	difficulty: GameDifficulty;
	speed: number;
	energy: number;
	buffer: number;
}

interface SnakeGameScore {
	energy: number;
	movements: number;
	size: number;
}

export type SnakeGameCoord = Omit<GameCoord, "z">;

interface ISnakeGame {
	settings: SnakeGameSettings;
	score: SnakeGameScore;
	snake: SnakeGameCoord[];
	food: SnakeGameCoord;
	direction: SnakeGameCoord[];
	status: GameStatus;
}

interface ISnakeGameFunctions {
	startGame: () => void;
	pauseGame: () => void;
	resumeGame: () => void;
	resetGame: (settings: SnakeSettingsSchema) => void;
	updateDirection: (key: SnakeGameDirectionKeys) => void;
	moveSnake: () => void;
}

export const snakeGame = create<ISnakeGame & ISnakeGameFunctions>()(
	immer((set) => ({
		...initGame(20, GameDifficulty.MEDIUM),
		startGame() {
			set((state) => {
				state.status = GameStatus.PLAYING;
			});
		},
		pauseGame() {
			set((state) => {
				state.status = GameStatus.PAUSED;
			});
		},
		resumeGame() {
			set((state) => {
				state.status = GameStatus.PLAYING;
			});
		},
		resetGame({ size, difficulty }) {
			set(() => initGame(size, difficulty));
		},
		updateDirection(key) {
			set((state) => {
				const newDirection = SnakeGameDirection[key];
				const lastDirection = state.direction[state.direction.length - 1];

				if (!newDirection) return;

				if (isOppositeDirection(newDirection, lastDirection)) return;

				if (state.direction.length < state.settings.buffer) {
					state.direction.push(newDirection);
				}
			});
		},
		moveSnake() {
			set((state) => {
				if (state.direction.length > 1) {
					state.direction.shift();
				}

				const newHead = {
					x: state.snake[0].x + state.direction[0].x,
					y: state.snake[0].y - state.direction[0].y,
				};
				const isOutOfBounds =
					newHead.x < 0 ||
					newHead.x >= state.settings.size ||
					newHead.y < 0 ||
					newHead.y >= state.settings.size;
				const isSnakeBody = state.snake.some(
					(segment) => segment.x === newHead.x && segment.y === newHead.y,
				);

				if (isOutOfBounds || isSnakeBody) {
					state.status = GameStatus.GAME_OVER;
					return;
				}

				const newSnake = [newHead, ...state.snake];
				const ateFood =
					newHead.x === state.food.x && newHead.y === state.food.y;

				if (ateFood) {
					const maxSpeed = calculateSpeed(
						state.settings.size,
						state.settings.difficulty,
					);
					const minSpeed = maxSpeed - 50;
					const progress = newSnake.length / state.settings.energy;
					const dynamicSpeed = maxSpeed - progress * (maxSpeed - minSpeed);

					if (newSnake.length < state.settings.energy) {
						state.food = generateRandomPosition(state.settings.size, newSnake);
					}

					state.score.size++;
					state.score.energy = state.settings.energy + 1;
					state.settings.speed = dynamicSpeed;
				} else {
					newSnake.pop();
				}

				state.snake = newSnake;
				state.score.energy--;
				state.score.movements++;

				if (newSnake.length === state.settings.energy) {
					state.status = GameStatus.VICTORY;
					return;
				}

				if (state.score.energy <= 0) {
					state.status = GameStatus.GAME_OVER;
					return;
				}
			});
		},
	})),
);

function initGame(size: number, difficulty: GameDifficulty): ISnakeGame {
	const settings: SnakeGameSettings = {
		size,
		difficulty,
		speed: calculateSpeed(size, difficulty),
		energy: calculateEnergy(size),
		buffer: 3,
	};
	const score: SnakeGameScore = {
		energy: settings.energy,
		movements: 0,
		size: 1,
	};
	const snake = [{ x: 0, y: 0 }];

	return {
		snake,
		food: generateRandomPosition(size, snake),
		direction: [GameDirection.RIGHT],
		status: GameStatus.IDLE,
		settings,
		score,
	};
}

function generateRandomPosition(size: number, snake: SnakeGameCoord[]) {
	let position: SnakeGameCoord;
	let isOccupied: boolean;

	do {
		position = {
			x: Math.floor(Math.random() * size),
			y: Math.floor(Math.random() * size),
		};
		isOccupied = snake.some(
			(segment) => segment.x === position.x && segment.y === position.y,
		);
	} while (isOccupied);

	return position;
}

function calculateSpeed(size: number, difficulty: GameDifficulty) {
	return SnakeGameDifficulty[difficulty] - size * 10;
}

function calculateEnergy(size: number) {
	return size ** 2;
}

function isOppositeDirection(
	newDirection: SnakeGameCoord,
	currentDirection: SnakeGameCoord,
) {
	return (
		newDirection.x === -currentDirection.x ||
		newDirection.y === -currentDirection.y
	);
}
