import { Favicon } from "@/components/ui/Favicon";
import profileData from "@/data/profile.json";
import { Project } from "@/lib/notion";
import Link from "next/link";

export function OpenSourceSection({ projects }: { projects?: Project[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">projects</h3>
      <div className="space-y-1.5 text-sm leading-relaxed">
        {projects && projects.length > 0
          ? projects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))
          : // Fallback to local data if no projects fetched (or during dev without keys)
            profileData.opensource.map((project: any, index: number) => (
              <ProjectListItem
                key={index}
                project={{ ...project, title: project.name, techStack: [] }}
              />
            ))}
      </div>
    </div>
  );
}

function ProjectListItem({ project }: { project: Project | any }) {
  // Check if description already starts with a dash, hyphen, or parenthesis
  const formattedDescription =
    project.description.startsWith("-") ||
    project.description.startsWith("–") ||
    project.description.startsWith("(")
      ? project.description.trim()
      : `· ${project.description}`;

  const href = project.url || project.github || "#";

  return (
    <p className="leading-relaxed">
      {href !== "#" ? (
        <Link
          href={href}
          className="text-blue-500 dark:text-sky-500"
          target="_blank"
        >
          <Favicon url={href} />
          {project.title}
        </Link>
      ) : (
        <span className="text-muted-foreground">{project.title}</span>
      )}{" "}
      <span className="text-muted-foreground">{formattedDescription}</span>
    </p>
  );
}
