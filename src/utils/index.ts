export function localGet(key: string) {
  const value = window.localStorage.getItem(key);
  try {
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    return value;
  }
}

export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function localRemove(key: string) {
  window.localStorage.removeItem(key);
}
