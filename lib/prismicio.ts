import { createClient as baseCreateClient, type ClientConfig } from "@prismicio/client";

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || "";

export function createClient(config: ClientConfig = {}) {
  const client = baseCreateClient(repositoryName, {
    fetchOptions: {
      next: { tags: ["prismic"] },
    },
    ...config,
  });

  return client;
}
