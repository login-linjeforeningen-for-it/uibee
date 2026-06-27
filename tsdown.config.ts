import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: {
        'src/components/index': 'src/components/index.ts',
        'src/hooks/index':      'src/hooks/index.ts',
        'src/utils/index':      'src/utils/index.ts',
    },
    format: 'esm',
    outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
    banner: (chunk) => {
        if (chunk.fileName.includes('components') || chunk.fileName.includes('hooks')) {
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
