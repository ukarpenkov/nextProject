'use client'

import { useState } from 'react'
import { Quote } from '../components/Quote'
import { SearchInput } from '../elements/SearchInput'
import { Loader } from '../elements/Loader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
            const errorMessage = 'Некорректное значение цитаты'
            toast.error(errorMessage)
            return
        }
        if (!validateInput('author', author)) {
            setError('Некорректное значение автора')
            const errorMessage = 'Некорректное значение автора'
            toast.error(errorMessage)
            return
        }
        if (!validateInput('category', category)) {
            setError('Некорректное значение категории (только маленькие буквы, цифры и - )')
            const errorMessage = 'Некорректное значение категории (только маленькие буквы, цифры и - )'
            toast.error(errorMessage)
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

            if (!res.ok) {
                const errorMessage = 'Ошибка запроса'
                toast.error(errorMessage)
                throw new Error(errorMessage)
            }
            const data = await res.json()
            setQuotes(data)
        } catch (err) {
            setError(err.message)
            const errorMessage = 'Ошибка запроса'
            toast.error(errorMessage)
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
                        <SearchInput value={quote} setValue={setQuote} placeholder="Quote" />
                        <SearchInput value={author} setValue={setAuthor} placeholder="Author" />
                        <SearchInput value={category} setValue={setCategory} placeholder="Category" />
                    </div>
                    <div className="flex justify-center gap-3">
                        <div className="flex flex-col-3 gap-2 justify-center">
                            <button
                                style={{
                                    padding: '17px 40px',
                                    borderRadius: '10px',
                                    border: '0',
                                    backgroundColor: 'rgb(56, 86, 255)',
                                    letterSpacing: '1.5px',
                                    fontSize: '15px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: 'rgb(46, 70, 201) 0px 10px 0px 0px',
                                    color: 'hsl(0, 0%, 100%)',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.boxShadow = 'rgb(46, 70, 201) 0px 7px 0px 0px'
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.boxShadow = 'rgb(46, 70, 201) 0px 10px 0px 0px'
                                }}
                                onMouseDown={(e) => {
                                    e.target.style.backgroundColor = 'rgb(56, 86, 255)'
                                    e.target.style.boxShadow = 'rgb(46, 70, 201) 0px 0px 0px 0px'
                                    e.target.style.transform = 'translateY(5px)'
                                    e.target.style.transition = '200ms'
                                }}
                                onMouseUp={(e) => {
                                    e.target.style.backgroundColor = 'rgb(56, 86, 255)'
                                    e.target.style.boxShadow = 'rgb(46, 70, 201) 0px 7px 0px 0px'
                                    e.target.style.transform = 'translateY(0)'
                                    e.target.style.transition = 'all 0.3s ease'
                                }}
                            >
                                Найти
                            </button>
                        </div>
                    </div>
                </form>
                <div className="flex flex-col-3 gap-2 justify-center mt-4">
                    <button
                        onClick={() => {
                            setQuote('')
                            setAuthor('')
                            setCategory('')
                            setQuotes([])
                            setError(null)
                            setSearchSubmitted(false)
                        }}
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
                        Очистить
                    </button>
                </div>
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
            {loading && <Loader />}
        </div>
    )
}
