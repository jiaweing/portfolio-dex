
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
  | "CommandIcon"
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
  | "Link01Icon"
  | "Mail01Icon"
  | "MailAtSign01Icon"
  | "MapsCircle01Icon"
  | "Mic01Icon"
  | "News01Icon"
  | "Notion02Icon"
  | "Rocket01Icon"
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
  highlight?: boolean;
  stat?: string;
  iconName?: IconName;
  color?: string; // Tailwind color name (e.g., "blue", "rose", "amber")
  className?: string; // For custom grid positioning
}

export const wrappedData: WrappedItem[] = [
  // --- Milestones ---
  {
    id: "company",
    title: "Incorporated a company in Singapore",
    category: "milestone",
    highlight: true,
    iconName: "Building02Icon",
    color: "amber",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "github-repos",
    title: "Repos on GitHub",
    stat: "182",
    category: "milestone",
    iconName: "GithubIcon",
    color: "slate",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "commits",
    title: "Commits Pushed",
    stat: "2.1k",
    category: "milestone",
    highlight: true,
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
    iconName: "StarIcon",
    color: "yellow",
  },
  {
    id: "google-hackathon",
    title: "Google Hackathon",
    stat: "Top 10",
    description: "Flown to Philippines",
    category: "milestone",
    iconName: "Award01Icon",
    color: "blue",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "license",
    title: "Got my driver's license",
    category: "milestone",
    iconName: "Car01Icon",
    color: "red",
  },
  {
    id: "newspaper",
    title: "Featured on a local newspaper",
    category: "milestone",
    highlight: true,
    iconName: "News01Icon",
    color: "slate",
  },
  {
    id: "notion",
    title: "Became a Notion Campus Lead",
    category: "milestone",
    iconName: "Notion02Icon",
    color: "zinc",
  },

  {
    id: "startups",
    title: "New Startups Built",
    description: "2 gave up, 3 in progress",
    stat: "5",
    category: "creation",
    highlight: true,
    iconName: "Rocket01Icon",
    color: "indigo",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "clothing",
    title: "Launched a clothing brand",
    description: "Dropped 2 series",
    category: "creation",
    iconName: "TShirtIcon",
    color: "rose",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "podcast",
    title: "Started a podcast on Spotify",
    category: "creation",
    iconName: "Mic01Icon",
    color: "purple",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "newsletter",
    title: "Launched a newsletter",
    category: "creation",
    iconName: "Mail01Icon",
    color: "orange",
    className: "md:col-span-1 md:row-span-1",
  },

  {
    id: "shopee",
    title: "Launched a shop on Shopee",
    category: "creation",
    iconName: "ShoppingBag01Icon",
    color: "orange",
  },
  {
    id: "rust",
    title: "Coded my first Rust app",
    category: "creation",
    iconName: "CpuIcon",
    color: "orange",
  },
  {
    id: "blockchain-tshirt",
    title: "World's 1st Blockchained T-shirts",
    category: "creation",
    iconName: "Link01Icon",
    color: "cyan",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: "startup-18",
    title: "Launching my 18th startup",
    stat: "2026",
    category: "creation",
    iconName: "Rocket01Icon",
    color: "violet",
    className: "md:col-span-2 md:row-span-1",
  },

  // --- Travel ---
  {
    id: "travel-spend",
    title: "Cities Visited",
    description: "Spent $23k",
    stat: "26",
    category: "travel",
    highlight: true,
    iconName: "MapsCircle01Icon",
    color: "emerald",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: "solo-travel",
    title: "Solo traveled for the first time",
    category: "travel",
    iconName: "Briefcase01Icon",
    color: "sky",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "eiffel",
    title: "Saw the Eiffel Tower",
    category: "travel",
    iconName: "EiffelTowerIcon",
    color: "yellow",
  },
  {
    id: "catacombs",
    title: "Walked the Paris Catacombs",
    category: "travel",
    iconName: "SkullIcon",
    color: "stone",
  },
  {
    id: "wonders",
    title: "Wonders of the World",
    stat: "1/7",
    category: "travel",
    iconName: "SparklesIcon",
    color: "amber",
  },
  {
    id: "long-flight",
    title: "Longest Flight",
    stat: "18h",
    category: "travel",
    iconName: "Airplane01Icon",
    color: "blue",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "disneyland",
    title: "Visited Disneyland",
    category: "travel",
    iconName: "SparklesIcon",
    color: "pink",
  },
  {
    id: "europe-uk",
    title: "Went Europe and UK",
    category: "travel",
    iconName: "EuroIcon",
    color: "indigo",
    className: "md:col-span-2 md:row-span-1",
  },

  // --- Personal ---
  {
    id: "books",
    title: "Books Read",
    stat: "4",
    category: "personal",
    iconName: "Book01Icon",
    color: "stone",
  },
  {
    id: "girlfriend",
    title: "Days with my girlfriend",
    stat: "1000+",
    description: "3 years",
    category: "personal",
    highlight: true,
    iconName: "FavouriteIcon",
    color: "red",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: "cycling",
    title: "Started cycling everyday",
    category: "personal",
    iconName: "Bicycle01Icon",
    color: "lime",
  },
  {
    id: "wisdom-tooth",
    title: "Wisdom Teeth Out",
    stat: "2/4",
    category: "personal",
    iconName: "DentalToothIcon",
    color: "teal",
  },

  // --- Social ---
  {
    id: "conferences",
    title: "Conferences Attended",
    stat: "5",
    category: "social",
    iconName: "ConferenceIcon",
    color: "sky",
  },
  {
    id: "hackathons",
    title: "Hackathons Joined",
    stat: "4",
    category: "social",
    iconName: "CommandIcon",
    color: "emerald",
  },
  {
    id: "github-stars-given",
    title: "Starred Repos",
    stat: "1.5k",
    category: "social",
    iconName: "StarIcon",
    color: "yellow",
  },
  {
    id: "threads-followers",
    title: "Followers on Threads",
    stat: "160",
    category: "social",
    iconName: "ThreadsIcon",
    color: "zinc",
  },
  {
    id: "threads-views",
    title: "Views on Threads",
    stat: "170k",
    category: "social",
    iconName: "ThreadsIcon",
    color: "zinc",
    highlight: true,
  },
  {
    id: "friends",
    title: "Made friends across Asia",
    description: "Korea, Pakistan, Indonesia, Japan, Philippines",
    category: "social",
    iconName: "EarthIcon",
    color: "teal",
    className: "md:col-span-2 md:row-span-1",
  },
];
