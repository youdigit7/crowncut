import { MetadataRoute } from "next"

import { getBaseURL } from "@lib/util/env"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseURL()

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*/checkout",
          "/*/cart",
          "/*/order/confirmed",
          "/*/search",
          "/*/results",
          "*?*sortBy=*",
          "*?*minPrice=*",
          "*?*maxPrice=*",
          "*?*view=*",
        ],
      },
      {
        userAgent: [
          "ChatGPT-User",
          "OAISearchBot",
          "Google-Extended",
          "PerplexityBot",
          "Perplexity-User",
          "Claude-SearchBot",
          "Claude-User",
        ],
        allow: "/",
        disallow: [
          "/*/checkout",
          "/*/cart",
          "/*/order/confirmed",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
