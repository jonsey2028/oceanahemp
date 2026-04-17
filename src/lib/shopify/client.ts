import { createStorefrontApiClient } from "@shopify/storefront-api-client";

// Shopify Storefront API client for headless e-commerce
// Until Shopify store is set up, the app uses mock data

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || "";
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_TOKEN || "";

export const shopifyClient = storeDomain
  ? createStorefrontApiClient({
      storeDomain,
      apiVersion: "2025-01",
      publicAccessToken,
    })
  : null;

export async function shopifyQuery<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!shopifyClient) {
    throw new Error(
      "Shopify client not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN in .env.local"
    );
  }
  const { data, errors } = await shopifyClient.request(query, { variables });
  if (errors) throw new Error(errors.message);
  return data as T;
}

export function isShopifyConfigured(): boolean {
  return Boolean(storeDomain && publicAccessToken);
}
