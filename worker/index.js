// Leitet www.qrcode.de dauerhaft auf qrcode.de um, alles andere liefert die statischen Dateien aus.
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const host = request.headers.get('host') || url.hostname
    if (host === 'www.qrcode.de') {
      url.hostname = 'qrcode.de'
      url.port = ''
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  },
}
