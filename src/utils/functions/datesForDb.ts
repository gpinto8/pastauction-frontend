export const datesForDb = {
  outgoing: (isoString: string) => {
    const localDate = new Date(isoString);
    return [
      localDate.getFullYear(),
      (localDate.getMonth() + 1 + "").padStart(2, '0'),
      (localDate.getDate() + "").padStart(2, '0')
    ].join("-");
  },

  incoming: (string: string) => {
    // Transparently remove time when present
    const [date] = string.split("T");
    const [year, month, day] = date.split("-");
    return new Date(+year, +month - 1, +day).toISOString();
  },
};
