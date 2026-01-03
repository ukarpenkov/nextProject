import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ['**/__tests__/**/*.(js|jsx)', '**/?(*.)+(spec|test).(js|jsx)'],
    collectCoverageFrom: ['app/**/*.{js,jsx}', 'components/**/*.{js,jsx}'],
}

export default await createJestConfig(customJestConfig)
