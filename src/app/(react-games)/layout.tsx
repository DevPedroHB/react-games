import type { ReactNode } from "react";

interface IReactGamesLayout {
	children: ReactNode;
}

export default function ReactGamesLayout({
	children,
}: Readonly<IReactGamesLayout>) {
	return <>{children}</>;
}
