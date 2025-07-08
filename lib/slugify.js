// src/lib/slugify.js
export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD') // Normalize diacritics (e.g., é -> e)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both ends
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars (except hyphens)
    .replace(/--+/g, '-'); // Replace multiple - with single -
}