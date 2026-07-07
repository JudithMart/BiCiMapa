export const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")                 
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9\s-]/g, "")    
    .replace(/\s+/g, "-")             
    .replace(/-+/g, "-");             
};

export const createUniqueSlug = (text, existingSlugs = []) => {
  const baseSlug = createSlug(text);

  if (!baseSlug) return baseSlug;

  const normalizedExistingSlugs = new Set(
    existingSlugs
      .filter(Boolean)
      .map((slug) => slug.toLowerCase()),
  );

  if (!normalizedExistingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;
  let uniqueSlug = `${baseSlug}-${suffix}`;

  while (normalizedExistingSlugs.has(uniqueSlug)) {
    suffix += 1;
    uniqueSlug = `${baseSlug}-${suffix}`;
  }

  return uniqueSlug;
};