// Dynamically loads all images from a project's gallery folder
// @param projectFolderName - The name of the folder inside /src/assets/images/galleries/
// @returns An array of gallery items, each with a src URL and a generated Description

export const loadGalleryImages = (projectFolderName: string) => {
    // Use import.meta.glob to find all matching image files.
    // The eager: true option imports the modules immediately and gives us direct access to their URLs.
    const modules = import.meta.glob('/src/assets/images/galleries/**/*.{png,jpg,jpeg,svg,gif}', { eager: true });

    const galleryItems = [];

    // The path pattern we are looking for inside the imported modules.
    const pathPattern = `/src/assets/images/galleries/${projectFolderName}/`;

    for (const path in modules) {
    if (path.startsWith(pathPattern)) {
      const module = modules[path] as { default: string };
      
      // Extract the filename from the path to generate a default description.
      const fileName = path.split('/').pop()?.split('.')[0] || '';
      const description = fileName.replace(/[-_]/g, ' ').replace(/^\d+\s*/, '');    // Removes numbers and hyphens

      galleryItems.push({
        src: module.default,
        description: description.charAt(0).toUpperCase() + description.slice(1),    // Capitalize first letter
      });
    }
  }

  return galleryItems;
};