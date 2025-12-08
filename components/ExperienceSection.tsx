import { Favicon } from "@/components/ui/Favicon";
import profileData from "@/data/profile.json";
import Link from "next/link";
import { BooksSection } from "./BooksSection";
import { GearSection } from "./GearSection";

export function ExperienceSection() {
  return (
    <div className="mx-auto my-8 max-w-2xl space-y-6">
      {/* Present section appears immediately */}
      <div className="mb-6">
        <PresentSection />
      </div>

      {/* Past section appears when scrolled into view */}
      <div className="mb-6">
        <PastSection />
      </div>

      {/* Open source section appears when scrolled into view */}
      <div className="mb-6">
        <OpenSourceSection />
      </div>

      {/* Books section appears when scrolled into view */}
      <div className="mb-6">
        <BooksSection />
      </div>

      {/* Gear section appears when scrolled into view */}
      <div>
        <GearSection />
      </div>
    </div>
  );
}

type ExperienceItem = {
  title: string;
  organization: string;
  url: string;
  description: string;
  invertFavicon?: boolean | "light" | "dark" | "always";
  hideFavicon?: boolean;
};

type ProjectItem = {
  name: string;
  url: string;
  description: string;
  invertFavicon?: boolean | "light" | "dark" | "always";
  hideFavicon?: boolean;
};

function PresentSection() {
  return (
    <div>
        <h3 className="font-semibold mb-2">present</h3>
      <div className="space-y-1 text-sm leading-relaxed">
        {profileData.present.map((item: ExperienceItem, index: number) => (
          <ExperienceListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function PastSection() {
  return (
    <div>
        <h3 className="font-semibold mb-2">past</h3>
      <div className="space-y-1 text-sm leading-relaxed">
        {profileData.past.map((item: ExperienceItem, index: number) => (
          <ExperienceListItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function OpenSourceSection() {
  return (
    <div>
        <h3 className="font-semibold mb-2">open-source</h3>
      <div className="space-y-1 text-sm leading-relaxed">
        {profileData.opensource.map((project: ProjectItem, index: number) => (
          <ProjectListItem key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

function ExperienceListItem({ item }: { item: ExperienceItem }) {
  // Check if description already starts with a dash, hyphen, or parenthesis
  const formattedDescription =
    item.description.startsWith("-") ||
    item.description.startsWith("–") ||
    item.description.startsWith("(")
      ? item.description.trim()
      : `· ${item.description}`;

  return (
    <p className="leading-relaxed">
      {item.title && <>{item.title} @ </>}
      {item.url ? (
        <Link
          href={item.url}
          className="text-blue-500"
          target={item.url.startsWith("http") ? "_blank" : "_self"}
        >
          <Favicon
            url={item.url}
            invert={item.invertFavicon}
            hide={item.hideFavicon}
          />
          {item.organization}
        </Link>
      ) : (
        <span className="text-muted-foreground">{item.organization}</span>
      )}{" "}
      <span className="text-muted-foreground">{item.description && formattedDescription}</span>
    </p>
  );
}

function ProjectListItem({ project }: { project: ProjectItem }) {
  // Check if description already starts with a dash, hyphen, or parenthesis
  const formattedDescription =
    project.description.startsWith("-") ||
    project.description.startsWith("–") ||
    project.description.startsWith("(")
      ? project.description.trim()
      : `· ${project.description}`;

  return (
    <p className="leading-relaxed">
      {project.url ? (
        <Link href={project.url} className="text-blue-500" target="_blank">
          <Favicon
            url={project.url}
            invert={project.invertFavicon}
            hide={project.hideFavicon}
          />
          {project.name}
        </Link>
      ) : (
        <span className="text-muted-foreground">{project.name}</span>
      )}{" "}
      <span className="text-muted-foreground">{formattedDescription}</span>
    </p>
  );
}
