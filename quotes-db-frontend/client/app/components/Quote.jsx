export function Quote({ quote }) {
    return (
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
    )
}
