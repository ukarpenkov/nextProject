'use client'

export default function FormField({ id, label, value, onChange, error, required = false, type = 'text', textarea = false, styles }) {
    return (
        <div style={styles.formGroup}>
            <label htmlFor={id} style={styles.label}>
                {label}
            </label>

            {textarea ? (
                <textarea id={id} value={value} onChange={onChange} required={required} style={styles.textarea} />
            ) : (
                <input id={id} type={type} value={value} onChange={onChange} required={required} style={styles.input} />
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
