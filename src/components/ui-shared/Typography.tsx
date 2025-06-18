interface TypographyTypes {
	children: React.ReactNode;
	className?: string;
}

export default function Typography({ children, className }: TypographyTypes) {
	return <p className={`${className} text-lg font-semibold text-slate-700`}>{children}</p>;
}
