export function LabelHidden({ labelFor, text }) {
	return (
		<label htmlFor={labelFor} className="visually-hidden">
			{text}
		</label>
	);
}
