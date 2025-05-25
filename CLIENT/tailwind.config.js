import tailwindcss from "@tailwindcss/vite";
export default {
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
      },
    },
  },
  plugins: [tailwindcss()],
};
