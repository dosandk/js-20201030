/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export const createGetter = path => {
  const pathArray = path.split('.');

  return obj => {
    let result = obj;

    for (let item of pathArray) {
      if (result === undefined) {
        break;
      }

      result = result[item];
    }

    return result;
  };
}

export const createGetterRecursion = path => {
  const pathArray = path.split('.');

  return obj => {
    let result = obj;

    const getValue = arr => {
      if (!arr.length || !result) {
        return result;
      }

      result = result[arr.shift()];

      return getValue(arr);
    };

    return getValue([...pathArray]);
  };
}
