export function sanitizeObject(obj?: Record<string, any>) {
  if (!obj) {
    return {};
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    return { ...acc, [key]: value };
  }, {});
}
