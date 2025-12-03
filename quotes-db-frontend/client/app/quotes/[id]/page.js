'use client'
import ErrorMessage from '@/app/elements/ErrorMessage'
import { Loader } from '@/app/elements/Loader'
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import SearchButton from '@/app/elements/SearchButton '

export default function QuotePage({ params }) {
    const { id } = use(params)
    const [quote, setQuote] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState({ text: '', author: '', categories: '' })
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeCategory = searchParams.get('category')

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

    const openEditModal = () => {
        setForm({
            text: quote?.text || '',
            author: quote?.author || '',
            categories: (quote?.categories || []).join(', '),
        })
        setIsEditing(true)
    }

    const validateInput = (field, value) => {
        const CATEGORY_NAME_REGEX = /^[a-z\-\,\s]+$/
        const QUOTE_REGEX = /^[\s\S]{2,}$/
        const AUTHOR_REGEX = /^[a-zA-Z\s\-,]+$/

        if (!value) return false

        switch (field) {
            case 'text':
                return QUOTE_REGEX.test(value)
            case 'author':
                return AUTHOR_REGEX.test(value)
            case 'categories':
                return CATEGORY_NAME_REGEX.test(value)
            default:
                return false
        }
    }

    const handleEditSubmit = async () => {
        setError(null)

        if (!validateInput('text', form.text)) {
            toast.error('Invalid quote text')
            return
        }
        if (!validateInput('author', form.author)) {
            toast.error('Invalid author name')
            return
        }
        if (!validateInput('categories', form.categories)) {
            toast.error('Invalid categories (only lowercase letters, numbers, and dashes are allowed)')
            return
        }

        try {
            const payload = {
                text: form.text.trim(),
                author: form.author.trim() || null,
                categories: form.categories
                    ? form.categories
                          .split(',')
                          .map((c) => c.trim())
                          .filter(Boolean)
                    : [],
            }

            const response = await fetch(`http://localhost:3000/quotes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                const updated = await response.json()
                setQuote(updated)
                toast.success('Quote updated successfully')
                setIsEditing(false)
            } else {
                const errorData = await response.json()
                console.error('Error details:', errorData)
                throw new Error('Failed to update the quote')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error(error.message)
        }
    }

    if (!id) return <div>Quote id is missing</div>
    if (loading) return <Loader />
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
            transformOrigin: 'top bottom',
            transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
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
            marginTop: '12px',
        },
        categorySpan: (isActive) => ({
            backgroundColor: isActive ? 'yellow' : '#0a89a8',
            color: isActive ? 'black' : 'white',
            padding: '4px 8px',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: '12px',
            borderRadius: '50em',
            textDecoration: 'none',
        }),
        footer: {
            fontWeight: 600,
            color: '#717171',
            marginTop: '12px',
        },
    }

    return (
        <div style={styles.card}>
            <div style={styles.mainContent}>
                <p style={styles.heading}>{quote.text}</p>

                <div style={styles.categories}>
                    {Array.isArray(quote.categories) && quote.categories.length > 0 ? (
                        quote.categories.map((category) => {
                            const isActive = activeCategory === category
                            return (
                                <Link
                                    key={category}
                                    href={`/search?category=${encodeURIComponent(category)}`}
                                    style={styles.categorySpan(isActive)}
                                >
                                    {category}
                                </Link>
                            )
                        })
                    ) : (
                        <span style={styles.categorySpan(false)}>—</span>
                    )}
                </div>
            </div>

            <div style={styles.footer}>
                By{' '}
                {quote.author ? (
                    <Link href={`/search?author=${encodeURIComponent(quote.author)}`} style={{ color: '#0a89a8', textDecoration: 'none' }}>
                        {quote.author}
                    </Link>
                ) : (
                    'Unknown'
                )}{' '}
                | Quote #{quote.id ?? id}
            </div>

            <div className="mt-4 flex gap-4 justify-end">
                <SearchButton onClick={openEditModal} color="#0275d8" shadow="#025aa5">
                    Edit Quote
                </SearchButton>

                <SearchButton onClick={handleDelete} color="#d9534f" shadow="#b52b27">
                    Delete Quote
                </SearchButton>
            </div>

            {isEditing && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            background: '#1f1f1f',
                            padding: '20px',
                            borderRadius: '10px',
                            minWidth: '400px',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        <h2>Edit Quote</h2>
                        <textarea
                            style={{
                                padding: '8px',
                                borderRadius: '5px',
                                border: '1px solid #444',
                                background: '#2a2a2a',
                                color: 'white',
                                height: '150px',
                            }}
                            value={form.text}
                            onChange={(e) => setForm({ ...form, text: e.target.value })}
                            placeholder="Quote text"
                        />
                        <input
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #444', background: '#2a2a2a', color: 'white' }}
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            placeholder="Author name"
                        />
                        <input
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #444', background: '#2a2a2a', color: 'white' }}
                            value={form.categories}
                            onChange={(e) => setForm({ ...form, categories: e.target.value })}
                            placeholder="Categories (comma separated)"
                        />

                        <div className="flex justify-end gap-3 mt-3">
                            <SearchButton onClick={() => setIsEditing(false)} color="#6c757d" shadow="#545b62">
                                Cancel
                            </SearchButton>
                            <SearchButton onClick={handleEditSubmit} color="#5cb85c" shadow="#449d44">
                                OK
                            </SearchButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
