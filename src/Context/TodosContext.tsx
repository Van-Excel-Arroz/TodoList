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
	toggleTodoImportance: (todoId: number) => void;
	updateTodoTitle: (todoId: number, newTitle: string) => void;
	updateDueDate: (todoId: number, newDueDate: string) => void;
	updateDescription: (todoId: number, newDescription: string | null) => void;
	deleteDueDate: (todoId: number) => void;
	getTodoById: (todoId: number) => Todo;
}

const useTodosStore = create<TodosContextState>()((set: any, get: any) => ({
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
	toggleTodoImportance: (todoId: number) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, is_important: !todo.is_important } : todo)),
		})),
	updateTodoTitle: (todoId: number, newTitle: string) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, task_text: newTitle } : todo)),
		})),
	updateDueDate: (todoId: number, newDueDate: string) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, due_datetime: newDueDate } : todo)),
		})),
	updateDescription: (todoId: number, newDescription: string | null) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, description: newDescription } : todo)),
		})),
	deleteDueDate: (todoId: number) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, due_datetime: null } : todo)),
		})),
	getTodoById: (todoId: number) => {
		return get().todos.find((todo: Todo) => todo.id === todoId);
	},
}));

export default useTodosStore;
