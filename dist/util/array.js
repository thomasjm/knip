export const compact = (collection) => Array.from(new Set(collection)).filter((value) => Boolean(value));
export const arrayify = (value) => Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];
