export interface List {
    id: number;
    name: string;
    items: number;
}

export interface Task {
    id: number;
    listId: number;
    name: string;
    completed: boolean;
    createdAt: string;
    completedAt: string;
}
