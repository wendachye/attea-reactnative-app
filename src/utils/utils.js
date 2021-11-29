export const groupArrayByKey = (array, key) => {
  return array.reduce((a, b) => {
    if (b[key] != null) {
      (a[b[key]] = a[b[key]] || []).push(b);
    }
    return a;
  }, {});
};
