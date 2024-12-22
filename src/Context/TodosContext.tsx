import { Category, Todo } from '@/types';
import { create } from 'zustand';

interface TodosContextState {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
	addTodo: (newTodo: Todo) => void;
	addCategory: (todoId: number, newCategory: Category) => void;
	deleteTodo: (todoId: number) => void;
	deleteCategory: (todoId: number, categoryId: number) => void;
	toggleTodoCompletion: (todoId: number) => void;
	updateTodoTitle: (todoId: number, newTitle: string) => void;
	updateDueDate: (todoId: number, newDueDate: string) => void;
}

const useTodosStore = create<TodosContextState>()((set: any) => ({
	todos: [],
	setTodos: (todos: Todo[]) => set({ todos: todos }),
	addTodo: (newTodo: Todo) =>
		set((state: TodosContextState) => ({
			todos: [...state.todos, newTodo],
		})),
	addCategory: (todoId: number, newCategory: Category) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo =>
				todo.id === todoId ? { ...todo, categories: [...(todo.categories || []), newCategory] } : todo
			),
		})),
	deleteTodo: (todoId: number) =>
		set((state: TodosContextState) => ({
			todos: state.todos.filter(todo => todo.id !== todoId),
		})),
	deleteCategory: (todoId: number, categoryId: number) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo =>
				todo.id === todoId
					? { ...todo, categories: todo.categories?.filter(category => category.id !== categoryId) }
					: todo
			),
		})),
	toggleTodoCompletion: (todoId: number) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, is_completed: !todo.is_completed } : todo)),
		})),
	updateTodoTitle: (todoId: number, newTitle: string) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, task_text: newTitle } : todo)),
		})),
	updateDueDate: (todoId: number, newDueDate: string) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, due_datetime: newDueDate } : todo)),
		})),
}));

export default useTodosStore;
