Vue.createApp({
    data() {
      return {
        loading: false,
        aniQuote: {
          quote: '',
          character: '',
          animeTitle: '',
          quoteLength: 0
        }
      }
    },
    mounted() {
        this.loadAniQuote();
    },
    methods: {
      loadAniQuote: async function() {
          try {
              this.loading = true
              await this.consumeApi()
              this.loading = false
          } catch (error) {
              console.log(error)
          }
      },
      consumeApi: async function() {
          const quote = document.getElementById('quote')
          const res = await fetch('https://animechan.vercel.app/api/random')
          const data = await res.json() //returns also a promise thus, 'await' keyword is used
          this.aniQuote.quoteLength = data.quote.length
          console.log(this.aniQuote.quoteLength)
          if (navigator.userAgent.match(/Android/i)
              || navigator.userAgent.match(/iPhone/i) 
              || navigator.userAgent.match(/iPad/i)) {
              if(this.aniQuote.quoteLength > 215) {
                  quote.classList.remove('scrollable-container')
                  quote.classList.add('scrollable-container')
              } else {
                  quote.classList.remove('scrollable-container')
                  quote.classList.remove('text-center')
                  quote.classList.remove('text-left')
                  quote.classList.add('text-center')
              }
          } else {
              if(this.aniQuote.quoteLength > 449) {
                  quote.classList.remove('scrollable-container')
                  quote.classList.add('scrollable-container')
              } else if (this.aniQuote.quoteLength < 50) {
                  quote.classList.remove('scrollable-container')
                  quote.classList.remove('text-left')
                  quote.classList.add('text-center')
              } else {
                  quote.classList.remove('scrollable-container')
                  quote.classList.remove('text-center')
                  quote.classList.add('text-left')
              }
          }
          this.aniQuote.quote = data.quote
          this.aniQuote.character = data.character
          this.aniQuote.animeTitle = data.anime
      }
    }
}).mount('#app')