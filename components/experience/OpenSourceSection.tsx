import { Favicon } from "@/components/ui/Favicon";
import profileData from "@/data/profile.json";
import Link from "next/link";

export function OpenSourceSection() {
  return (
    <div className="space-y-1.5 text-sm leading-relaxed">
      {profileData.opensource.map((project: any, index: number) => (
        <ProjectListItem key={index} project={project} />
      ))}
    </div>
  );
}

function ProjectListItem({ project }: { project: any }) {
  const formattedDescription =
    project.description.startsWith("-") ||
    project.description.startsWith("–") ||
    project.description.startsWith("(")
      ? project.description.trim()
      : `· ${project.description}`;

  return (
    <p className="leading-relaxed">
      <Link
        href={project.url}
        className="text-blue-500 dark:text-sky-500 hover:underline"
        target="_blank"
      >
        <Favicon url={project.url} />
        {project.name}
      </Link>{" "}
      <span className="text-muted-foreground text-xs">
        {formattedDescription}
      </span>
    </p>
  );
}
