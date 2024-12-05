import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { games } from "@/constants/games";
import Link from "next/link";

export default function Home() {
	return (
		<main className="max-w-7xl mx-auto p-6">
			<section className="grid grid-cols-home gap-6">
				{games.map((game) => {
					return (
						<Card key={game.id}>
							<CardHeader>
								<CardTitle>{game.title}</CardTitle>
								<CardDescription>{game.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5">
									<li>Pontuação máxima: 2000</li>
									<li>Partidas jogadas: 15</li>
									<li>Maior sequência: 50 frutas coletadas</li>
								</ul>
							</CardContent>
							<CardFooter>
								<Button asChild>
									<Link href={game.id}>Jogar</Link>
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</section>
		</main>
	);
}
