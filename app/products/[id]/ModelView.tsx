"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";

const ModelViewer = dynamic(() => import("@/components/custom/ModelViewer"), { ssr: false });

interface ModelViewProps {
	imageUrl?: string;
	product?: { title: { rendered: string } };
	showWheel?: boolean;
	height?: string;
}

const ModelView: React.FC<ModelViewProps> = ({ imageUrl, product, showWheel = true, height = "h-96" }: ModelViewProps) => {
	const ref = useRef<any>(null);
	const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });

	const changeColor = (hsva: { h: number; s: number; v: number; a: number }) => {
		const mv = ref.current;
		if (!mv) return;

		const hex = hsvaToHex(hsva);
		const r = parseInt(hex.substr(1, 2), 16) / 255;
		const g = parseInt(hex.substr(3, 2), 16) / 255;
		const b = parseInt(hex.substr(5, 2), 16) / 255;

		const material = mv.model?.materials?.[0];
		if (material) {
			material.pbrMetallicRoughness.setBaseColorFactor([r, g, b, 1]);
		}
	};

	useEffect(() => {
		const mv = ref.current;
		if (!mv) return;
		mv.addEventListener("load", () => changeColor(hsva));
	}, [hsva]);

	return (
		<div className={`relative w-full ${height}`}>
			<ModelViewer
				ref={ref}
				src={imageUrl || ""}
				alt={product?.title?.rendered ?? "3D Model"}
				camera-controls
				className="w-full h-96 flex justify-center"
			/>

			{showWheel && (
				<div className="absolute bottom-4 right-4">
					<Wheel
						color={hsva}
						onChange={(newHsva) => {
							setHsva(newHsva.hsva);
							changeColor(newHsva.hsva);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default ModelView;
