import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Define the base path based on the mode.
  // 'production' mode is used during 'npm run build', which is what GitHub Actions runs.
  // 'development' mode is used during 'npm run dev'.
  const base = mode === 'production' 
    ? '/damijankante.github.io/' 
    : '/';

  return {
    // Use the dynamically set base path
    base: base,

    // Your existing server configuration
    server: {
      host: "::",
      port: 8080,
    },

    // Your existing plugins configuration
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),

    // Your existing resolve (alias) configuration
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});