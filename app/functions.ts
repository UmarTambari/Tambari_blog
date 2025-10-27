export const formattedDate = (date: Date | null): string | null => {
  if (!date) return "No Date";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
