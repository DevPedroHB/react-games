"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/functions/cn";
import {
	type SnakeGameCoord,
	type SnakeGameDirectionKeys,
	snakeGame,
} from "@/stores/snake-game";
import { GameStatus } from "@/types/game-types";
import chroma from "chroma-js";
import { useEffect, useMemo } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function SnakeBoard() {
	const { settings, status, updateDirection, moveSnake, snake, food } =
		snakeGame();

	function positionToIndex({ x, y }: SnakeGameCoord) {
		return y * settings.size + x;
	}

	const snakeColors = useMemo(() => {
		return chroma
			.scale(["#3b82f6", "#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#22c55e"])
			.mode("lab")
			.colors(snake.length || 1);
	}, [snake.length]);

	useHotkeys(
		["ArrowUp", "w", "ArrowRight", "d", "ArrowDown", "s", "ArrowLeft", "a"],
		({ key }) => {
			updateDirection(key as SnakeGameDirectionKeys);
		},
		{
			enabled: status === GameStatus.PLAYING,
		},
	);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (status === GameStatus.PLAYING) {
			interval = setInterval(() => {
				moveSnake();
			}, settings.speed);
		}

		return () => clearInterval(interval);
	}, [status, moveSnake, settings]);

	return (
		<Card
			className="grid aspect-square h-[calc(100vh-2rem)] overflow-hidden transition-all"
			style={{
				gridTemplateColumns: `repeat(${settings.size}, 1fr)`,
				gridTemplateRows: `repeat(${settings.size}, 1fr)`,
			}}
		>
			{Array.from({ length: settings.size * settings.size }).map((_, index) => {
				const isSnakeSegment = snake.findIndex(
					(segment) => index === positionToIndex(segment),
				);

				return (
					<div
						key={index}
						data-food={index === positionToIndex(food)}
						className={cn(
							"bg-card transition-all",
							"data-[food=true]:bg-red-500",
						)}
						style={{
							backgroundColor:
								isSnakeSegment !== -1 ? snakeColors[isSnakeSegment] : undefined,
						}}
					/>
				);
			})}
		</Card>
	);
}
