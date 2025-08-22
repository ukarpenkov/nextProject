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
                <form onSubmit={handleSearch} className="grid">
                    <div className="mb-4 flex flex-col-3 gap-2 justify-center">
                        <div
                            style={{
                                fontFamily: "'Segoe UI', sans-serif",
                                margin: '1em 0',
                                maxWidth: '190px',
                                position: 'relative',
                            }}
                        >
                            <input
                                type="text"
                                value={quote}
                                autoComplete="off"
                                style={{
                                    fontSize: '100%',
                                    padding: '0.8em',
                                    outline: 'none',
                                    border: '2px solid rgb(200, 200, 200)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '20px',
                                    width: '100%',
                                }}
                                onFocus={(e) => {
                                    const label = e.target.nextElementSibling
                                    label.style.transform = 'translateY(-50%) scale(.9)'
                                    label.style.margin = '0em'
                                    label.style.marginLeft = '1.3em'
                                    label.style.padding = '0.4em'
                                    label.style.backgroundColor = '#fff'
                                    e.target.style.borderColor = 'rgb(150, 150, 200)'
                                }}
                                onBlur={(e) => {
                                    const label = e.target.nextElementSibling
                                    if (!e.target.value) {
                                        label.style.transform = 'none'
                                        label.style.margin = ''
                                        label.style.marginLeft = '0.5em'
                                        label.style.padding = '0.8em'
                                        label.style.backgroundColor = 'transparent'
                                        e.target.style.borderColor = 'rgb(200, 200, 200)'
                                    }
                                }}
                                onChange={(e) => {
                                    const label = e.target.nextElementSibling
                                    if (e.target.value) {
                                        setQuote(e.target.value)
                                        label.style.transform = 'translateY(-50%) scale(.9)'
                                        label.style.margin = '0em'
                                        label.style.marginLeft = '1.3em'
                                        label.style.padding = '0.4em'
                                        label.style.backgroundColor = '#fff'
                                        e.target.style.borderColor = 'rgb(150, 150, 200)'
                                    } else {
                                        label.style.transform = 'none'
                                        label.style.margin = ''
                                        label.style.marginLeft = '0.5em'
                                        label.style.padding = '0.8em'
                                        label.style.backgroundColor = 'transparent'
                                        e.target.style.borderColor = 'rgb(200, 200, 200)'
                                    }
                                }}
                            />
                            <label
                                htmlFor="Quote"
                                style={{
                                    fontSize: '100%',
                                    position: 'absolute',
                                    left: '0',
                                    padding: '0.8em',
                                    marginLeft: '0.5em',
                                    pointerEvents: 'none',
                                    transition: 'all 0.3s ease',
                                    color: 'rgb(100, 100, 100)',
                                }}
                            >
                                Quote
                            </label>
                        </div>
                        <div
                            style={{
                                fontFamily: "'Segoe UI', sans-serif",
                                margin: '1em 0',
                                maxWidth: '190px',
                                position: 'relative',
                            }}
                        >
                            <input
                                type="text"
                                value={author}
                                autoComplete="off"
                                style={{
                                    fontSize: '100%',
                                    padding: '0.8em',
                                    outline: 'none',
                                    border: '2px solid rgb(200, 200, 200)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '20px',
                                    width: '100%',
                                }}
                                onFocus={(e) => {
                                    const label = e.target.nextElementSibling
                                    label.style.transform = 'translateY(-50%) scale(.9)'
                                    label.style.margin = '0em'
                                    label.style.marginLeft = '1.3em'
                                    label.style.padding = '0.4em'
                                    label.style.backgroundColor = '#fff'
                                    e.target.style.borderColor = 'rgb(150, 150, 200)'
                                }}
                                onBlur={(e) => {
                                    const label = e.target.nextElementSibling
                                    if (!e.target.value) {
                                        label.style.transform = 'none'
                                        label.style.margin = ''
                                        label.style.marginLeft = '0.5em'
                                        label.style.padding = '0.8em'
                                        label.style.backgroundColor = 'transparent'
                                        e.target.style.borderColor = 'rgb(200, 200, 200)'
                                    }
                                }}
                                onChange={(e) => {
                                    const label = e.target.nextElementSibling
                                    if (e.target.value) {
                                        setAuthor(e.target.value)
                                        label.style.transform = 'translateY(-50%) scale(.9)'
                                        label.style.margin = '0em'
                                        label.style.marginLeft = '1.3em'
                                        label.style.padding = '0.4em'
                                        label.style.backgroundColor = '#fff'
                                        e.target.style.borderColor = 'rgb(150, 150, 200)'
                                    } else {
                                        label.style.transform = 'none'
                                        label.style.margin = ''
                                        label.style.marginLeft = '0.5em'
                                        label.style.padding = '0.8em'
                                        label.style.backgroundColor = 'transparent'
                                        e.target.style.borderColor = 'rgb(200, 200, 200)'
                                    }
                                }}
                            />
                            <label
                                htmlFor="Author"
                                style={{
                                    fontSize: '100%',
                                    position: 'absolute',
                                    left: '0',
                                    padding: '0.8em',
                                    marginLeft: '0.5em',
                                    pointerEvents: 'none',
                                    transition: 'all 0.3s ease',
                                    color: 'rgb(100, 100, 100)',
                                }}
                            >
                                Author
                            </label>
                        </div>
                        <div
                            style={{
                                fontFamily: "'Segoe UI', sans-serif",
                                margin: '1em 0',
                                maxWidth: '190px',
                                position: 'relative',
                            }}
                        >
                            <input
                                type="text"
                                value={category}
                                autoComplete="off"
                                style={{
                                    fontSize: '100%',
                                    padding: '0.8em',
                                    outline: 'none',
                                    border: '2px solid rgb(200, 200, 200)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '20px',
                                    width: '100%',
                                }}
                                onFocus={(e) => {
                                    const label = e.target.nextElementSibling
                                    label.style.transform = 'translateY(-50%) scale(.9)'
                                    label.style.margin = '0em'
                                    label.style.marginLeft = '1.3em'
                                    label.style.padding = '0.4em'
                                    label.style.backgroundColor = '#fff'
                                    e.target.style.borderColor = 'rgb(150, 150, 200)'
                                }}
                                onBlur={(e) => {
                                    const label = e.target.nextElementSibling
                                    if (!e.target.value) {
                                        label.style.transform = 'none'
                                        label.style.margin = ''
                                        label.style.marginLeft = '0.5em'
                                        label.style.padding = '0.8em'
                                        label.style.backgroundColor = 'transparent'
                                        e.target.style.borderColor = 'rgb(200, 200, 200)'
                                    }
                                }}
                                onChange={(e) => {
                                    const label = e.target.nextElementSibling
                                    if (e.target.value) {
                                        setCategory(e.target.value)
                                        label.style.transform = 'translateY(-50%) scale(.9)'
                                        label.style.margin = '0em'
                                        label.style.marginLeft = '1.3em'
                                        label.style.padding = '0.4em'
                                        label.style.backgroundColor = '#fff'
                                        e.target.style.borderColor = 'rgb(150, 150, 200)'
                                    } else {
                                        label.style.transform = 'none'
                                        label.style.margin = ''
                                        label.style.marginLeft = '0.5em'
                                        label.style.padding = '0.8em'
                                        label.style.backgroundColor = 'transparent'
                                        e.target.style.borderColor = 'rgb(200, 200, 200)'
                                    }
                                }}
                            />
                            <label
                                htmlFor="Author"
                                style={{
                                    fontSize: '100%',
                                    position: 'absolute',
                                    left: '0',
                                    padding: '0.8em',
                                    marginLeft: '0.5em',
                                    pointerEvents: 'none',
                                    transition: 'all 0.3s ease',
                                    color: 'rgb(100, 100, 100)',
                                }}
                            >
                                Category
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col-3 gap-2 justify-center">
                        <button
                            style={{
                                padding: '17px 40px',
                                borderRadius: '10px',
                                border: '0',
                                backgroundColor: 'rgb(255, 56, 86)',
                                letterSpacing: '1.5px',
                                fontSize: '15px',
                                transition: 'all 0.3s ease',
                                boxShadow: 'rgb(201, 46, 70) 0px 10px 0px 0px',
                                color: 'hsl(0, 0%, 100%)',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.boxShadow = 'rgb(201, 46, 70) 0px 7px 0px 0px'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.boxShadow = 'rgb(201, 46, 70) 0px 10px 0px 0px'
                            }}
                            onMouseDown={(e) => {
                                e.target.style.backgroundColor = 'rgb(255, 56, 86)'
                                e.target.style.boxShadow = 'rgb(201, 46, 70) 0px 0px 0px 0px'
                                e.target.style.transform = 'translateY(5px)'
                                e.target.style.transition = '200ms'
                            }}
                            onMouseUp={(e) => {
                                e.target.style.backgroundColor = 'rgb(255, 56, 86)'
                                e.target.style.boxShadow = 'rgb(201, 46, 70) 0px 7px 0px 0px'
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.transition = 'all 0.3s ease'
                            }}
                        >
                            Найти
                        </button>
                    </div>
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
