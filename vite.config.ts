import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react()],
    define: {
      APP_ENVIRONMENT: JSON.stringify(mode),
      APP_VERSION: JSON.stringify(
        process.env.APP_VERSION || process.env.npm_package_version
      ),
      APP_VERSION_DATE: JSON.stringify(new Date().toISOString()),
    },
  };
});
