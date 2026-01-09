jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: jest.fn() }),
    useSearchParams: () => ({ get: () => null }),
}))

jest.mock('next/link', () => {
    const React = require('react')
    const NextLinkMock = ({ href, children, ...props }) => (
        <a href={typeof href === 'string' ? href : ''} {...props}>
            {children}
        </a>
    )
    NextLinkMock.displayName = 'NextLinkMock'
    return NextLinkMock
})

jest.mock('@/app/elements/SearchButton ', () => {
    const React = require('react')
    const Btn = ({ children, ...props }) => (
        <button type="button" {...props}>
            {children}
        </button>
    )
    Btn.displayName = 'SearchButtonMock'
    return Btn
})

import React, { Suspense } from 'react'
import { render, screen, act } from '@testing-library/react'
import QuotePage from '../page'

describe('Quote page (simple)', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: '123', text: 'Hello world', author: null, categories: [] }),
        })
    })

    it('shows Unknown when author is missing', async () => {
        await act(async () => {
            render(
                <Suspense fallback={null}>
                    <QuotePage params={Promise.resolve({ id: '123' })} />
                </Suspense>
            )
        })
        expect(await screen.findByText(/Unknown/)).toBeInTheDocument()
    })
})
