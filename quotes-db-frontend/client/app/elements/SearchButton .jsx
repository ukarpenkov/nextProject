'use client'
const SearchButton = ({ children, color = 'rgb(56, 86, 255)', shadow = 'rgb(46, 70, 201)', onClick }) => {
    const baseStyle = {
        padding: '17px 40px',
        borderRadius: '10px',
        border: '0',
        backgroundColor: color,
        letterSpacing: '1.5px',
        fontSize: '15px',
        transition: 'all 0.3s ease',
        boxShadow: `${shadow} 0px 10px 0px 0px`,
        color: 'hsl(0, 0%, 100%)',
        cursor: 'pointer',
    }

    const handleMouseEnter = (e) => {
        e.target.style.boxShadow = `${shadow} 0px 7px 0px 0px`
    }

    const handleMouseLeave = (e) => {
        e.target.style.boxShadow = `${shadow} 0px 10px 0px 0px`
    }

    const handleMouseDown = (e) => {
        e.target.style.backgroundColor = color
        e.target.style.boxShadow = `${shadow} 0px 0px 0px 0px`
        e.target.style.transform = 'translateY(5px)'
        e.target.style.transition = '200ms'
    }

    const handleMouseUp = (e) => {
        e.target.style.backgroundColor = color
        e.target.style.boxShadow = `${shadow} 0px 7px 0px 0px`
        e.target.style.transform = 'translateY(0)'
        e.target.style.transition = 'all 0.3s ease'
    }

    return (
        <button
            style={baseStyle}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {children}
        </button>
    )
}

export default SearchButton
