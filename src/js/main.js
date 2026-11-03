import { Factory } from 'vexflow/bravura'

// Bravura is bundled but registered async; wait so glyph metrics are right.
await document.fonts.ready

const vf = new Factory({ renderer: { elementId: 'score', width: 200, height: 150 } })
const score = vf.EasyScore()
vf.System({ width: 180 })
  .addStave({ voices: [score.voice(score.notes('C5/w'))] })
  .addClef('treble')
vf.draw()
