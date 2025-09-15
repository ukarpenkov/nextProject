import React from 'react'
import ErrorSvg from './ErrorIcon'

const errorStyle = {
    color: '#fff',
    background: 'linear-gradient(90deg, #ff4d4f, #ff7875)',
    padding: '20px',
    borderRadius: '10px',
    fontSize: '25px',
    fontWeight: 600,
    color: 'black',
    textAlign: 'center',
    margin: '12px 0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

function ErrorMessage({ error }) {
    if (!error) return null
    return (
        <div style={errorStyle}>
            <h1> Failed to load quote: {error}</h1>
            <div>
                <ErrorSvg />
            </div>
        </div>
    )
}

export default ErrorMessage
