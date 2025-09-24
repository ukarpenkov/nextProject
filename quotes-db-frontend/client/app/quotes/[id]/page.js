'use client'

import ErrorMessage from '@/app/elements/ErrorMessage'
import { Loader } from '@/app/elements/Loader'
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

export default function QuotePage({ params }) {
    const { id } = use(params)

    const [quote, setQuote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        setLoading(true)
        setError(null)

        const base = 'http://localhost:3000' || ''

        fetch(`${base}/quotes/${id}`, { signal })
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to load (status: ${res.status})`)
                return res.json()
            })
            .then((data) => setQuote(data))
            .catch((err) => {
                if (err.name === 'AbortError') return
                setError(err.message || String(err))
                toast.error(err.message)
            })
            .finally(() => setLoading(false))

        return () => controller.abort()
    }, [id])

    const handleDelete = async () => {
        if (!id) return

        try {
            const response = await fetch(`http://localhost:3000/quotes/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                toast.success('Quote deleted successfully')
                router.push('/')
            } else {
                throw new Error('Failed to delete the quote')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error(error.message)
        }
    }

    const handleEdit = async () => {
        if (!id) return

        const newText = prompt('Enter new quote text:', quote?.text || '')
        if (!newText) return

        try {
            const response = await fetch(`http://localhost:3000/quotes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newText }),
            })

            if (response.ok) {
                const updated = await response.json()
                setQuote(updated)
                toast.success('Quote updated successfully')
            } else {
                throw new Error('Failed to update the quote')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error(error.message)
        }
    }

    if (!id) {
        return <div>Quote id is missing</div>
    }
    if (loading)
        return (
            <div>
                <Loader />
            </div>
        )
    if (error) return <ErrorMessage error={error} />
    if (!quote) return <div>No quote data</div>

    const styles = {
        card: {
            padding: '20px',
            minHeight: '500px',
            color: 'white',
            background:
                'linear-gradient(#212121, #212121) padding-box, linear-gradient(145deg, transparent 35%, #0a89a8, #252e31) border-box',
            border: '2px solid transparent',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            transformOrigin: 'top bottom',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        },
        mainContent: {
            flex: 1,
        },
        heading: {
            fontSize: '20px',
            margin: '16px 0',
            fontWeight: 600,
        },
        categories: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
        },
        categorySpan: {
            backgroundColor: '#0a89a8',
            padding: '4px 8px',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: '12px',
            borderRadius: '50em',
        },
        footer: {
            fontWeight: 600,
            color: '#717171',
            marginTop: '12px',
        },
        button: {
            marginTop: '20px',
            padding: '10px',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    }

    return (
        <div style={styles.card}>
            <div style={styles.mainContent}>
                <p style={styles.heading}>{quote.text}</p>

                <div style={styles.categories}>
                    {Array.isArray(quote.categories) && quote.categories.length > 0 ? (
                        quote.categories.map((c) => (
                            <span key={c} style={styles.categorySpan}>
                                {c}
                            </span>
                        ))
                    ) : (
                        <span style={styles.categorySpan}>—</span>
                    )}
                </div>
            </div>

            <div style={styles.footer}>
                By {quote.author ?? 'Unknown'} | Quote #{quote.id ?? id}
            </div>

            <button onClick={handleEdit} style={{ ...styles.button, backgroundColor: '#0275d8' }}>
                Edit Quote
            </button>

            <button onClick={handleDelete} style={{ ...styles.button, backgroundColor: '#d9534f' }}>
                Delete Quote
            </button>
        </div>
    )
}
