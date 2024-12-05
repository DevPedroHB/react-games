import { SnakeBoard } from "./components/snake-board";
import { SnakeMenu } from "./components/snake-menu";
import { SnakeScore } from "./components/snake-score";

export default function Snake() {
	return (
		<main className="flex min-h-screen flex-wrap gap-4 p-4 justify-center">
			<SnakeScore />
			<SnakeBoard />
			<SnakeMenu />
		</main>
	);
}

// startGame: () => void;
// stopGame: () => void;
// updateDirection: (direction: string) => void;
// updateSettings: (settings: Partial<ISettings>) => void;
// resetGame: () => void;
// addEnergy: () => void;
// addSize: () => void;
// moveSnake: () => void;
// handleKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
// handleResize: () => void;
// generateFood: () => void;
// updateScore: (energy: number, movements: number, size: number) => void;
// getHighScore: () => number;
// setHighScore: (score: number) => void;
// resetHighScore: () => void;
// isHighScore: () => boolean;
// getBestScore: () => number;
// setBestScore: (score: number) => void;
