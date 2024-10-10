export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEmpty = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};

export const getMonthName = (dateInput?: Date): string => {
  const date = dateInput || new Date();
  const monthName = date.toLocaleString("default", { month: "long" });

  return monthName;
};

export const getMonthDate = (
  data: string[],
  year = new Date().getFullYear()
) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return data.map((monthName) => {
    const monthIndex = monthNames.indexOf(monthName);

    return new Date(year, monthIndex, 1);
  });
};

export const convertDate = (date: Date) => {
  const newDate = new Date(date);

  return `${(newDate.getMonth() + 1).toString().padStart(2, "0")}.${newDate
    .getDate()
    .toString()
    .padStart(2, "0")}.${newDate.getFullYear()}`;
};
