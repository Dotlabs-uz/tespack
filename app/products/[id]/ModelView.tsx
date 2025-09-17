"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { HexColorPicker } from "react-colorful";

const ModelViewer = dynamic(() => import("@/components/custom/ModelViewer"), { ssr: false });

interface ModelViewProps {
	imageUrl?: string;
	product?: { title: { rendered: string } };
	showWheel?: boolean;
	height?: string;
	cameraControls?: boolean;
}

const ModelView: React.FC<ModelViewProps> = ({
	imageUrl,
	height = "h-96",
	showWheel = true,
	cameraControls = true,
}) => {
	const ref = useRef<any>(null);
	const [color, setColor] = useState("#3778e6");

	const applyColor = (hex: string) => {
		const mv = ref.current;
		if (!mv) return;

		const r = parseInt(hex.slice(1, 3), 16) / 255;
		const g = parseInt(hex.slice(3, 5), 16) / 255;
		const b = parseInt(hex.slice(5, 7), 16) / 255;

		const material = mv.model?.materials?.[0];
		if (material) {
			material.pbrMetallicRoughness.setBaseColorFactor([r, g, b, 1]);
		}
	};

	useEffect(() => {
		const mv = ref.current;
		if (!mv) return;

		mv.onload = () => applyColor(color);

		return () => {
			mv.onload = null;
		};
	}, []);


	return (
		<div className={`relative w-full ${height}`}>
			<ModelViewer
				ref={ref}
				src={imageUrl || ""}
				alt="3D Model"
				camera-controls={cameraControls}
				auto-rotate
				rotation-per-second="40deg"
				className="w-full h-96 flex justify-center"
				{...(cameraControls && {
					"min-camera-orbit": "auto auto 1m",
					"max-camera-orbit": "auto auto 2m",
				})}
			/>

			{showWheel && (
				<div className="absolute bottom-4 right-4 bg-white p-2 rounded-xl shadow">
					<HexColorPicker
						color={color}
						onChange={(newColor) => {
							setColor(newColor);
							applyColor(newColor);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default ModelView;
