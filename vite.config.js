import { defineConfig } from 'vite'
import { globSync } from 'node:fs'
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import { Factory, CanvasContext, Element, VexFlow } from 'vexflow/core'
import { Bravura } from './node_modules/vexflow/build/esm/src/fonts/bravura.js'
import { Academico } from './node_modules/vexflow/build/esm/src/fonts/academico.js'

// Served as notes/<name>.png. Keep names in sync with src/public/game.js.
const CLEFS = {
  treble: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
  bass: ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'],
}
const DURATIONS = ['w', 'h', 'q', '8', '16']
const IMAGES = {} // name -> [clef, EasyScore notes]
for (const [clef, notes] of Object.entries(CLEFS))
  for (const note of notes) IMAGES[`${clef}-${note}`] = [clef, `${note}/w`]
for (const d of DURATIONS) {
  IMAGES[`note-${d}`] = ['treble', `B4/${d}`]
  IMAGES[`rest-${d}`] = ['treble', `B4/${d}/r`]
}
const WIDTH = 200, HEIGHT = 150
const SCALE = 3 // sharp when shown enlarged / on retina

const font = (dataUri) => Buffer.from(dataUri.split(',')[1], 'base64')
GlobalFonts.register(font(Bravura), 'Bravura')
GlobalFonts.register(font(Academico), 'Academico')
VexFlow.setFonts('Bravura', 'Academico')
Element.setTextMeasurementCanvas(createCanvas(1, 1))

function render([clef, notes]) {
  const canvas = Object.assign(createCanvas(WIDTH, HEIGHT), { style: {} }) // VexFlow sets style.width/height
  const ctx = new CanvasContext(canvas.getContext('2d'))
  ctx.resize(WIDTH, HEIGHT, SCALE)
  const vf = new Factory({ renderer: { elementId: null } })
  vf.setContext(ctx)
  const score = vf.EasyScore()
  // Soft voice: a lone eighth etc. doesn't fill a 4/4 bar, which is fine here.
  const voice = score.voice(score.notes(notes, { clef })).setStrict(false)
  vf.System({ width: 180 })
    .addStave({ voices: [voice] })
    .addClef(clef)
  vf.draw()
  return canvas.toBuffer('image/png')
}

// Notes ship as PNGs (no VexFlow in the browser).
const notePngs = {
  name: 'note-pngs',
  configureServer(server) {
    server.middlewares.use('/notes', (req, res, next) => {
      const image = IMAGES[req.url.slice(1).replace(/\.png$/, '')]
      if (!image) return next()
      res.setHeader('Content-Type', 'image/png')
      res.end(render(image))
    })
  },
  generateBundle() {
    for (const [name, image] of Object.entries(IMAGES))
      this.emitFile({ type: 'asset', fileName: `notes/${name}.png`, source: render(image) })
  },
}

export default defineConfig({
  root: 'src',
  base: './', // relative paths, works in any FTP subdirectory
  plugins: [notePngs],
  server: { allowedHosts: true },
  preview: { allowedHosts: true },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: { input: globSync('src/**/index.html') },
  },
})
