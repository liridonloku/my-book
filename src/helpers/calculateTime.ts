const calculateTime = (postDate: Date, now: Date): string => {
  let differenceInMinutes = (now.getTime() - postDate.getTime()) / 1000 / 60;
  // Years
  if (differenceInMinutes / (60 * 24 * 365) >= 1) {
    return `${Math.floor(differenceInMinutes / (60 * 24 * 365))} year${
      Math.floor(differenceInMinutes / (60 * 24 * 365)) === 1 ? "" : "s"
    } ago`;
  }
  // Months
  if (differenceInMinutes / (60 * 24 * 30) >= 1) {
    return `${Math.floor(differenceInMinutes / (60 * 24 * 30))} month${
      Math.floor(differenceInMinutes / (60 * 24 * 30)) === 1 ? "" : "s"
    } ago`;
  }
  // Weeks
  if (differenceInMinutes / (60 * 24 * 7) >= 1) {
    return `${Math.floor(differenceInMinutes / (60 * 24 * 7))} week${
      Math.floor(differenceInMinutes / (60 * 24 * 7)) === 1 ? "" : "s"
    } ago`;
  }
  // Days
  if (differenceInMinutes / (60 * 24) >= 1) {
    return `${Math.floor(differenceInMinutes / (60 * 24))} day${
      Math.floor(differenceInMinutes / (60 * 24)) === 1 ? "" : "s"
    } ago`;
  }
  // Hours
  if (differenceInMinutes / 60 >= 1) {
    return `${Math.floor(differenceInMinutes / 60)} hour${
      Math.floor(differenceInMinutes / 60) === 1 ? "" : "s"
    } ago`;
  }
  // Minutes
  if (differenceInMinutes >= 1) {
    return `${differenceInMinutes} minute${
      differenceInMinutes === 1 ? "" : "s"
    } ago`;
  }
  // Now
  return "just now";
};

export default calculateTime;
