/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number | undefined} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) return '';
  if (size === undefined) return string;

  const firstSlice = string.slice(0, size);
  const rest = [...string.slice(size)];

  return rest.reduce((accumString, char) => {
    if (!accumString.endsWith(char.repeat(size))) {
      accumString += char;
    }

    return accumString;
  }, firstSlice);
}

function trimSymbols(string, params) {
  const arr = string.split("");
  const resultArr = [];
  let repeatCounts = 1;

  resultArr.push(arr[0]);
  arr.shift();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== resultArr[resultArr.length - 1]) {
      resultArr.push(arr[i]);
      repeatCounts = 1;
    } else if (
      arr[i] === resultArr[resultArr.length - 1] &&
      repeatCounts < params
    ) {
      repeatCounts++;
      resultArr.push(arr[i]);
    }
  }
  return resultArr.join("");
}
