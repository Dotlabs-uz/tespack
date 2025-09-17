"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { RgbaColorPicker } from "react-colorful";

const ModelViewer = dynamic(() => import("@/components/custom/ModelViewer"), { ssr: false });

interface ModelViewProps {
	imageUrl?: string;
	product?: { title: { rendered: string } };
	showWheel?: boolean;
	height?: string;
}

const ModelView: React.FC<ModelViewProps> = ({ imageUrl, height = "h-96" }) => {
	const ref = useRef<any>(null);
	const [color, setColor] = useState({ r: 55, g: 120, b: 230, a: 1 });

	const applyColor = (rgba: { r: number; g: number; b: number; a: number }) => {
		const mv = ref.current;
		if (!mv) return;

		const r = rgba.r / 255;
		const g = rgba.g / 255;
		const b = rgba.b / 255;

		const material = mv.model?.materials?.[0];
		if (material) {
			material.pbrMetallicRoughness.setBaseColorFactor([r, g, b, 1]);
		}
	};

	useEffect(() => {
		const mv = ref.current;
		if (!mv) return;
		mv.addEventListener("load", () => applyColor(color));
	}, []);

	return (
		<div className={`relative w-full ${height}`}>
			<ModelViewer
				ref={ref}
				src={imageUrl || ""}
				alt="3D Model"
				camera-controls
				className="w-full h-96 flex justify-center"
			/>

			<div className="absolute bottom-4 right-4 bg-white p-2 rounded-xl shadow">
				<RgbaColorPicker
					color={color}
					onChange={(newColor) => {
						setColor(newColor);
						applyColor(newColor);
					}}
				/>
			</div>
		</div>
	);
};

export default ModelView;
