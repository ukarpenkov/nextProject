'use client'
export function QuoteButton(props) {
    const { text, fecthRandomQuotes } = props
    return (
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => fecthRandomQuotes()}
        >
            {text}
        </button>
    )
}
