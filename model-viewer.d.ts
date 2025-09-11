declare global {
	namespace JSX {
		interface IntrinsicElements {
			"model-viewer": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				src?: string;
				alt?: string;
				"camera-controls"?: boolean;
				"auto-rotate"?: boolean;
				"environment-image"?: string;
				exposure?: string;
				className?: string;
			};
		}
	}
}
