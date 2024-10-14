/* eslint-disable node/prefer-global/process */
import { pwa } from './pwa'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  compatibilityDate: '2024-10-02',
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  nitro: {
    esbuild: {
      options: { target: 'esnext' },
    },
    // prerender: {
    //   crawlLinks: false,
    //   routes: ['/'],
    //   ignore: ['/hi'],
    // },
  },
  experimental: {
    payloadExtraction: false, //  如果你在生成時遇到 JavaScript 資產缺失的問題，建議保持關閉。這會防止在離線時出現問題。
    renderJsonPayloads: true, // 如果你的應用需要將 JSON 資料渲染到頁面上，則可以開啟此選項。這對於需要 SEO 的應用特別有用。
    typedPages: true, // 如果你使用 TypeScript 並希望在頁面中獲得類型檢查，則可以開啟此選項。
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vite-pwa/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  pwa,
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1 user-scalable=no',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'appDescription' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },
  plugins: [
    { src: '@/plugins/customFetch.ts', mode: 'client' },
  ],
  imports: {
    dirs: [
      '@/plugins/Fetch.ts',
    ],
  },
})
