import { formatDate } from "date-fns";

interface PostDateProps {
  date?: string;
}

export function PostDate({ date }: PostDateProps) {
  if (!date) return null;

  return (
    <time dateTime={date}>{formatDate(new Date(date), "MMMM d, yyyy")}</time>
  );
}
