import Link from 'next/link'

export function Navbar() {
    return (
        <nav style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', height: '60px', background: '#f5f5f5' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <img src="/next.svg" alt="Logo" style={{ height: '40px', marginRight: '1rem' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/random" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    Random
                </Link>
                <Link href="/search" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    Search
                </Link>
            </div>
        </nav>
    )
}
