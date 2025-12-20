
export type IconName = 
  | "Airplane01Icon"
  | "Award01Icon"
  | "BankIcon"
  | "Bicycle01Icon"
  | "Book01Icon"
  | "Briefcase01Icon"
  | "Building02Icon"
  | "BulbIcon"
  | "Car01Icon"
  | "CodeIcon"
  | "Search01Icon"
  | "ConferenceIcon"
  | "CpuIcon"
  | "DentalToothIcon"
  | "EarthIcon"
  | "EiffelTowerIcon"
  | "EuroIcon"
  | "FavouriteIcon"
  | "File01Icon"
  | "GitBranchIcon"
  | "GitCommitIcon"
  | "GithubIcon"
  | "Globe02Icon"
  | "HappyIcon"
  | "LaurelWreathFirst02Icon"
  | "Mail01Icon"
  | "MailAtSign01Icon"
  | "MapsCircle01Icon"
  | "Mic01Icon"
  | "News01Icon"
  | "Notion02Icon"
  | "Ghost"
  | "ShoppingBag01Icon"
  | "SkullIcon"
  | "SparklesIcon"
  | "StarIcon"
  | "ThreadsIcon"
  | "TShirtIcon"
  | "UserGroupIcon";

export interface WrappedItem {
  id: string;
  title: string;
  description?: string;
  category: "milestone" | "creation" | "travel" | "personal" | "social";

  stat?: string;
  iconName?: IconName;
  color?: string; // Tailwind color name (e.g., "blue", "rose", "amber")
  className?: string; // For custom grid positioning
  href?: string;
}

