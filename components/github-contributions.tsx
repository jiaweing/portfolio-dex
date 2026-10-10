"use client";

import { format } from "date-fns";
import { LoaderIcon } from "lucide-react";
import { use } from "react";
import type { Activity } from "@/components/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function GitHubContributions({
  contributions,
  githubProfileUrl,
  hideLabels = false,
  blockSize = 11,
  blockMargin = 3,
  className,
}: {
  contributions: Promise<Activity[]>;
  githubProfileUrl: string;
  hideLabels?: boolean;
  blockSize?: number;
  blockMargin?: number;
  className?: string;
}) {
  const data = use(contributions);

  return (
    <ContributionGraph
      blockMargin={blockMargin}
      blockRadius={2}
      blockSize={blockSize}
      className={cn("mx-auto py-2", className)}
      data={data}
    >
      <ContributionGraphCalendar
        className="no-scrollbar px-2"
        hideMonthLabels={hideLabels}
        title="GitHub Contributions"
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <g>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                />
              </g>
            </TooltipTrigger>
            <TooltipContent className="font-sans">
              <p>
                {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                on {format(new Date(activity.date), "dd.MM.yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      {!hideLabels && (
        <ContributionGraphFooter className="px-2">
          <ContributionGraphTotalCount>
            {({ totalCount, year }) => (
              <div className="text-muted-foreground">
                {totalCount.toLocaleString("en")} contributions in {year} on{" "}
                <a
                  className="link-underline text-foreground"
                  href={githubProfileUrl}
                  rel="noopener"
                  target="_blank"
                >
                  GitHub
                </a>
                .
              </div>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend />
        </ContributionGraphFooter>
      )}
    </ContributionGraph>
  );
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  );
}
