export function sanitizeObject(obj: Record<string, any> = {}) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    return { ...acc, [key]: value };
  }, {});
}
