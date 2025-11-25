import "dotenv/config";
import { defineConfig } from "@prisma/cli";

export default defineConfig({
  schema: "./prisma/schema.prisma",

  migrate: {
    connectionString: process.env.DATABASE_URL, // usado pelo migrate dev
  },

  client: {
    adapter: "postgresql", // usado pelo PrismaClient
  },
});
