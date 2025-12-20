"use client";

import { Gift } from "lucide-react";

export function WrappedGiftIcon({
	className,
	strokeWidth = 3,
}: {
	className?: string;
	strokeWidth?: number;
}) {
	return (
		<div className={`relative ${className || ""}`}>
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 24 24"
				className="overflow-visible"
			>
				<defs>
					<linearGradient
						id="wrapped-icon-gradient"
						gradientUnits="userSpaceOnUse"
						x1="0"
						y1="0"
						x2="48"
						y2="0"
						gradientTransform="rotate(30 12 12)"
						spreadMethod="repeat"
					>
						<stop offset="0" stopColor="rgb(59, 130, 246)" />
						<stop offset="0.25" stopColor="rgb(168, 85, 247)" />
						<stop offset="0.5" stopColor="rgb(239, 68, 68)" />
						<stop offset="0.75" stopColor="rgb(249, 115, 22)" />
						<stop offset="1" stopColor="rgb(59, 130, 246)" />
						<animateTransform
							attributeName="gradientTransform"
							type="translate"
							from="0 0"
							to="-48 0"
							dur="4s"
							repeatCount="indefinite"
							additive="sum"
						/>
					</linearGradient>
					<mask id="icon-mask" maskUnits="userSpaceOnUse">
						<Gift
							className="h-full w-full"
							stroke="white"
							strokeWidth={strokeWidth}
							/* Ensure the inner SVG scales to fit our parent SVG viewBox */
							width="24"
							height="24"
						/>
					</mask>
				</defs>
				{/* The Gradient Rect, revealed only where the Icon Mask is white (the strokes) */}
				<rect
					x="-50%"
					y="-50%"
					width="200%"
					height="200%"
					fill="url(#wrapped-icon-gradient)"
					mask="url(#icon-mask)"
				/>
			</svg>
		</div>
	);
}
