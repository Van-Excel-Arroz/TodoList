import { Category, Todo } from '@/types';
import { create } from 'zustand';

interface TodosContextState {
	initialTodos: Todo[];
	setTodos: (todos: Todo[]) => void;
	addTodo: (newTodo: Todo) => void;
	addCategory: (todoId: number, newCategory: Category) => void;
	deleteTodo: (todoId: number) => void;
	updateTodoCompletion: (todoId: number) => void;
	updateTodoTitle: (todoId: number, newTitle: string) => void;
}

const useTodosStore = create<TodosContextState>()((set: any) => ({
	initialTodos: [],
	setTodos: (todos: Todo[]) => set({ initialTodos: todos }),
	addTodo: (newTodo: Todo) =>
		set((state: TodosContextState) => ({
			initialTodos: [...state.initialTodos, newTodo],
		})),
	addCategory: (todoId: number, newCategory: Category) =>
		set((state: TodosContextState) => ({
			initialTodos: state.initialTodos.map(todo =>
				todo.id === todoId ? { ...todo, categories: [...(todo.categories || []), newCategory] } : todo
			),
		})),
	deleteTodo: (todoId: number) =>
		set((state: TodosContextState) => ({
			initialTodos: state.initialTodos.filter(todo => todo.id !== todoId),
		})),
	updateTodoCompletion: (todoId: number) =>
		set((state: TodosContextState) => ({
			initialTodos: state.initialTodos.map(todo =>
				todo.id === todoId ? { ...todo, is_completed: !todo.is_completed } : todo
			),
		})),
	updateTodoTitle: (todoId: number, newTitle: string) =>
		set((state: TodosContextState) => ({
			initialTodos: state.initialTodos.map(todo => (todo.id === todoId ? { ...todo, task_text: newTitle } : todo)),
		})),
}));

export default useTodosStore;
