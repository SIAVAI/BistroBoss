import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel"', "serif"],
      },
    },
  },
  plugins: [tailwindcss(), react()],
});
