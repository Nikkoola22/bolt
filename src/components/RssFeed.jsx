"use client"

import { useEffect, useMemo, useState } from "react"

function formatDate(d) {
  if (!d) return ""
  try {
    return new Date(d).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
  } catch {
    return d
  }
}

export default function RssFeed({
  apiPath = "/api/rss",
  feedUrl,
  limit = 10,
  className = "",
  showHeader = true,
  displayMode = "default", // Added displayMode prop for ticker support
}) {
  const [data, setData] = useState(null)
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(true)

  const qs = useMemo(() => {
    const p = new URLSearchParams()
    if (feedUrl) p.set("url", feedUrl)
    return p.toString()
  }, [feedUrl])

  useEffect(() => {
    let alive = true
    const run = async () => {
      setLoading(true)
      setErr("")
      try {
        const res = await fetch(`${apiPath}${qs ? `?${qs}` : ""}`)
        if (!res.ok) throw new Error("HTTP " + res.status)
        const json = await res.json()
        if (alive) setData(json)
      } catch (e) {
        if (alive) setErr("Impossible de charger le flux (proxy/whitelist).")
      } finally {
        if (alive) setLoading(false)
      }
    }
    run()
    return () => {
      alive = false
    }
  }, [apiPath, qs])

  if (loading)
    return (
      <div role="status" aria-live="polite">
        Chargement du flux…
      </div>
    )
  if (err)
    return (
      <div role="alert" style={{ color: "#b00020" }}>
        {err}
      </div>
    )
  if (!data) return null

  const items = (data.items || []).slice(0, limit)

  if (displayMode === "simple") {
    return (
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...items, ...items].map((item, index) => (
          <a
            key={`${item.guid || item.link || index}-${index}`}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="text-lg font-medium mx-8 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted"
          >
            • {item.title}
          </a>
        ))}
      </div>
    )
  }

  if (displayMode === "ticker") {
    return (
      <>
        {[...items, ...items].map((item, index) => (
          <a
            key={`${item.guid || item.link || index}-${index}`}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="text-lg font-medium mx-8 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted"
          >
            • {item.title}
          </a>
        ))}
      </>
    )
  }

  return (
    <section className={className} aria-label="Lecteur RSS">
      {showHeader && (
        <header style={{ marginBottom: 8 }}>
          <h2 style={{ margin: 0, color: "#1950a3" }}>{data.title || "Flux RSS"}</h2>
          {data.description && <p style={{ margin: "4px 0", color: "#666" }}>{data.description}</p>}
        </header>
      )}

      {items.length === 0 && <div>Aucun article.</div>}

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, idx) => (
          <li key={item.guid || item.link || idx} style={{ padding: "12px 0", borderBottom: "1px solid #e6e6e6" }}>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              style={{ fontWeight: 650, color: "#1950a3", textDecoration: "none" }}
            >
              {item.title}
            </a>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              {formatDate(item.pubDate)} {item.author ? `• ${item.author}` : ""}
            </div>
            {item.contentSnippet && <p style={{ marginTop: 8, color: "#111" }}>{item.contentSnippet}</p>}
            {item.categories && item.categories.length > 0 && (
              <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {item.categories.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#f2f6ff",
                      color: "#1950a3",
                      padding: "2px 6px",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
