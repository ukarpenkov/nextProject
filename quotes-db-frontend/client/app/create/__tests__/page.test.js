import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import CreateNewQuotePage from '../page'

jest.mock('next/navigation', () => {
    return {
        useRouter: () => ({
            push: jest.fn(),
        }),
    }
})

describe('CreateNewQuotePage URL formation', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: 123 }),
        })
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('builds correct redirect URL after successful creation', async () => {
        const { getByLabelText, getByText } = render(<CreateNewQuotePage />)

        fireEvent.change(getByLabelText('Quote Text:'), { target: { value: 'This is a valid quote text.' } })
        fireEvent.change(getByLabelText('Author:'), { target: { value: 'John Doe' } })
        fireEvent.change(getByLabelText('Categories (comma-separated):'), { target: { value: 'life, wisdom' } })

        fireEvent.click(getByText('Create'))

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/quotes', expect.objectContaining({ method: 'POST' }))
        })

        const mockedRouter = require('next/navigation').useRouter()
        expect(mockedRouter.push).toHaveBeenCalledWith('http://localhost:5000/quotes/123')
    })
})
