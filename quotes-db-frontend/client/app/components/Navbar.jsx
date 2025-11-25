'use client'
import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', height: '60px', background: '#f5f5f5' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Link href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    <img src="/quote-svgrepo-com.svg" alt="Logo" style={{ height: '40px', marginRight: '1rem' }} />
                </Link>
            </div>
            <button
                onClick={toggleMenu}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    display: 'block',
                }}
                aria-label="Toggle menu"
            >
                ☰
            </button>
            <div
                style={{
                    display: isMenuOpen ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: '1rem',
                    position: 'absolute',
                    top: '60px',
                    right: '1rem',
                    background: '#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                    borderRadius: '8px',
                }}
            >
                <Link href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    Random
                </Link>
                <Link href="/search" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    Search
                </Link>
                <Link href="/create" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    Create new quote
                </Link>
            </div>
            <div style={{ display: 'none', gap: '1rem' }} className="desktop-menu">
                <Link href="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    Random
                </Link>
                <Link href="/search" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    Search
                </Link>
                <Link href="/create" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    Create new quote
                </Link>
            </div>
            <style jsx>{`
                @media (min-width: 768px) {
                    .desktop-menu {
                        display: flex !important;
                    }
                    button {
                        display: none !important;
                    }
                    div[style*='position: absolute'] {
                        display: none !important;
                    }
                }
            `}</style>
        </nav>
    )
}
