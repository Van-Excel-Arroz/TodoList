import Todolist from '@/components/TodoList/TodoList';

export default function TodolistPage({ params }: { params: any }) {
	return <Todolist params={params} />;
}
