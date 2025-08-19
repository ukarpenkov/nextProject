'use client'

import { useState } from 'react'
import { Quote } from '../components/Quote'

export default function Search() {
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [quotes, setQuotes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchSubmitted, setSearchSubmitted] = useState(false)

    const validateInput = (field, value) => {
        const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/
        const QUOTE_REGEX = /^[a-zA-Z0-9\s.,!?'"-]+$/
        const AUTHOR_REGEX = /^[a-zA-Z\s.,!?'"-]+$/

        if (!value) return true
        switch (field) {
            case 'quote':
                return QUOTE_REGEX.test(value)
            case 'author':
                return AUTHOR_REGEX.test(value)
            case 'category':
                return CATEGORY_NAME_REGEX.test(value)
            default:
                return true
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        setError(null)
        if (!validateInput('quote', quote)) {
            setError('Некорректное значение цитаты')
            return
        }
        if (!validateInput('author', author)) {
            setError('Некорректное значение автора')
            return
        }
        if (!validateInput('category', category)) {
            setError('Некорректное значение категории (только маленькие буквы, цифры и - )')
            return
        }

        setLoading(true)
        try {
            setSearchSubmitted(true)
            const params = new URLSearchParams()
            if (quote) params.append('quote', quote)
            if (author) params.append('author', author)
            if (category) params.append('category', category)
            const res = await fetch(`http://localhost:3000/quotes?${params.toString()}`)
            if (!res.ok) throw new Error('Ошибка запроса')
            const data = await res.json()
            setQuotes(data)
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
                    <button type="submit" className="bg-blue-500 text-white px-4 py-1 mt-2 w-50 self-center">
                        Найти
                    </button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
                {quotes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quotes.map((quote) => (
                            <Quote quote={quote} key={quote.id} />
                        ))}
                    </div>
                ) : (
                    searchSubmitted && <p className="text-gray-500">No quotes found</p>
                )}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    )
}
