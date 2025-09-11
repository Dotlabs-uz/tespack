"use client";
import React from "react";
import "@google/model-viewer";

interface ModelViewProps {
	imageUrl: string;
	product: { title: { rendered: string } };
}

const ModelView: React.FC<ModelViewProps> = ({ imageUrl, product }) => {
	return (
		<>
			<model-viewer
				src={imageUrl}
				alt={product.title.rendered}
				camera-controls
				auto-rotate
				environment-image="neutral"
				exposure="1"
				className="w-full h-96"
			/>
		</>
	);
};

export default ModelView;
