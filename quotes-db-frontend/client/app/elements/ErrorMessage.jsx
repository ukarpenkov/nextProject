import React from 'react'

const errorStyle = {
    color: '#ff4d4f',
    backgroundColor: '#1a1a1a',
    padding: '10px 15px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    textAlign: 'center',
    margin: '10px 0',
}

function ErrorMessage({ error }) {
    if (!error) return null
    return <div style={errorStyle}>Failed to load quote: {error}</div>
}

export default ErrorMessage
