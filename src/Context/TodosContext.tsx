import { Category, Todo } from '@/utils/types';
import { create } from 'zustand';

const TODO_TOP = 'Add to Top';

interface TodosContextState {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
	addTodo: (newTodo: Todo, newTasksPosition: string) => void;
	addCategory: (todoId: number, newCategory: Category) => void;
	deleteTodo: (todoId: number) => void;
	deleteCategory: (todoId: number, categoryId: number) => void;
	deleteCategories: (categoryId: number) => void;
	toggleTodoCompletion: (todoId: number) => void;
	toggleTodoImportance: (todoId: number) => void;
	updateTodoTitle: (todoId: number, newTitle: string) => void;
	updateDueDate: (todoId: number, newDueDate: string) => void;
	updateDescription: (todoId: number, newDescription: string | null) => void;
	updateCategoriesColor: (categoryTitle: string, newColor: string) => void;
	updateCompletedAt: (todoId: number, date: string | null) => void;
	deleteDueDate: (todoId: number) => void;
	getTodoById: (todoId: number) => Todo;
}

const useTodosStore = create<TodosContextState>()((set: any, get: any) => ({
	todos: [],
	setTodos: (todos: Todo[]) => set({ todos }),
	addTodo: (newTodo: Todo, newTasksPosition: string) => {
		set((state: TodosContextState) => {
			let updatedTodos: Todo[];
			if (newTasksPosition === TODO_TOP) {
				updatedTodos = [newTodo, ...state.todos];
			} else {
				updatedTodos = [...state.todos, newTodo];
			}
			return { todos: updatedTodos };
		});
	},
	addCategory: (todoId: number, newCategory: Category) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo =>
				todo.id === todoId ? { ...todo, categories: [...(todo.categories ?? []), newCategory] } : todo
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
	deleteCategories: (categoryId: number) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => ({
				...todo,
				categories: todo.categories?.filter(cat => cat.id !== categoryId),
			})),
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
	updateCategoriesColor: (categoryTitle: string, newColor: string) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => ({
				...todo,
				categories:
					todo.categories?.map(cat => (cat.category_title === categoryTitle ? { ...cat, hex_color: newColor } : cat)) ??
					[],
			})),
		})),
	updateCompletedAt: (todoId: number, date: string | null) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, completed_at: date } : todo)),
		})),
	deleteDueDate: (todoId: number) =>
		set((state: TodosContextState) => ({
			todos: state.todos.map(todo => (todo.id === todoId ? { ...todo, due_datetime: null } : todo)),
		})),
	getTodoById: (todoId: number | undefined) => {
		return get().todos.find((todo: Todo) => todo.id === todoId);
	},
}));

export default useTodosStore;
