import { writable } from "svelte/store";

export const data = writable([
		{
			id: "c1",
			name: "TODO",
			items: [
				{id: 1, name: "item41", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: ["tag1", "tag2"], endDate: "4 Oct 2024"},
				{id: 2, name: "item42", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: ["tag1", "tag2"], endDate: "4 Oct 2024"},
				{id: 3, name: "item43", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: ["tag1", "tag2"], endDate: "4 Oct 2024"},
				{id: 4, name: "item44", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: ["tag1", "tag2"], endDate: "4 Oct 2024"},
				{id: 5, name: "item45", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: [], endDate: "4 Oct 2024"},
				{id: 6, name: "item46", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: [], endDate: "4 Oct 2024"},
				{id: 7, name: "item47", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: [], endDate: "4 Oct 2024"},
				{id: 8, name: "item48", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: [], endDate: "4 Oct 2024"},
				{id: 9, name: "item49", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: [], endDate: "4 Oct 2024"}
			]
		},
		{
			id: "c2",
			name: "DOING",
			items: [
				{id: 10, name: "item50", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: ["tag1", "tag2"], endDate: "4 Oct 2024"},
				{id: 11, name: "item51", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: ["tag1", "tag2"], endDate: "4 Oct 2024"},
			]
		},
		{
			id: "c3",
			name: "DONE",
			items: [
				{id: 13, name: "item52", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: [], endDate: "4 Oct 2024"},
				{id: 14, name: "item53", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: ["tag1", "tag2"], endDate: "4 Oct 2024"}
			]
		},
		{
			id: "c4",
			name: "APPROVED",
			items: [
				{id: 15, name: "item54", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: [], endDate: "4 Oct 2024"},
				{id: 16, name: "item55", description: "Lorem ipsum dolor at met sit", projectName: "Proyecto 1", tags: ["tag1", "tag2"], endDate: "4 Oct 2024"}
			]
		}
	]
);