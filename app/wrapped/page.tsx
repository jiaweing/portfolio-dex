import { AnimatedGradientText } from "@/components/wrapped/animated-gradient-text";
import { BentoCard } from "@/components/wrapped/bento-card";
import { BentoGrid } from "@/components/wrapped/bento-grid";
import { generateMetadata } from "@/lib/metadata";
import { wrappedData } from "@/lib/wrapped-data";

export const metadata = generateMetadata({
  title: "2025 Wrapped",
  description: "A look back at my 2025 - milestones, travels, and creations.",
});

export default function WrappedPage() {
	return (
		<div className="space-y-12 md:px-20 2xl:px-0">
			<div className="flex flex-col items-center text-center space-y-4">
				<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
					<AnimatedGradientText>2025</AnimatedGradientText> Wrapped
				</h1>
				<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
					It always has been the journey, not the destination.
				</p>
			</div>

			<div className="flex flex-col gap-24">
				{/* Milestones */}
				<section className="space-y-6">
					<h2 className="text-2xl font-medium tracking-tight text-muted-foreground">
						Milestones
					</h2>
					<BentoGrid>
						{wrappedData
							.filter((item) => item.category === "milestone")
							.map((item, index) => (
								<BentoCard key={item.id} item={item} index={index} />
							))}
					</BentoGrid>
				</section>

				{/* Creations */}
				<section className="space-y-6">
					<h2 className="text-2xl font-medium tracking-tight text-muted-foreground">
						Builds
					</h2>
					<BentoGrid>
						{wrappedData
							.filter((item) => item.category === "creation")
							.map((item, index) => (
								<BentoCard key={item.id} item={item} index={index} />
							))}
					</BentoGrid>
				</section>

				{/* Travel */}
				<section className="space-y-6">
					<h2 className="text-2xl font-medium tracking-tight text-muted-foreground">
						Travel
					</h2>
					<BentoGrid>
						{wrappedData
							.filter((item) => item.category === "travel")
							.map((item, index) => (
								<BentoCard key={item.id} item={item} index={index} />
							))}
					</BentoGrid>
				</section>

				{/* Life & Social */}
				<section className="space-y-6">
					<h2 className="text-2xl font-medium tracking-tight text-muted-foreground">
						Life
					</h2>
					<BentoGrid>
						{wrappedData
							.filter((item) => ["personal", "social"].includes(item.category))
							.map((item, index) => (
								<BentoCard key={item.id} item={item} index={index} />
							))}
					</BentoGrid>
				</section>
			</div>
		</div>
	);
}
