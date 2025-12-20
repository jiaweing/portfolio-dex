"use client";


export function WrappedPageBorder() {
	return (
		<div className="fixed inset-0 pointer-events-none z-[100] h-screen w-screen overflow-hidden">
			<svg className="absolute inset-0 h-full w-full">
				<defs>
					<linearGradient id="page-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="rgb(59, 130, 246)" />
						<stop offset="33%" stopColor="rgb(168, 85, 247)" />
						<stop offset="66%" stopColor="rgb(239, 68, 68)" />
						<stop offset="100%" stopColor="rgb(249, 115, 22)" />
						<animateTransform
							attributeName="gradientTransform"
							type="rotate"
							from="0 .5 .5"
							to="360 .5 .5"
							dur="5s"
							repeatCount="indefinite"
						/>
					</linearGradient>
					
					{/* Filter to blur the mask (creating the feathering) */}
					<filter id="mask-blur">
						<feGaussianBlur stdDeviation="15" />
					</filter>
					
					{/* The Mask: White = visible, Black = hidden */}
					<mask id="glow-mask">
						{/* Thick stroke at the edge, blurred to fade inwards */}
						<rect
							x="0"
							y="0"
							width="100%"
							height="100%"
							fill="none"
							stroke="white"
							strokeWidth="25"
							filter="url(#mask-blur)"
						/>
					</mask>
				</defs>

				{/* The Gradient Fill, revealed only by the mask */}
				<rect
					x="0"
					y="0"
					width="100%"
					height="100%"
					fill="url(#page-glow-grad)"
					mask="url(#glow-mask)"
					opacity="0.8"
				/>
			</svg>
		</div>
	);
}
