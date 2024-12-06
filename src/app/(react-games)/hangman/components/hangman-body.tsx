"use client";

import { hangmanGame } from "@/stores/hangman-game";

export function HangmanBody() {
	const { lives } = hangmanGame();

	const bodyParts = [
		"head",
		"body",
		"leftArm",
		"rightArm",
		"leftLeg",
		"rightLeg",
	];

	const visibleParts = bodyParts.slice(0, 6 - lives);

	return (
		<div className="max-w-xs flex-1">
			<svg
				width="320"
				height="320"
				viewBox="0 25 250 250"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="stroke-blue-500"
			>
				<title>Boneco</title>
				{/* Forca */}
				<line x1="50" y1="250" x2="150" y2="250" strokeWidth="4" /> {/* Base */}
				<line x1="100" y1="250" x2="100" y2="50" strokeWidth="4" />
				{/* Poste */}
				<line x1="100" y1="50" x2="150" y2="50" strokeWidth="4" />
				{/* Barra Superior */}
				<line x1="150" y1="50" x2="150" y2="80" strokeWidth="4" /> {/* Corda */}
				{/* Cabeça */}
				{visibleParts.includes("head") && (
					<circle cx="150" cy="100" r="20" strokeWidth="4" />
				)}
				{/* Corpo */}
				{visibleParts.includes("body") && (
					<line x1="150" y1="120" x2="150" y2="180" strokeWidth="4" />
				)}
				{/* Braço Esquerdo */}
				{visibleParts.includes("leftArm") && (
					<line x1="150" y1="140" x2="130" y2="160" strokeWidth="4" />
				)}
				{/* Braço Direito */}
				{visibleParts.includes("rightArm") && (
					<line x1="150" y1="140" x2="170" y2="160" strokeWidth="4" />
				)}
				{/* Perna Esquerda */}
				{visibleParts.includes("leftLeg") && (
					<line x1="150" y1="180" x2="130" y2="210" strokeWidth="4" />
				)}
				{/* Perna Direita */}
				{visibleParts.includes("rightLeg") && (
					<line x1="150" y1="180" x2="170" y2="210" strokeWidth="4" />
				)}
			</svg>
		</div>
	);
}
