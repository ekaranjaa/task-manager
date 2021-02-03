export default {
  target: 'static',

  head: {
    title: 'Task Manager',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Keep track of  team members, assign tasks and much more.'
      },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#2d89ef'
      },
      {
        hid: 'msapplication-config',
        name: 'msapplication-config',
        content: '/browserconfig.xml'
      },
      { name: 'theme-color', content: '#3b83f5' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap'
      },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/app/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/app/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/app/favicon-16x16.png'
      },
      {
        rel: 'mask-icon',
        color: '#3b83f5',
        href: '/icons/app/safari-pinned-tab.svg'
      }
    ]
  },

  pwa: {
    icon: false,
    manifest: {
      name: 'Task Manager',
      short_name: 'Task Manager',
      start_url: '/',
      display: 'standalone',
      theme_color: '#3b83f5',
      background_color: '#3b83f5',
      description: 'Keep track of  team members, assign tasks and much more.',
      icons: [
        {
          src: '/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/android-chrome-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        }
      ]
    }
  },

  loading: {
    color: '#3b83f5',
    failedColor: '#e9413e'
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/auth-next'],

  build: {},

  axios: {
    baseURL: 'http://api.taskmanager.test/api'
  },

  router: {
    // middleware: ['auth']
  },

  server: {
    port: 8000,
    host: '0.0.0.0'
  }
};
