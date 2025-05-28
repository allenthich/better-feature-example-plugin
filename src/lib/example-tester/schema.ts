import { z } from "zod";
import type { AuthPluginSchema } from "@allenthich/better-feature/types";

export const exampleTesterSchema = {
	exampleTester: {
		fields: {
			name: {
				type: "string",
				required: false,
				sortable: true,
				unique: true,
				returned: true,
				transform: {
					input(value) {
						return value?.toString().toLowerCase();
					},
				},
			},
			displayName: {
				type: "string",
				required: false,
			},
		},
		modelName: "exampleTester",
	},
} satisfies AuthPluginSchema;

export const exampleTesterZodSchema = z.object({
	exampleTester: z.object({
		fields: z.object({
			name: z
				.string()
				.optional()
				.transform((value) => value?.toLowerCase()),
			displayName: z.string().optional(),
		}),
	}),
});

export type ExampleTester = z.infer<typeof exampleTesterZodSchema>;
