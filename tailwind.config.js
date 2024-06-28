/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#212529',
                },
                blue: {
                    50: '#F8F9FA',
                    DEFAULT: '#2F58C2',
                    200: '#E8EDF1',
                    300: '#D5DEE5',
                    400: '#2F58C2',
                    500: '#0D6EFD',
                },
                grey: {
                    DEFAULT: '#6C757D',
                    50: '#f5f5f5',
                    100: ' #CDD4D9',
                    300: '#616567',
                    400: '#6C747C',
                    700: '#999EA3',
                    800: '#4B4A4A',
                    900: '#3A3939',
                },
                teal: {
                    DEFAULT: '#20C997',
                    100: '#e8f3ed',
                },
                danger: {
                    DEFAULT: '#F86C6B',
                    100: '#FFF1E0',
                },
                warning: {
                    DEFAULT: '#DC3545',
                    100: '#fbeaec',
                },
                success: '#51AF25',
            },
            boxShadow: {
                card: '0px 3px 20px rgba(0, 0, 0, 0.15)',
                global: '10px 0px 15px rgba(0, 0, 0, 0.1)',
            },
            keyframes: {
                fadein: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeout: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                popup: {
                    '0%': { opacity: '0', width: '50%', height: '50%' },
                    '100%': { opacity: '1', width: '100%', height: '100%' },
                },
                popout: {
                    '0%': { width: '100%', height: '100%' },
                    '100%': { opacity: '0', width: '50%', height: '50%' },
                },
                // animations 'to'
                // Theese animation are for when a component goes out of scene
                slidetoup: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-100%)' },
                },
                slidetodown: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                slidetoleft: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                slidetoright: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                // animations 'from'
                // Theese animation are for when a component comes in to a scene 
                slidefromup: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                slidefromdown: {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                slidefromleft: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                slidefromright: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                // animations 'fade to'
                // Theese animation are for when a component goes out of scene with a fade
                fadeslidetoup: {
                    '0%': { transform: 'translateY(0)', opacity: '1' },
                    '100%': { transform: 'translateY(-100%)', opacity: '0' },
                },
                fadeslidetodown: {
                    '0%': { transform: 'translateY(0)', opacity: '1' },
                    '100%': { transform: 'translateY(100%)', opacity: '0' },
                },
                fadeslidetoleft: {
                    '0%': { transform: 'translateY(0)', opacity: '1' },
                    '100%': { transform: 'translateX(-100%)', opacity: '0' },
                },
                fadeslidetoright: {
                    '0%': { transform: 'translateY(0)', opacity: '1' },
                    '100%': { transform: 'translateX(100%)', opacity: '0' },
                },
                // animations 'from'
                // Theese animation are for when a component comes in to a scene 
                fadeslidefromup: {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeslidefromdown: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeslidefromleft: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeslidefromright: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                hide: {
                    '0%': {},
                    '100%': { display: 'none' }
                },
                wave: {
                    '0%': { opacity: '1' },
                    '45%': { opacity: '0.4' },
                    '55%': { opacity: '0.4' },
                    '100%': { opacity: '1' },
                }
            },
            animation: {
                fadein: 'fadein .5s forwards',
                fadeout: 'fadeout .5s forwards',
                popup: 'popup .3s ease-out forwards',
                popout: 'popout .3s ease-out forwards',
                slidetoup: 'slidetoup      .4s cubic-bezier(.73,.34,.8,.8) forwards',
                slidetodown: 'slidetodown    .3s cubic-bezier(.73,.34,.8,.8) forwards',
                slidetoleft: 'slidetoleft    .3s cubic-bezier(.73,.34,.8,.8) forwards',
                slidetoright: 'slidetoright   .3s cubic-bezier(.73,.34,.8,.8) forwards',
                slidefromup: 'slidefromup    .3s cubic-bezier(.17,.67,.63,.9) forwards',
                slidefromdown: 'slidefromdown  .3s cubic-bezier(.17,.67,.63,.9) forwards',
                slidefromleft: 'slidefromleft  .3s cubic-bezier(.17,.67,.63,.9) forwards',
                slidefromright: 'slidefromright .3s ease-in-out forwards',
                fadeslidetoup: 'fadeslidetoup .3s cubic-bezier(.17,.67,.63,.9) forwards',
                fadeslidetodown: 'fadeslidetodown .3s cubic-bezier(.17,.67,.63,.9) forwards',
                fadeslidetoleft: 'fadeslidetoleft .3s cubic-bezier(.17,.67,.63,.9) forwards',
                fadeslidetoright: 'fadeslidetoright .3s cubic-bezier(.17,.67,.63,.9) forwards',
                fadeslidefromup: 'fadeslidefromup .3s cubic-bezier(.17,.67,.63,.9) forwards',
                fadeslidefromdown: 'fadeslidefromdown .3s cubic-bezier(.17,.67,.63,.9) forwards',
                fadeslidefromleft: 'fadeslidefromleft .3s ease-in-out forwards',
                fadeslidefromright: 'fadeslidefromright .3s cubic-bezier(.17,.67,.63,.9) forwards',
                hide: 'hide .5s forwards',
                infiniteWave: 'wave 2s infinite ease-in-out'
            },
        },
    },
};
