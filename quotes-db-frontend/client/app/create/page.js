'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function CreateNewQuotePage() {
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [categories, setCategories] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const quoteData = {
            text,
            author,
            categories: categories.split(',').map((cat) => cat.trim()),
        }

        try {
            const response = await fetch('http://localhost:3000/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quoteData),
            })

            if (response.ok) {
                const result = await response.json()
                router.push(`http://localhost:5000/quotes/${result.id}`)
            } else {
                console.error('Failed to create quote')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
            fontFamily: 'Arial, sans-serif',
        },
        card: {
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '500px',
        },
        heading: {
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#333',
        },
        formGroup: {
            marginBottom: '1.2rem',
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#444',
        },
        input: {
            padding: '0.7rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            outline: 'none',
            fontSize: '1rem',
            transition: 'border-color 0.2s ease',
        },
        textarea: {
            padding: '0.7rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            outline: 'none',
            fontSize: '1rem',
            transition: 'border-color 0.2s ease',
            resize: 'vertical',
            minHeight: '6rem',
        },
        button: {
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.8rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
        },
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Create New Quote</h1>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="text" style={styles.label}>
                            Quote Text:
                        </label>
                        <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} required style={styles.textarea} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="author" style={styles.label}>
                            Author:
                        </label>
                        <input
                            id="author"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="categories" style={styles.label}>
                            Categories (comma-separated):
                        </label>
                        <input
                            id="categories"
                            type="text"
                            value={categories}
                            onChange={(e) => setCategories(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateNewQuotePage
