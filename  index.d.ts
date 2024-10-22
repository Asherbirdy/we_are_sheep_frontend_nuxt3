declare module 'nuxt/schema' {
  interface RuntimeConfig {
    public: {
      apiUrl: string
      email: string
      password: string
    }
  }
}

export {}
