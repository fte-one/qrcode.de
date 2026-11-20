// Kanonische Adressen erzwingen (dauerhaft, 301), alles andere liefert die statischen Dateien aus:
//  - www.qrcode.de        → qrcode.de
//  - /seite/, /seite.html → /seite   (Cloudflare würde hier nur temporär mit 307 umleiten)
//  - /index.html          → /
export function canonicalUrl(request) {
  const url = new URL(request.url)
  const host = request.headers.get('host') || url.hostname
  let changed = false

  if (host === 'www.qrcode.de') {
    url.hostname = 'qrcode.de'
    url.port = ''
    url.protocol = 'https:'
    changed = true
  }

  let path = url.pathname
  if (!path.startsWith('/_next/')) {
    if (path.endsWith('/index.html')) path = path.slice(0, -'index.html'.length)
    else if (path.endsWith('.html')) path = path.slice(0, -'.html'.length)
    if (path.length > 1 && path.endsWith('/')) path = path.replace(/\/+$/, '') || '/'
  }
  if (path !== url.pathname) {
    url.pathname = path
    changed = true
  }

  return changed ? url.toString() : null
}

export default {
  async fetch(request, env) {
    if (request.method === 'GET' || request.method === 'HEAD') {
      const target = canonicalUrl(request)
      if (target) return Response.redirect(target, 301)
    }
    return env.ASSETS.fetch(request)
  },
}
