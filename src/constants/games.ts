interface IGame {
	id: string;
	title: string;
	description: string;
}

export const games: IGame[] = [
	{
		id: "snake",
		title: "Jogo da cobrinha",
		description: "Controle a cobrinha e colete frutas para ganhar pontos.",
	},
	{
		id: "hangman",
		title: "Jogo da forca",
		description: "Descubra as palavras antes que o boneco seja enforcado.",
	},
];
