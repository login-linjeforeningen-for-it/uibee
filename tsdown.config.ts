import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: {
        'src/components/index': 'src/components/index.ts',
        'src/hooks/index':      'src/hooks/index.ts',
        'src/utils/index':      'src/utils/index.ts',
        'src/icons/index':      'src/icons/index.ts',
    },
    format: 'esm',
    outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
    banner: (chunk) => {
        if (chunk.fileName.includes('components') || chunk.fileName.includes('hooks') || chunk.fileName.includes('icons')) {
            return { js: '\'use client\';' }
        }
        return {}
    },
    dts: true,
    clean: true,
    deps: {
        onlyBundle: false,
    },
})
