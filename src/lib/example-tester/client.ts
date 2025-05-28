import { atom } from "nanostores";
import type { exampleTester } from ".";
import type { BetterFeatureClientPlugin } from "@allenthich/better-feature/client";
import { useAuthQuery } from "@allenthich/better-feature/client";
import type { ExampleTester } from "./schema";

export const exampleTesterClient = () => {
	const $listExampleTestersSignal = atom<boolean>(false);
	return {
		id: "example-tester",
		$InferServerPlugin: {} as ReturnType<typeof exampleTester>,
		getAtoms: ($fetch) => {
			const listExampleTesters = useAuthQuery<ExampleTester[]>(
				$listExampleTestersSignal,
				"/exampleTester/list",
				$fetch,
				{
					method: "GET",
				},
			);

			return {
				$listExampleTestersSignal,
				listExampleTesters,
			};
		},
		atomListeners: [
			{
				matcher(path) {
					return path === "/exampleTester/list";
				},
				signal: "$listExampleTestersSignal",
			},
		],
	} satisfies BetterFeatureClientPlugin;
};
