// 

// let token = document.querySelector('#token')
let displaySVG = document.querySelector('#displaySVG')
let btns = document.querySelectorAll('button')
let mainColorSquares = document.querySelectorAll('#mainColor')
let accentColorSquares = document.querySelectorAll('#accentColor')

const colorPalette = [
    'hsl(40, 48%, 53%)',
    'hsl(38, 66%, 83%)',
    'hsl(86, 33%, 19%)',
]

const players = [
    {
        name: 'Jean Paul',
        mainColor: colorPalette[0],
        accentColor: colorPalette[2],
    }
]

let player = players[0];


// So this is not working BUT, basically players avec a value for main and accent color. Depending on that the svg changes and it's wonderful !
// k bye
const tokens = [
    `<svg class="${player}" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
    <defs>
        <pattern id="pppixelate-pattern" width="20" height="20" patternUnits="userSpaceOnUse"
            patternTransform="translate(34 0) scale(40) rotate(0)" shape-rendering="crispEdges">
            <rect width="1" height="1" x="7" y="5" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="8" y="5" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="9" y="5" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="10" y="5" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="11" y="5" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="6" y="6" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="12" y="6" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="5" y="7" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="8" y="7" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="9" y="7" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="10" y="7" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="13" y="7" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="5" y="8" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="7" y="8" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="11" y="8" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="13" y="8" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="5" y="9" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="7" y="9" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="9" y="9" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="11" y="9" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="13" y="9" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="5" y="10" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="7" y="10" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="11" y="10" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="13" y="10" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="5" y="11" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="8" y="11" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="9" y="11" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="10" y="11" fill="${player.accentColor}"></rect>
            <rect width="1" height="1" x="13" y="11" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="6" y="12" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="12" y="12" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="7" y="13" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="8" y="13" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="9" y="13" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="10" y="13" fill="${player.mainColor}"></rect>
            <rect width="1" height="1" x="11" y="13" fill="${player.mainColor}"></rect>
        </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pppixelate-pattern)"></rect>
</svg>`,

]




// const player01MainColor = colorPalette[0];
// const player01AccentColor = colorPalette[2];
// const player02MainColor = colorPalette[2];
// const player02AccentColor = colorPalette[1];

// btns.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         if (btn.id === 'P01') {
//             mainColorSquares.forEach((square) => {
//                 square.style.fill = player01MainColor;
//             })
//             accentColorSquares.forEach((square) => {
//                 square.style.fill = player01AccentColor;
//             })
//         } else if (btn.id === 'P02') {
//             mainColorSquares.forEach((square) => {
//                 square.style.fill = player02MainColor;
//             })
//             accentColorSquares.forEach((square) => {
//                 square.style.fill = player02AccentColor;
//             })
//         }
//     })
// })


displaySVG.innerHTML(tokens[0]);


console.log(tokens[0])