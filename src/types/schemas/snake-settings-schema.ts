import { z } from "zod";
import { GameDifficulty } from "../game-types";

export const snakeSettingsSchema = z.object({
	size: z.coerce
		.number()
		.min(2, { message: "O tamanho mínimo permitido para 'size' é 2." })
		.max(40, { message: "O tamanho máximo permitido para 'size' é 40." }),
	difficulty: z.nativeEnum(GameDifficulty),
});

export type SnakeSettingsSchema = z.infer<typeof snakeSettingsSchema>;
