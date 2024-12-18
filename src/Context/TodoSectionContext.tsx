import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TodoSectionState {
	openSections: Record<string, Record<string, boolean>>;
	toggleSection: (todolistId: string, sectionTitle: string) => void;
	initializeSectionState: (todolistId: string, sectionTitle: string) => void;
}
