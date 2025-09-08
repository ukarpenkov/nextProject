'use client'

import React, { useEffect, useState } from 'react'

export default function QuotePage({ params }) {
    const id = params?.id

    const [quote, setQuote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        setLoading(true)
        setError(null)

        const base = process.env.NEXT_PUBLIC_API_BASE || ''

        fetch(`${base}/quotes/${id}`, { signal })
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to load (status: ${res.status})`)
                return res.json()
            })
            .then((data) => setQuote(data))
            .catch((err) => {
                if (err.name === 'AbortError') return
                setError(err.message || String(err))
            })
            .finally(() => setLoading(false))

        return () => controller.abort()
    }, [id])
    if (!id) {
        return <div>Quote id is missing</div>
    }
    if (loading) return <div>Loading quote...</div>
    if (error) return <div>Failed to load quote: {error}</div>
    if (!quote) return <div>No quote data</div>

    return (
        <div style={{ padding: 16 }}>
            <h1>Quote #{quote.id ?? id}</h1>

            <blockquote style={{ fontSize: 18, margin: '12px 0', borderLeft: '4px solid #ddd', paddingLeft: 12 }}>{quote.text}</blockquote>

            <p>
                <strong>Author:</strong> {quote.author ?? 'Unknown'}
            </p>

            <div>
                <strong>Categories:</strong>
                {Array.isArray(quote.categories) && quote.categories.length > 0 ? (
                    <ul>
                        {quote.categories.map((c) => (
                            <li key={c}>{c}</li>
                        ))}
                    </ul>
                ) : (
                    <div>—</div>
                )}
            </div>

            <h3>Raw JSON</h3>
            <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6, overflow: 'auto' }}>{JSON.stringify(quote, null, 2)}</pre>
        </div>
    )
}
