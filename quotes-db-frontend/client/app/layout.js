import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/Navbar'
import ToastProvider from './components/ToastProvider'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata = {
    title: 'Quoutes',
    description: 'Quoutes API Frontend application',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Navbar />
                <ToastProvider>{children}</ToastProvider>
            </body>
        </html>
    )
}
