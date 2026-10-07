# ---- base: Node LTS + pnpm (a versão do pnpm vem do campo "packageManager" do package.json da raiz)
FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /repo

# ---- build: instala as dependências, compila e separa só o necessário para produção
FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter worker build
# `deploy` copia o app já compilado + apenas as dependências de produção para /out
RUN pnpm --filter worker deploy --legacy --prod /out

# ---- runtime: imagem final, pequena, sem código-fonte do monorepo nem ferramentas de build
FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /out .
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]