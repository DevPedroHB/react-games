interface ITheme {
	id: string;
	label: string;
}

export const themes: ITheme[] = [
	{
		id: "light",
		label: "Claro",
	},
	{
		id: "dark",
		label: "Escuro",
	},
	{
		id: "system",
		label: "Sistema",
	},
];
