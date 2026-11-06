// ES5 on purpose (var, no arrows): old WebKit browsers like Kindle's run it unbundled.
(function () {
  var NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'H']
  var DURATIONS = ['w', 'h', 'q', '8', '16']
  // Images are notes/<image>.png; keep in sync with vite.config.js.
  var MODES = {
    treble: pitches('treble', ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']),
    bass: pitches('bass', ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4']),
    notes: lengths('note', ['Cała nuta', 'Półnuta', 'Ćwierćnuta', 'Ósemka', 'Szesnastka']),
    rests: lengths('rest', ['Pauza całonutowa', 'Pauza półnutowa', 'Pauza ćwierćnutowa', 'Pauza ósemkowa', 'Pauza szesnastkowa'])
  }
  var PRAISE = ['Super!', 'Nieźle!', 'Dobrze!', 'Ekstra!', 'Wspaniale!']
  // One is picked at random after a finished game.
  var IMAGES = [
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQOrZMMqsn1jAhWe_pB5nl-cg4zfFIpGyKU0pGD-y7j-npsUZua4NL-hupyhIQYeLFwcqetIBhhWxvBM8Kos1-m8MAYgBChUHMA08wF4-u0ap3iN9Q2eWO1RZvPSIrlD3HKGdErpRdCBw&usqp=CAc',
    // jednorożec, konie, konik z karuzeli
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F984.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F40E.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F434.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F3A0.svg",
    // kotki
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F408.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F431.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F63A.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F638.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F63B.svg",
    // tort
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F382.svg",
    // księżniczka, korona, zamek, wróżka, syrenka, różdżka, sukienka, pantofelek
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F478.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F451.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F3F0.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F9DA-200D-2640-FE0F.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F9DC-200D-2640-FE0F.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1FA84.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F457.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F460.svg",
    // kwiatki
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F338.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F33A.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F33B.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F337.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F339.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F33C.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F490.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1FAB7.svg",
    // tęcza, gwiazdki, księżyc, słońce
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F308.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F31F.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/2B50.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F319.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/2600.svg",
    // serduszka, kokardka
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F496.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F49D.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F380.svg",
    // zwierzątka
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F98B.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F430.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F436.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F42C.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F41E.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F427.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F98A.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F43C.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F428.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F439.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F99C.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F9A9.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F422.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F98C.svg",
    // miś, babeczka
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F9F8.svg",
    "https://cdn.jsdelivr.net/npm/openmoji@17.0.0/black/svg/1F9C1.svg"
  ]
  var GOAL = 10

  var mode, score, current
  var $ = function (id) { return document.getElementById(id) }
  function pick(list) { return list[Math.floor(Math.random() * list.length)] }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var t = a[i]; a[i] = a[j]; a[j] = t
    }
    return a
  }

  // Polish naming: B is called H.
  function nameOf(note) { return note.charAt(0) === 'B' ? 'H' : note.charAt(0) }

  // All 7 names in a row.
  function pitches(clef, notes) {
    return {
      answers: NAMES,
      items: notes.map(function (n) { return { image: clef + '-' + n, answer: nameOf(n) } })
    }
  }

  // Long labels: 4 of them, stacked.
  function lengths(kind, names) {
    return {
      answers: names,
      choices: 4,
      layout: 'vertical',
      items: DURATIONS.map(function (d, i) { return { image: kind + '-' + d, answer: names[i] } })
    }
  }

  function screen(id) {
    var ids = ['menu', 'game', 'end']
    for (var i = 0; i < ids.length; i++) $(ids[i]).style.display = ids[i] === id ? 'block' : 'none'
  }

  function nextItem() {
    var prev = current
    do current = pick(mode.items); while (current === prev)
    $('note').src = 'notes/' + current.image + '.png'

    var options = mode.answers
    if (mode.choices) {
      var right = current.answer
      var wrong = shuffle(options.filter(function (a) { return a !== right })).slice(0, mode.choices - 1)
      // Filtering the full list keeps the natural order (C..H, whole..sixteenth).
      options = options.filter(function (a) { return a === right || wrong.indexOf(a) >= 0 })
    }
    $('answers').className = mode.layout || ''
    $('answers').innerHTML = ''
    options.forEach(function (name) {
      var button = document.createElement('button')
      button.innerHTML = name
      $('answers').appendChild(button)
    })
  }

  function start(name) {
    mode = MODES[name]
    current = null
    score = 0
    $('points').innerHTML = 'Punkty: 0'
    $('message').innerHTML = ''
    screen('game')
    nextItem()
  }

  $('menu').onclick = function (e) {
    var chosen = e.target.getAttribute('data-mode')
    if (chosen) start(chosen)
  }

  // Disabled buttons don't fire click, so a greyed-out answer can't be scored twice.
  $('answers').onclick = function (e) {
    var button = e.target
    if (button.tagName !== 'BUTTON') return
    if (button.innerHTML === current.answer) {
      score += 2
      $('message').innerHTML = pick(PRAISE)
      if (score >= GOAL) {
        $('reward').src = pick(IMAGES)
        screen('end')
      } else nextItem()
    } else {
      score -= 1
      $('message').innerHTML = 'Spróbuj ponownie'
      button.disabled = true
    }
    $('points').innerHTML = 'Punkty: ' + score
  }
  $('back').onclick = function () { screen('menu') }

  screen('menu')
})()
