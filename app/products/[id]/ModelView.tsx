"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(
	() => import("@/components/custom/ModelViewer").then((mod) => mod.default),
	{ ssr: false }
);

interface ModelViewProps {
	imageUrl?: string;
	product?: { title: { rendered: string } };
}

const ModelView: React.FC<ModelViewProps> = ({ imageUrl, product }) => {
	return (
		// <Suspense fallback={<span>loading...</span>}>
		<ModelViewer
			src={imageUrl || ""}
			alt="{product?.title?.rendered ?? }"
			camera-controls
			className="w-full h-96"
		/>
		// </Suspense>
	);
};

export default ModelView;
