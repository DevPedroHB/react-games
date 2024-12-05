export enum GameStatus {
	IDLE = "IDLE", // O jogo está ocioso, aguardando início ou interação do jogador.
	PLAYING = "PLAYING", // O jogo está ativo e em andamento.
	PAUSED = "PAUSED", // O jogo foi pausado, geralmente por ação do jogador.
	VICTORY = "VICTORY", // O jogador venceu o jogo ou completou os objetivos.
	GAME_OVER = "GAME_OVER", // O jogador perdeu ou o jogo terminou de outra forma.
}

export enum GameDifficulty {
	EASY = "EASY", // Configuração mais acessível, voltada para iniciantes.
	MEDIUM = "MEDIUM", // Um desafio equilibrado para jogadores intermediários.
	HARD = "HARD", // Dificuldade alta, destinada a jogadores experientes.
}

export interface GameCoord {
	x: number; // Coordenada no eixo X (horizontal).
	y: number; // Coordenada no eixo Y (vertical).
	z: number; // Coordenada no eixo Z (profundidade).
}

export const GameDirection: Record<string, GameCoord> = {
	UP: { x: 0, y: 1, z: 0 }, // Movimenta para cima no eixo Y.
	DOWN: { x: 0, y: -1, z: 0 }, // Movimenta para baixo no eixo Y.
	LEFT: { x: -1, y: 0, z: 0 }, // Movimenta para a esquerda no eixo X.
	RIGHT: { x: 1, y: 0, z: 0 }, // Movimenta para a direita no eixo X.
	FORWARD: { x: 0, y: 0, z: 1 }, // Movimenta para frente no eixo Z.
	BACKWARD: { x: 0, y: 0, z: -1 }, // Movimenta para trás no eixo Z.
} as const;

export type GameDirectionKey = keyof typeof GameDirection;
