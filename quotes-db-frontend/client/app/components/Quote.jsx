'use client'
import React from 'react'

export function Quote({ quote }) {
    const styles = {
        card: {
            width: '330px',

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
            textAlign: 'right',
        },
    }

    return (
        <div
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.rotate = '-6deg')}
            onMouseLeave={(e) => (e.currentTarget.style.rotate = '0deg')}
        >
            <div style={styles.mainContent}>
                <p style={styles.heading}>&quot;{quote.text}&quot;</p>

                <div style={styles.categories}>
                    {Array.isArray(quote.categories) && quote.categories.length > 0 ? (
                        quote.categories.map((category) => (
                            <span key={category} style={styles.categorySpan}>
                                {category}
                            </span>
                        ))
                    ) : (
                        <span style={styles.categorySpan}>—</span>
                    )}
                </div>
            </div>

            <div style={styles.footer}>— {quote.author ?? 'Unknown'}</div>
        </div>
    )
}
