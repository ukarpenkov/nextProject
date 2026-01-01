export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        // Mock CSS modules and asset imports
        '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ['**/__tests__/**/*.(js|jsx)', '**/?(*.)+(spec|test).(js|jsx)'],
    collectCoverageFrom: ['app/**/*.{js,jsx}', 'components/**/*.{js,jsx}'],
}
