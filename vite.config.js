import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pageMetadata, sitePages } from './src/data/sitePages.js'

function pageHtml(html, pathname) {
  const { title, description, canonical, hero } = pageMetadata(pathname)
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<link rel="canonical" href="${escape(canonical)}" />`,
  ]
  if (hero) tags.push(`<link rel="preload" as="image" href="${hero}" type="image/webp" fetchpriority="high" />`)
  return html.replace('<!-- page metadata -->', tags.join('\n    '))
}

const publicPages = {
  name: 'public-page-metadata',
  transformIndexHtml(html, context) {
    if (context.server) return pageHtml(html, (context.originalUrl || '/').split('?')[0])
  },
  generateBundle: {
    order: 'post',
    handler(_, bundle) {
      const index = bundle['index.html']
      const template = index.source
      index.source = pageHtml(template, '/').replace(
        /<link rel="stylesheet" crossorigin href="\/([^"]+\.css)">/,
        (link, fileName) => {
          const styles = bundle[fileName]
          return typeof styles?.source === 'string' ? `<style>${styles.source}</style>` : link
        },
      )
      for (const path of Object.keys(sitePages).filter(path => path !== '/')) {
        this.emitFile({ type: 'asset', fileName: path.slice(1) + '.html', source: pageHtml(template, path) })
      }
      const urls = Object.keys(sitePages).map(path => `  <url><loc>${pageMetadata(path).canonical}</loc></url>`)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join('\n'),
      })
    },
  },
}

export default defineConfig({
  plugins: [react(), publicPages],
})
