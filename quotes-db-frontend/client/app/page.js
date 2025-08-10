'use client'
import { useEffect, useState } from 'react'

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
            <h1 className="text-center text-3xl mb-6">Quotes frontend app</h1>
            <div className="text-center mb-6">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => fecthRandomQuotes()}
                >
                    Get randon quotes
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quotes.map((quote) => (
                    <div key={quote.id} className="bg-white p-4 shadow-md rounded-lg">
                        <p className="mb-4 text-xl italic">&quot;{quote.text}&quot;</p>
                        <p className="mb-10 text-right font-semibold">— {quote.author}</p>
                        <div className="flex flex-wrap mt-2">
                            {quote.categories.map((category) => (
                                <span key={category} className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2">
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
