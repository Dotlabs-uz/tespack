import React from "react";

type ModelViewerProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
> & {
	src?: string;
	alt?: string;
	"camera-controls"?: boolean | "";
	"auto-rotate"?: boolean | "";
	"environment-image"?: string;
	exposure?: string;
	className?: string;
};

const ModelViewer: React.FC<ModelViewerProps> = (props) => {
	return React.createElement("model-viewer", props);
};

export default ModelViewer;
