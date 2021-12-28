export const getCookieValueByName = (name) => {
  let cookie = document.cookie.split(";").find((x) => x.includes(name));

  return cookie ? cookie.split("=")[1] : null;
};

export const fullCopy = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;

  let res = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    res[i] = fullCopy(obj[i]);
  }

  return res;
};
