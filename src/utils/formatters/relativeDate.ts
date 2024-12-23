const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

/**
 * Format a date relative to current time eg one year ago, two weeks ago
 */
export const relativeDate = (date: Date | string) => {
  let finalDate = date;
  if (typeof finalDate === "string") finalDate = new Date(finalDate);
  let duration = (finalDate as any - (new Date() as any) ) / 1000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name as any);
    }
    duration /= division.amount;
  }
};
