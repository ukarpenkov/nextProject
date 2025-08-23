'use client'
export function SearchInput({ value, setValue, placeholder }) {
    return (
        <div
            style={{
                fontFamily: "'Segoe UI', sans-serif",
                margin: '1em 0',
                maxWidth: '190px',
                position: 'relative',
            }}
        >
            <input
                type="text"
                value={value}
                autoComplete="off"
                style={{
                    fontSize: '100%',
                    padding: '0.8em',
                    outline: 'none',
                    border: '2px solid rgb(200, 200, 200)',
                    backgroundColor: 'transparent',
                    borderRadius: '20px',
                    width: '100%',
                }}
                onFocus={(e) => {
                    const label = e.target.nextElementSibling
                    label.style.transform = 'translateY(-50%) scale(.9)'
                    label.style.margin = '0em'
                    label.style.marginLeft = '1.3em'
                    label.style.padding = '0.4em'
                    label.style.backgroundColor = '#fff'
                    e.target.style.borderColor = 'rgb(150, 150, 200)'
                }}
                onBlur={(e) => {
                    const label = e.target.nextElementSibling
                    if (!e.target.value) {
                        label.style.transform = 'none'
                        label.style.margin = ''
                        label.style.marginLeft = '0.5em'
                        label.style.padding = '0.8em'
                        label.style.backgroundColor = 'transparent'
                        e.target.style.borderColor = 'rgb(200, 200, 200)'
                    }
                }}
                onChange={(e) => {
                    const label = e.target.nextElementSibling
                    if (e.target.value) {
                        setValue(e.target.value)
                        label.style.transform = 'translateY(-50%) scale(.9)'
                        label.style.margin = '0em'
                        label.style.marginLeft = '1.3em'
                        label.style.padding = '0.4em'
                        label.style.backgroundColor = '#fff'
                        e.target.style.borderColor = 'rgb(150, 150, 200)'
                    } else {
                        setValue(e.target.value)
                        label.style.transform = 'none'
                        label.style.margin = ''
                        label.style.marginLeft = '0.5em'
                        label.style.padding = '0.8em'
                        label.style.backgroundColor = 'transparent'
                        e.target.style.borderColor = 'rgb(200, 200, 200)'
                    }
                }}
            />
            <label
                htmlFor="Quote"
                style={{
                    fontSize: '100%',
                    position: 'absolute',
                    left: '0',
                    padding: '0.8em',
                    marginLeft: '0.5em',
                    pointerEvents: 'none',
                    transition: 'all 0.3s ease',
                    color: 'rgb(100, 100, 100)',
                }}
            >
                {placeholder}
            </label>
        </div>
    )
}
