import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { getLoadContext } from './load-context'
import { flatRoutes } from 'remix-flat-routes'

const isStorybook = process.argv[1]?.includes('storybook')
export default defineConfig({
  plugins: [
    remixCloudflareDevProxy({ getLoadContext }),
    !isStorybook &&
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          // v3_singleFetch: true,
          // v3_lazyRouteDiscovery: true,
        },
        ignoredRouteFiles: ['**/*'],
        routes: async (defineRoutes) => {
          return flatRoutes('routes', defineRoutes)
        },
      }),
    tsconfigPaths(),
  ],
})
