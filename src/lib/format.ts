export function formatDate(date: Date) {
  const { format } = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return format(date);
}
