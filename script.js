const quote = document.getElementById('quote')
const character = document.getElementById('character')
const animeTitle = document.getElementById('animeTitle')
const btn = document.getElementById('consumeBtn')

consumeApi()

btn.addEventListener('click', () => {
    consumeApi()
})

async function consumeApi() {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    const res = await fetch('https://animechan.vercel.app/api/random')
    const data = await res.json() //returns also a promise thus, 'await' keyword is used
    const quoteLength = data.quote.length
    console.log(quoteLength)
    if(quoteLength > 449) {
        quote.classList.remove('scrollable-container')
        quote.classList.add('scrollable-container')
        quote.innerHTML = data.quote
    } else if (quoteLength < 50) {
        quote.classList.remove('scrollable-container')
        quote.classList.remove('text-left')
        quote.classList.add('text-center')
        quote.innerHTML = data.quote
    } else {
        quote.classList.remove('scrollable-container')
        quote.classList.remove('text-center')
        quote.classList.add('text-left')
        quote.innerHTML = data.quote
    }

    
    character.innerHTML = data.character
    animeTitle.innerHTML = data.anime

    // fetch('https://animechan.vercel.app/api/random')
    //     .then(res => res.json())
    //     .then(data => {
    //         quote.innerHTML = data.quote
    //         character.innerHTML = data.character
    //         animeTitle.innerHTML = data.anime
    //     })
}