import { defineConfig } from 'vite'
import { globSync } from 'node:fs'
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import { Factory, CanvasContext, Element, VexFlow } from 'vexflow/core'
import { Bravura } from './node_modules/vexflow/build/esm/src/fonts/bravura.js'
import { Academico } from './node_modules/vexflow/build/esm/src/fonts/academico.js'

// An octave per clef, served as notes/<clef>-<note>.png. Keep in sync with src/public/game.js.
const CLEFS = {
  treble: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
  bass: ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'],
}
const WIDTH = 200, HEIGHT = 150
const SCALE = 3 // sharp when shown enlarged / on retina

const font = (dataUri) => Buffer.from(dataUri.split(',')[1], 'base64')
GlobalFonts.register(font(Bravura), 'Bravura')
GlobalFonts.register(font(Academico), 'Academico')
VexFlow.setFonts('Bravura', 'Academico')
Element.setTextMeasurementCanvas(createCanvas(1, 1))

function renderNote(clef, note) {
  const canvas = Object.assign(createCanvas(WIDTH, HEIGHT), { style: {} }) // VexFlow sets style.width/height
  const ctx = new CanvasContext(canvas.getContext('2d'))
  ctx.resize(WIDTH, HEIGHT, SCALE)
  const vf = new Factory({ renderer: { elementId: null } })
  vf.setContext(ctx)
  const score = vf.EasyScore()
  vf.System({ width: 180 })
    .addStave({ voices: [score.voice(score.notes(`${note}/w`, { clef }))] })
    .addClef(clef)
  vf.draw()
  return canvas.toBuffer('image/png')
}

// Notes ship as PNGs (no VexFlow in the browser).
const notePngs = {
  name: 'note-pngs',
  configureServer(server) {
    server.middlewares.use('/notes', (req, res, next) => {
      const [, clef, note] = req.url.match(/^\/(\w+)-(\w+)\.png$/) || []
      if (!CLEFS[clef]?.includes(note)) return next()
      res.setHeader('Content-Type', 'image/png')
      res.end(renderNote(clef, note))
    })
  },
  generateBundle() {
    for (const [clef, notes] of Object.entries(CLEFS))
      for (const note of notes)
        this.emitFile({ type: 'asset', fileName: `notes/${clef}-${note}.png`, source: renderNote(clef, note) })
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
