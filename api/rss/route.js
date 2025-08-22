const FRANCEINFO_POLITIQUE = "https://www.franceinfo.fr/politique.rss"
const DEFAULT_FEED_URL = FRANCEINFO_POLITIQUE

// Whitelist stricte pour éviter SSRF
const WHITELIST = new Set([FRANCEINFO_POLITIQUE])

// Simple in-memory cache for Edge Runtime
const cache = new Map()
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

function isAllowed(url) {
  try {
    const u = new URL(url)
    const normalized = `${u.protocol}//${u.host}${u.pathname}${u.search ? "?" + u.searchParams.toString() : ""}`
    return WHITELIST.has(normalized) || WHITELIST.has(`${u.protocol}//${u.host}${u.pathname}`)
  } catch {
    return false
  }
}

function parseRSS(xmlText) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, "text/xml")

  const channel = doc.querySelector("channel")
  if (!channel) throw new Error("Invalid RSS format")

  const title = channel.querySelector("title")?.textContent || ""
  const link = channel.querySelector("link")?.textContent || ""
  const description = channel.querySelector("description")?.textContent || ""

  const items = Array.from(channel.querySelectorAll("item"))
    .slice(0, 25)
    .map((item) => {
      const categories = Array.from(item.querySelectorAll("category")).map((cat) => cat.textContent)

      return {
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        pubDate: item.querySelector("pubDate")?.textContent || null,
        contentSnippet:
          item
            .querySelector("description")
            ?.textContent?.replace(/<[^>]*>/g, "")
            .substring(0, 200) || "",
        categories,
        author: item.querySelector("author")?.textContent || item.querySelector("dc\\:creator")?.textContent || "",
        guid: item.querySelector("guid")?.textContent || item.querySelector("link")?.textContent || "",
      }
    })

  return { title, link, description, items }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const feedUrl = searchParams.get("url") || searchParams.get("feed") || DEFAULT_FEED_URL

    if (!isAllowed(feedUrl)) {
      return Response.json(
        { error: "URL de flux non autorisée (whitelist). Contactez l'admin pour l'ajouter." },
        { status: 400 },
      )
    }

    const cached = cache.get(feedUrl)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return Response.json(cached.data, {
        headers: { "Cache-Control": "public, max-age=120" },
      })
    }

    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSS Reader)",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const xmlText = await response.text()
    const feed = parseRSS(xmlText)

    const data = {
      ...feed,
      fetchedAt: new Date().toISOString(),
    }

    cache.set(feedUrl, { data, timestamp: Date.now() })

    return Response.json(data, {
      headers: { "Cache-Control": "public, max-age=120" },
    })
  } catch (e) {
    console.error("RSS error:", e?.message || e)
    return Response.json({ error: "Erreur lors du chargement du flux RSS" }, { status: 500 })
  }
}

export const runtime = "edge"
