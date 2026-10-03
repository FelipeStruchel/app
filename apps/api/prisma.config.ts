import 'dotenv/config'; // carrega o .env (o Prisma 7 não carrega sozinho)
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema', // PASTA com os arquivos do schema (um arquivo por model)
  migrations: { path: 'prisma/migrations' }, // onde as migrations são guardadas
  datasource: { url: env('DATABASE_URL') }, // URL do banco, lida do .env
});