import tailwindPostcss from '@tailwindcss/postcss'
import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: {
        'src/components/index': 'src/components/index.ts',
        'src/hooks/index':      'src/hooks/index.ts',
        'src/utils/index':      'src/utils/index.ts',
        'src/icons/index':      'src/icons/index.ts',
        'src/styles/index':     'src/styles/index.ts',
    },
    format: 'esm',
    outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
    dts: true,
    clean: true,
    deps: {
        onlyBundle: false,
    },
    css: {
        transformer: 'postcss',
        postcss: {
            plugins: [tailwindPostcss()],
        },
        inject: true,
    },
})
