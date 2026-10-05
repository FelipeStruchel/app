// Configuração do PostCSS (a ferramenta que processa o CSS) com o plugin do Tailwind v4.
// Os apps reaproveitam este arquivo em vez de repetir (ver o postcss.config.mjs de cada app).
const config = {
  plugins: { '@tailwindcss/postcss': {} },
};

export default config;