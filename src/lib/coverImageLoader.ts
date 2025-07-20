// Dynamically loads all cover images from the /assets/images/covers directory.

// This function returns a record mapping the filename (without extension) to its URL.
// @returns A Record<string, string> where the key is the image ID (e.g., "graphic-magazine-design")
// and the value is the resolved asset URL.
export const loadCoverImages = (): Record<string, string> => {
  const modules = import.meta.glob('/src/assets/images/covers/*.{png,jpg,jpeg,svg,gif}', { eager: true });
  
  const images: Record<string, string> = {};

  for (const path in modules) {
    const module = modules[path] as { default: string };
    const fileName = path.split('/').pop();
    
    if (fileName) {
      // The key is the filename without the extension.
      const imageId = fileName.substring(0, fileName.lastIndexOf('.'));
      images[imageId] = module.default;
    }
  }
  
  return images;
};