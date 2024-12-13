import { Todo } from '@/types';
import { create } from 'zustand';

interface TodosContextState {
	initialTodos: Todo[];
	setTodos: (todos: Todo[]) => void;
	addTodo: (newTodo: Todo) => void;
	deleteTodo: (todoId: number) => void;
	updateCompletion: (todoId: number) => void;
}

const useTodosStore = create<TodosContextState>()((set: any) => ({
	initialTodos: [],
	setTodos: (todos: Todo[]) => set({ initialTodos: todos }),
	addTodo: (newTodo: Todo) =>
		set((state: TodosContextState) => ({
			initialTodos: [...state.initialTodos, newTodo],
		})),
	deleteTodo: (todoId: number) =>
		set((state: TodosContextState) => ({
			initialTodos: state.initialTodos.filter(todo => todo.id !== todoId),
		})),
	updateCompletion: (todoId: number) =>
		set((state: TodosContextState) => ({
			initialTodos: state.initialTodos.map(todo =>
				todo.id === todoId ? { ...todo, is_completed: !todo.is_completed } : todo
			),
		})),
}));

export default useTodosStore;
