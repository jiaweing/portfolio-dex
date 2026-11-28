/* When the room is dressed up for Christmas: all of December. Adding
   ?xmas=1 to the address turns it on any day of the year, and ?xmas=0 turns
   it off, so both looks can be checked whatever the date. */

export function isFestive(
  now: Date = new Date(),
  search: string = window.location.search
) {
  const forced = new URLSearchParams(search).get("xmas");
  if (forced !== null) {
    return !["0", "off", "false"].includes(forced);
  }
  return now.getMonth() === 11;
}