export const wrappedData: WrappedItem[] = [
  // --- Milestones ---
  {
    id: "company",
    title: "Incorporated a company in Singapore",
    category: "milestone",
    description: "Base 7",
    href: "https://base07.com",
    iconName: "Building02Icon",
    color: "amber",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "github-repos",
    title: "Repos on GitHub",
    stat: "182",
    category: "milestone",
    href: "https://github.com/jiaweing",
    iconName: "GithubIcon",
    color: "slate",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "commits",
    title: "Commits Pushed",
    stat: "2.1k",
    category: "milestone",
    href: "https://github.com/jiaweing",
    iconName: "GitCommitIcon",
    color: "emerald",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "repo-stars",
    title: "Repo Stars",
    stat: "182",
    description: "DropDrawer",
    category: "milestone",
    href: "https://github.com/jiaweing/DropDrawer",
    iconName: "StarIcon",
    color: "yellow",
  },
    {
    id: "newspaper",
    title: "Featured on a local newspaper",
    description: "Business Times",
    category: "milestone",
    href: "https://www.businesstimes.com.sg/lifestyle/dell-innovatefest-2025-uses-ai-address-mental-health-issues",
    iconName: "News01Icon",
    color: "purple",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "google-hackathon",
    title: "Google Hackathon",
    stat: "Top 10",
    description: "Flown to Philippines",
    category: "milestone",
    href: "https://vision.hack2skill.com/event/apacsolutionchallenge",
    iconName: "Award01Icon",
    color: "blue",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "license",
    title: "Got my driver's license",
    category: "milestone",
    href: "https://www.youtube.com/watch?v=ZmDBbnmKpqQ&list=RDZmDBbnmKpqQ",
    iconName: "Car01Icon",
    color: "red",
  },
  {
    id: "notion",
    title: "Became a Notion Campus Lead",
    category: "milestone",
    href: "https://www.linkedin.com/posts/jiaweing_notion-campusleader-sit-activity-7371477567754911745-6vXi",
    iconName: "Notion02Icon",
    color: "zinc",
  },

  {
    id: "startups",
    title: "New Startups Built",
    description: "2 gave up, 3 in progress",
    stat: "5",
    category: "creation",
    href: "https://jiaweing.com/projects",
    iconName: "Rocket01Icon",
    color: "pink",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "clothing",
    title: "Launched a clothing brand",
    description: "2 series drops",
    category: "creation",
    href: "https://supply.tf",
    iconName: "TShirtIcon",
    color: "blue",
    className: "md:col-span-1 md:row-span-1",
  },
    {
    id: "newsletter",
    title: "Launched a newsletter",
    category: "creation",
    href: "https://updatenight.com",
    iconName: "Mail01Icon",
    color: "yellow",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "podcast",
    title: "Started a podcast on Spotify",
    category: "creation",
    href: "https://updatenight.com/p/podcast",
    iconName: "Mic01Icon",
    color: "emerald",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "shopee",
    title: "Launched a shop on Shopee",
    category: "creation",
    href: "https://shopee.sg/supplythefuture",
    iconName: "ShoppingBag01Icon",
    color: "orange",
  },
  {
    id: "blockchain-tshirt",
    title: "World's 1st blockchained T-shirts",
    category: "creation",
    href: "https://supply.tf",
    iconName: "LaurelWreathFirst02Icon",
    color: "cyan",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "startup-18",
    title: "Launching my 18th startup",
    stat: "2026",
    category: "creation",
    href: "https://jiaweing.com/projects",
    iconName: "Ghost",
    color: "violet",
    className: "md:col-span-2 md:row-span-1",
  },
    {
    id: "rust",
    title: "My next startup build in Rust",
    category: "creation",
    href: "#",
    iconName: "CpuIcon",
    color: "slate",
  },

  // --- Travel ---
  {
    id: "travel-spend",
    title: "Cities Visited",
    description: "Spent $23k",
    stat: "26",
    category: "travel",
    href: "#",
    iconName: "MapsCircle01Icon",
    color: "emerald",
    className: "md:col-span-2 md:row-span-2",
  },
    {
    id: "europe-uk",
    title: "Went Europe and UK for the first time",
    category: "travel",
    href: "#",
    iconName: "EuroIcon",
    color: "indigo",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "eiffel",
    title: "Saw the Eiffel Tower",
    category: "travel",
    href: "#",
    iconName: "EiffelTowerIcon",
    color: "yellow",
  },
  {
    id: "catacombs",
    title: "Walked the Paris Catacombs",
    category: "travel",
    href: "#",
    iconName: "SkullIcon",
    color: "stone",
  },
  {
    id: "wonders",
    title: "Wonders of the World",
    stat: "1/7",
    category: "travel",
    description: "The Colosseum",
    href: "#",
    iconName: "SparklesIcon",
    color: "amber",
  },
  {
    id: "long-flight",
    title: "Took my longest flight",
    stat: "18h",
    category: "travel",
    href: "#",
    iconName: "Airplane01Icon",
    color: "blue",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "disneyland",
    title: "Visited Disneyland for the first time",
    category: "travel",
    href: "#",
    iconName: "SparklesIcon",
    color: "pink",
  },
    {
    id: "solo-travel",
    title: "Solo traveled for the first time",
    category: "travel",
    href: "#",
    iconName: "Briefcase01Icon",
    color: "sky",
    className: "md:col-span-2 md:row-span-1",
  },

  // --- Personal ---
  {
    id: "girlfriend",
    title: "Days with my girlfriend",
    stat: "1000+",
    description: "3 years",
    category: "personal",
    href: "#",
    iconName: "FavouriteIcon",
    color: "red",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "books",
    title: "Books Read",
    stat: "4",
    category: "personal",
    href: "https://jiaweing.com/books",
    iconName: "Book01Icon",
    color: "stone",
  },
  {
    id: "cycling",
    title: "Started cycling everyday",
    category: "personal",
    href: "#",
    iconName: "Bicycle01Icon",
    color: "lime",
  },
  {
    id: "wisdom-tooth",
    title: "Wisdom Teeth Out",
    stat: "2/4",
    category: "personal",
    href: "#",
    iconName: "DentalToothIcon",
    color: "teal",
  },

  // --- Social ---
  {
    id: "conferences",
    title: "Conferences Attended",
    stat: "5",
    category: "social",
    href: "#",
    iconName: "ConferenceIcon",
    color: "blue",
  },
  {
    id: "hackathons",
    title: "Hackathons Joined",
    stat: "4",
    category: "social",
    href: "#",
    iconName: "Search01Icon",
    color: "violet",
  },
  {
    id: "github-stars-given",
    title: "Starred Repos",
    stat: "1.5k",
    category: "social",
    href: "https://github.com/jiaweing",
    iconName: "StarIcon",
    color: "yellow",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "threads-followers",
    title: "Followers on Threads",
    stat: "160",
    category: "social",
    href: "https://threads.com/@j14.wei",
    iconName: "ThreadsIcon",
    color: "zinc",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: "threads-views",
    title: "Views on Threads",
    stat: "170k",
    category: "social",
    href: "https://threads.com/@j14.wei",
    iconName: "ThreadsIcon",
    color: "zinc",
  },
  {
    id: "friends",
    title: "Made friends across Asia",
    description: "Korea, Pakistan, Indonesia, Japan, Philippines",
    category: "social",
    href: "#",
    iconName: "EarthIcon",
    color: "teal",
    className: "md:col-span-2 md:row-span-1",
  },
];
