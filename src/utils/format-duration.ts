export function formatDuration(seconds: number) {
  if (isNaN(seconds)) {
    return "";
  }
  if (isNaN(seconds)) {
    return "";
  }
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = String(Math.floor((seconds % (60 * 60)) / 60)).padStart(
    2,
    "0"
  );
  const leftSeconds = Math.floor(seconds % 60);
  const paddedSeconds = String(leftSeconds).padStart(2, "0");
  return `${
    hours ? `${String(hours).padStart(2, "0")}:` : ""
  }${minutes}:${paddedSeconds}`;
}
