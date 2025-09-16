'use client'

import { useState, useEffect } from 'react'
import { Quote } from '../components/Quote'
import { SearchInput } from '../elements/SearchInput'
import { Loader } from '../elements/Loader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SearchButton from '../elements/SearchButton '
import { useRouter } from 'next/navigation'

export default function Search() {
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [quotes, setQuotes] = useState([])
    const [limit, setLimit] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchSubmitted, setSearchSubmitted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const initialQuote = params.get('quote') || ''
        const initialAuthor = params.get('author') || ''
        const initialCategory = params.get('category') || ''
        const initialLimit = params.get('limit') || ''

        setQuote(initialQuote)
        setAuthor(initialAuthor)
        setCategory(initialCategory)
        setLimit(initialLimit)

        if (initialQuote || initialAuthor || initialCategory || initialLimit) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const res = await fetch(`http://localhost:3000/quotes?${params.toString()}`)
                    if (!res.ok) {
                        throw new Error('Failed to fetch quotes')
                    }
                    const data = await res.json()
                    setQuotes(data)
                } catch (err) {
                    setError(err.message)
                } finally {
                    setLoading(false)
                }
            }
            fetchData()
        }
    }, [])

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
            if (limit) params.append('limit', limit)

            router.push(`/search?${params.toString()}`)

            const res = await fetch(`http://localhost:3000/quotes?${params.toString()}`)

            if (!res.ok) {
                const errorData = await res.json()
                if (errorData.errors && Array.isArray(errorData.errors)) {
                    errorData.errors.forEach((err) => {
                        if (err && err.msg && err.path) {
                            toast.error(`${err.msg} (Path: ${err.path})`)
                        } else {
                            toast.error('An unknown error occurred')
                        }
                    })
                } else {
                    toast.error('An unknown error occurred')
                }
                throw new Error('Server responded with an error')
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

    const handleClear = () => {
        setQuote('')
        setAuthor('')
        setCategory('')
        setLimit()
        setQuotes([])
        setError(null)
        setSearchSubmitted(false)

        router.push('/search')
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
                        <SearchInput value={limit} setValue={setLimit} placeholder="Limit" />
                    </div>
                    <div className="flex justify-center gap-3">
                        <div className="flex flex-col-3 gap-2 justify-center">
                            <SearchButton>Найти</SearchButton>
                        </div>
                    </div>
                </form>
                <div className="flex flex-col-3 gap-2 justify-center mt-4">
                    <SearchButton color="rgb(255, 56, 86)" shadow="rgb(201, 46, 70)" onClick={handleClear}>
                        Очистить
                    </SearchButton>
                </div>
                {quotes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
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
