// ES5 on purpose (var, no arrows): old WebKit browsers like Kindle's run it unbundled.
(function () {
  // Images are notes/<clef>-<note>.png; keep in sync with vite.config.js.
  var CLEFS = {
    treble: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
    bass: ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4']
  }
  var NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'H']
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

  var clef, score, current
  var $ = function (id) { return document.getElementById(id) }
  function pick(list) { return list[Math.floor(Math.random() * list.length)] }

  // Polish naming: B is called H.
  function nameOf(note) { return note.charAt(0) === 'B' ? 'H' : note.charAt(0) }

  function screen(id) {
    var ids = ['menu', 'game', 'end']
    for (var i = 0; i < ids.length; i++) $(ids[i]).style.display = ids[i] === id ? 'block' : 'none'
  }

  function nextNote() {
    var prev = current
    do current = pick(CLEFS[clef]); while (current === prev)
    $('note').src = 'notes/' + clef + '-' + current + '.png'

    $('answers').innerHTML = ''
    NAMES.forEach(function (name) {
      var button = document.createElement('button')
      button.innerHTML = name
      $('answers').appendChild(button)
    })
  }

  function start(chosenClef) {
    clef = chosenClef
    score = 0
    $('points').innerHTML = 'Punkty: 0'
    $('message').innerHTML = ''
    screen('game')
    nextNote()
  }

  $('menu').onclick = function (e) {
    var chosen = e.target.getAttribute('data-clef')
    if (chosen) start(chosen)
  }

  // Disabled buttons don't fire click, so a greyed-out answer can't be scored twice.
  $('answers').onclick = function (e) {
    var button = e.target
    if (button.tagName !== 'BUTTON') return
    if (button.innerHTML === nameOf(current)) {
      score += 2
      $('message').innerHTML = pick(PRAISE)
      if (score >= GOAL) {
        $('reward').src = pick(IMAGES)
        screen('end')
      } else nextNote()
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
