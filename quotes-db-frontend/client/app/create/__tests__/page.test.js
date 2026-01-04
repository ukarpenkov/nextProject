import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import CreateNewQuotePage from '../page'

const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))

describe('CreateNewQuotePage URL formation', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockPush.mockClear()
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: 123 }),
        })
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('builds correct redirect URL after successful creation', async () => {
        render(<CreateNewQuotePage />)

        fireEvent.change(screen.getByLabelText('Quote Text:'), {
            target: { value: 'This is a valid quote text.' },
        })
        fireEvent.change(screen.getByLabelText('Author:'), {
            target: { value: 'John Doe' },
        })
        fireEvent.change(screen.getByLabelText('Categories (comma-separated):'), {
            target: { value: 'life, wisdom' },
        })

        fireEvent.click(screen.getByText('Create'))

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1)
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/quotes', expect.objectContaining({ method: 'POST' }))
        })

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledTimes(1)
            expect(mockPush).toHaveBeenCalledWith('http://localhost:5000/quotes/123')
        })
    })
})
