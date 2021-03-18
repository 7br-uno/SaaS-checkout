import pkg from './package'
const env = require('dotenv').config();

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Checkout - Sua Empresa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Checkout - Sua Empresa' },
      { property: 'og:image', content: '/images/imagem_og.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', integrity: 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css', crossorigin: 'anonymous' },

    ],
    script:[
      {type: 'text/javascript', src: 'https://js.iugu.com/v2'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  env: env.parsed,

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-the-mask'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
