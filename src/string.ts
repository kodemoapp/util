export const formatTitle = (value: string): string => {
  return (
    (value || '')
      .trim()
      // Remove multiple consecutive spaces
      .replace(/\s\s+/g, ' ')
      // Remove newlines
      .replace(/\r?\n|\r/g, '')
  );
};

// https://www.30secondsofcode.org/js/s/slugify
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
