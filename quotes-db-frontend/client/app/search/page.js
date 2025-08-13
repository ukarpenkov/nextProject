'use client'

import { useState } from 'react'

export default function Search() {
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const params = new URLSearchParams()
            if (quote) params.append('quote', quote)
            if (author) params.append('author', author)
            if (category) params.append('category', category)
            const res = await fetch(`http://localhost:3000//quotes?${params.toString()}`)
            if (!res.ok) throw new Error('Ошибка запроса')
            const data = await res.json()
            setResults(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Search Quotes</h1>
            <div className=" flex flex-col gap-2 ">
                <form onSubmit={handleSearch} className="mb-4 flex flex-col-3 gap-2 justify-center">
                    <input
                        type="text"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="Quote"
                        className="border px-2 py-1 rounded"
                    />
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Author"
                        className="border px-2 py-1 rounded"
                    />
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                        className="border px-2 py-1 rounded"
                    />
                </form>
                <button type="submit" className="bg-blue-500 text-white px-4 py-1 mt-2 w-50 self-center">
                    Найти
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {results.map((item, idx) => (
                    <li key={idx} className="border-b py-2">
                        <div>
                            <strong>Quote:</strong> {item.quote}
                        </div>
                        <div>
                            <strong>Author:</strong> {item.author}
                        </div>
                        <div>
                            <strong>Category:</strong> {item.category}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
