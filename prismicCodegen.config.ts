import type { Config } from "prismic-ts-codegen";

const config: Config = {
  repositoryName: process.env.PRISMIC_REPOSITORY_NAME || "effective-waffle",
  output: "./types/generated/prismic.d.ts",
};

export default config;
