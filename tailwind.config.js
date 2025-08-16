/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",       // Fundo principal da tela
        titulo: "#FFFFFF",           // Texto de títulos e destaques
        botaoPrimario: "#06B6D4",   // Botões principais (ex.: Cadastrar)
        botaoSecundario: "#8B5CF6", // Botões secundários (ex.: Login)
        destaque: "#FACC15",         // Ícones, alertas ou elementos de destaque
        inputBackground: "#F1F5F9", // Fundo de inputs e cards
        borda: "#94A3B8",            // Bordas de inputs e textos secundários
      },
      fontFamily: {
        titulo: ["Poppins_700Bold"], // Fonte para títulos, botões, cabeçalhos
        texto: ["Inter_400Regular"], // Fonte para textos do corpo, labels e descrições
      },
    },
  },
  plugins: [],
};
