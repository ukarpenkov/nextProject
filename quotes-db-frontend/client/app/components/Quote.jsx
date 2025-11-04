'use client'
import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export function Quote({ quote }) {
    const searchParams = useSearchParams()
    const activeCategory = searchParams.get('category')

    const styles = {
        card: {
            width: '100%',
            padding: '20px',
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
            textDecoration: 'none',
        },
        mainContent: {
            flex: 1,
        },
        heading: {
            fontSize: '20px',
            margin: '16px 0',
            fontWeight: 600,
            fontStyle: 'italic',
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
            textAlign: 'right',
        },
    }

    return (
        <Link href={`/quotes/${quote.id}`} passHref legacyBehavior>
            <div
                style={styles.card}
                onMouseEnter={(e) => (e.currentTarget.style.rotate = '-6deg')}
                onMouseLeave={(e) => (e.currentTarget.style.rotate = '0deg')}
            >
                <div style={styles.mainContent}>
                    <p style={styles.heading}>&quot;{quote.text}&quot;</p>

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

                <div style={styles.footer}>— {quote.author ?? 'Unknown'}</div>
            </div>
        </Link>
    )
}
