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