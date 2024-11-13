import { withShurikenUI } from '@shuriken-ui/tailwind'
import { join } from 'path'
import defaultTheme from 'tailwindcss/defaultTheme'

/**
 * This is the Tailwind config file for the demo.
 * It extends the default config from @shuriken-ui/tailwind
 *
 * You can add/override your own customizations here.
 */
export default withShurikenUI({
    content: [join(__dirname, `/utils/**/*.ts`)], // Parse the utils folder for demo
    safelist: [
        // Those classes are used in the pageTransition config in nuxt.config.ts
        'transition-all',
        'duration-200',
        'duration-75',
        'ease-out',
        'ease-in',
        'opacity-0',
        'opacity-100',
    ],
    theme: {
        // Custom fonts
        fontFamily: {
            sans: ['Noto Kufi Arabic', 'sans-serif'],
            heading: ['Noto Kufi Arabic', 'sans-serif'],
            alt: ['Noto Kufi Arabic', 'sans-serif'],
            mono: ['Fira Code Variable', ...defaultTheme.fontFamily.mono],
        },

        extend: {
            // Custom colors
            colors: {
                primary: {
                    50: '#FAFEFF',
                    100: '#E5F8FF',
                    200: '#DED0FB',
                    300: '#2DD265',
                    400: '#2DD265',
                    500: '#2DD265',
                    600: '#0081B2',
                    700: '#00597A',
                    800: '#003B52',
                    900: '#0F0326',
                    950: '#070213',
                },
                muted: {
                    50: '#FCFAFF',
                    100: '#F1F3F4',
                    200: '#C1C9CD',
                    300: '#A2AEB4',
                    400: '#83939A',
                    500: '#687980',
                    600: '#526065',
                    700: '#3E484C',
                    800: '#191A1C',
                    900: '#151819',
                    950: '#0B0D0E',
                },
                // primary: colors.red,
                // muted: colors.stone,
                // info: colors.sky,
                // success: colors.teal,
                // warning: colors.amber,
                // danger: colors.rose,
                // Custom color shades generate with https://www.tints.dev/brand/4E3CB9
                info: {
                    50: '#E3E2FD',
                    100: '#C3C1FB',
                    200: '#8682F7',
                    300: '#4A44F3',
                    400: '#160FEB',
                    500: '#0F0BAB',
                    600: '#0D098B',
                    700: '#0A0665',
                    800: '#060443',
                    900: '#030222',
                    950: '#020113',
                },
                success: {
                    50: '#E0FFF9',
                    100: '#BDFFF3',
                    200: '#80FFE8',
                    300: '#3DFFDB',
                    400: '#00FACC',
                    500: '#00B998',
                    600: '#009479',
                    700: '#00705C',
                    800: '#004D3E',
                    900: '#00241D',
                    950: '#001411',
                },
                warning: {
                    50: '#FFF4E5',
                    100: '#FFEACC',
                    200: '#FFD599',
                    300: '#FFBF66',
                    400: '#FFAA33',
                    500: '#FF9500',
                    600: '#CC7700',
                    700: '#995900',
                    800: '#663C00',
                    900: '#331E00',
                    950: '#190F00',
                },
                danger: {
                    50: '#FCE8EE',
                    100: '#F9CDDA',
                    200: '#F3A0B9',
                    300: '#ED6E94',
                    400: '#E84072',
                    500: '#D51A52',
                    600: '#AD1543',
                    700: '#7F1031',
                    800: '#560B21',
                    900: '#290510',
                    950: '#170309',
                },
                mauve: {
                    50: '#EEECF9',
                    100: '#DCD8F3',
                    200: '#B6AEE5',
                    300: '#9488D8',
                    400: '#6E5DCB',
                    500: '#fff',
                    600: '#3E2F92',
                    700: '#302470',
                    800: '#1F1849',
                    900: '#100C27',
                    950: '#080613',
                },

                /**
                 * We use CSS variables to define our colors so that we can easily
                 * change them in the browser.
                 *
                 * The <alpha-value> placeholder is replaced with the alpha value
                 * @see https://tailwindcss.com/docs/customizing-colors#using-css-variables
                 *
                 * @example .demo/assets/css/colors.css
                 * @example .demo/utils/colors-switcher.ts
                 * @example .demo/components/DemoAppLayoutSwitcher.vue
                 */
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'spin-fast': 'spin 0.65s linear infinite',
            },
            borderRadius: {
                // md: '1.2rem',
                // lg: '1.6rem',
                DEFAULT: '0.25rem',
            },
        },
    },
})
