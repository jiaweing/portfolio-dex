"use client";

import { GiftIcon } from "hugeicons-react";

export function WrappedGiftIcon({
	className,
	strokeWidth = 3,
}: {
	className?: string;
	strokeWidth?: number;
}) {
	return (
		<>
			<svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
				<defs>
					<linearGradient
						id="wrapped-icon-gradient"
						x1="0"
						y1="0"
						x2="1"
						y2="0"
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
							from="-1 0"
							to="0 0"
							dur="4s"
							repeatCount="indefinite"
						/>
					</linearGradient>
				</defs>
			</svg>
			<style dangerouslySetInnerHTML={{__html: `
				.wrapped-gift-icon, .wrapped-gift-icon path {
					stroke: url(#wrapped-icon-gradient) !important;
				}
			`}} />
			<GiftIcon
				className={`wrapped-gift-icon ${className || ""}`}
				strokeWidth={strokeWidth}
			/>
		</>
	);
}
