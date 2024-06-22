import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import * as child from "child_process";

const commitHash = child.execSync("git rev-parse --short HEAD").toString();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), imagetools()],
  define: {
    __LAST_COMMIT_HASH__: JSON.stringify(commitHash),
    __VERSION_NAME__: JSON.stringify("homepage-mobile"),
  },
});
