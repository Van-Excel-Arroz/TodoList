import Todolist from '@/components/TodoList/Todolist';

export default function TodolistPage({ params }: { params: any }) {
	return <Todolist params={params} />;
}
