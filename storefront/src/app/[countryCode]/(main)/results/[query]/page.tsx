import { Metadata } from "next"

import SearchResultsTemplate from "@modules/search/templates/search-results-template"

import { search } from "@modules/search/actions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { buildNoIndexMetadata } from "@lib/util/seo"

export async function generateMetadata({
  params,
}: {
  params: { query: string }
}): Promise<Metadata> {
  const decodedQuery = decodeURIComponent(params.query || "").trim()
  const safeQuery = decodedQuery.slice(0, 60)
  return {
    title: safeQuery ? `Results for "${safeQuery}"` : "Search Results",
    description: safeQuery
      ? `Browse gemstones and jewelry results for "${safeQuery}".`
      : "Explore our collection of gemstones and jewelry.",
    ...buildNoIndexMetadata(),
  }
}

type Params = {
  params: { query: string; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export default async function SearchResults({ params, searchParams }: Params) {
  const { query } = params
  const { sortBy, page } = searchParams

  const hits = await search(query).then((data) => data)

  const ids = hits
    .map((h) => h.objectID || h.id)
    .filter((id): id is string => {
      return typeof id === "string"
    })

  return (
    <SearchResultsTemplate
      query={query}
      ids={ids}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
