import { z } from "zod";
import { GameDifficulty } from "../game-types";

export const snakeSettingsSchema = z.object({
	size: z.coerce
		.number()
		.min(4, { message: "O tamanho mínimo permitido para 'size' é 4." })
		.max(30, { message: "O tamanho máximo permitido para 'size' é 30." }),
	difficulty: z.nativeEnum(GameDifficulty),
});

export type SnakeSettingsSchema = z.infer<typeof snakeSettingsSchema>;
