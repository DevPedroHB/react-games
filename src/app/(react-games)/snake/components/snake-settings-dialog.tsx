"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { snakeGame } from "@/stores/snake-game";
import { GameDifficulty } from "@/types/game-types";
import {
	type SnakeSettingsSchema,
	snakeSettingsSchema,
} from "@/types/schemas/snake-settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToggle } from "@uidotdev/usehooks";
import { Pencil, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SnakeSettingsDialog() {
	const [openModal, setOpenModal] = useToggle(false);
	const { settings, resetGame } = snakeGame();

	const form = useForm<SnakeSettingsSchema>({
		resolver: zodResolver(snakeSettingsSchema),
		defaultValues: {
			size: settings.size,
			difficulty: GameDifficulty.MEDIUM,
		},
	});

	function handleSaveSettings(data: SnakeSettingsSchema) {
		resetGame(data);

		setOpenModal(false);

		toast.success("Configurações salvas com sucesso!");
	}

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogTrigger asChild>
				<Button type="button" className="flex-1">
					<Pencil className="size-4" />
					Editar
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-xs">
				<DialogHeader>
					<DialogTitle>Editar configurações</DialogTitle>
					<DialogDescription>
						Altere as configurações do jogo da cobrinha.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSaveSettings)}>
						<FormField
							control={form.control}
							name="size"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tamanho</FormLabel>
									<FormControl>
										<Input
											type="number"
											min={4}
											max={40}
											placeholder="Defina uma tamanho"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="difficulty"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Dificuldade</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione uma dificuldade" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(GameDifficulty).map(([key, value]) => (
												<SelectItem key={key} value={value}>
													{value}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="mt-2 w-full">
							<Save className="size-4" />
							Salvar
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
