'use client'
import { useEffect, useState } from 'react'
import { Quote } from './components/Quote'
import { QuoteButton } from './components/QuoteButton'

export default function Home() {
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        fecthRandomQuotes()
    }, [])
    function fecthRandomQuotes() {
        return fetch('http://localhost:3000/quotes/random?limit=10')
            .then((response) => response.json())
            .then((data) => setQuotes(data))
            .catch((error) => console.error('Error fetching quotes:', error))
    }
    return (
        <div className="p-4">
            <div className="text-center mb-6">
                <QuoteButton text="Fetch Random Quotes" fecthRandomQuotes={fecthRandomQuotes} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quotes.map((quote) => (
                    <Quote quote={quote} key={quote.id} />
                ))}
            </div>
        </div>
    )
}
