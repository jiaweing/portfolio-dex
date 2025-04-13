"use client";
import { InView } from "@/components/core/in-view";
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
        <InView
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewOptions={{ once: true, amount: 0.1 }}
        >
          <PastSection />
        </InView>
      </div>

      {/* Open source section appears when scrolled into view */}
      <div className="mb-6">
        <InView
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewOptions={{ once: true, amount: 0.1 }}
        >
          <OpenSourceSection />
        </InView>
      </div>

      {/* Books section appears when scrolled into view */}
      <div className="mb-6">
        <InView
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewOptions={{ once: true, amount: 0.1 }}
        >
          <BooksSection />
        </InView>
      </div>

      {/* Gear section appears when scrolled into view */}
      <div>
        <InView
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewOptions={{ once: true, amount: 0.1 }}
        >
          <GearSection />
        </InView>
      </div>
    </div>
  );
}

type ExperienceItem = {
  title: string;
  organization: string;
  url: string;
  description: string;
};

type ProjectItem = {
  name: string;
  url: string;
  description: string;
};

function PresentSection() {
  return (
    <div>
      <InView
        variants={{
          hidden: { opacity: 0, x: -30, y: 10, filter: "blur(4px)" },
          visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewOptions={{ once: true }}
      >
        <h3 className="font-semibold mb-2">present</h3>
      </InView>
      <div className="space-y-1 text-sm">
        {profileData.present.map((item: ExperienceItem, index: number) => (
          <InView
            key={index}
            variants={{
              hidden: { opacity: 0, x: -20, y: 10, filter: "blur(3px)" },
              visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.1 + index * 0.1, // Staggered delay
            }}
            viewOptions={{ once: true }}
          >
            <ExperienceListItem item={item} />
          </InView>
        ))}
      </div>
    </div>
  );
}

function PastSection() {
  return (
    <div>
      <InView
        variants={{
          hidden: { opacity: 0, x: -30, y: 10, filter: "blur(4px)" },
          visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewOptions={{ once: true, amount: 0.1 }}
      >
        <h3 className="font-semibold mb-2">past</h3>
      </InView>
      <div className="space-y-1 text-sm">
        {profileData.past.map((item: ExperienceItem, index: number) => (
          <InView
            key={index}
            variants={{
              hidden: { opacity: 0, x: -20, y: 10, filter: "blur(3px)" },
              visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.1 + index * 0.1, // Reduced base delay
            }}
            viewOptions={{ once: true, amount: 0.1 }}
          >
            <ExperienceListItem item={item} />
          </InView>
        ))}
      </div>
    </div>
  );
}

function OpenSourceSection() {
  return (
    <div>
      <InView
        variants={{
          hidden: { opacity: 0, x: -30, y: 10, filter: "blur(4px)" },
          visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewOptions={{ once: true, amount: 0.1 }}
      >
        <h3 className="font-semibold mb-2">open-source</h3>
      </InView>
      <div className="space-y-1 text-sm">
        {profileData.opensource.map((project: ProjectItem, index: number) => (
          <InView
            key={index}
            variants={{
              hidden: { opacity: 0, x: -20, y: 10, filter: "blur(3px)" },
              visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.1 + index * 0.08, // Reduced base delay
            }}
            viewOptions={{ once: true, amount: 0.1 }}
          >
            <ProjectListItem project={project} />
          </InView>
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
      : `- ${item.description}`;

  return (
    <p>
      {item.title && <>{item.title} @ </>}
      {item.url ? (
        <Link
          href={item.url}
          className="text-blue-500"
          target={item.url.startsWith("http") ? "_blank" : "_self"}
        >
          {item.organization}
        </Link>
      ) : (
        <span className="text-muted-foreground">{item.organization}</span>
      )}{" "}
      {item.description && formattedDescription}
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
      : `- ${project.description}`;

  return (
    <p>
      {project.url ? (
        <Link href={project.url} className="text-blue-500" target="_blank">
          {project.name}
        </Link>
      ) : (
        <span className="text-muted-foreground">{project.name}</span>
      )}{" "}
      {formattedDescription}
    </p>
  );
}
