export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    testRegex: '((\\.|/)(test|spec))\\.ts?$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node']
}
