/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,tsx}','./index.html'],
    theme: {
        extend: {
            height: {
                '1/10': '10%',
                '2/10': '20%',
                '3/10': '30%',
                '4/10': '40%',
                '5/10': '50%',
                '6/10': '60%',
                '7/10': '70%',
                '8/10': '80%',
                '9/10': '90%',
                'minus-header': 'calc(100vh - 4rem)',
                calendar: 'calc((100vh - 4rem) * 9/10 * 4/5)',
                500: '500px'
            },
            width: {
                '1/10': '10%',
                '2/10': '20%',
                '3/10': '30%',
                '4/10': '40%',
                '5/10': '50%',
                '6/10': '60%',
                '7/10': '70%',
                '8/10': '80%',
                '9/10': '90%'
            },
            minHeight: {
                '1/2': '50%',
                '1/3': '33.3%',
                '1/4': '25%',
                '1/5': '20%',
                '9/10': '90%',
                'minus-header': 'calc(100vh - 4rem)',
                500: '500px',
                600: '600px',
                700: '700px',
                800: '800px',
                900: '900px'
            },
            maxHeight: {
                '7/10screen': '70vh',
                '3/4screen': '75vh',
                '8/10screen': '80vh',
                '9/10screen': '90vh'
            },
            colors: {
                primary: 'rgb(17 24 39)',
                secondary: 'rgb(31 41 55)',
                tertiary: 'rgb(12 74 110)'
            }
        }
    },
    plugins: []
};
