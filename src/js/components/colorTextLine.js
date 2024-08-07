// Configure
const config = {
  animationStep: 0.5,
  phrases: [],
}

// An array of all phrases
const phraseRef = document.querySelectorAll('.animals__subtext')

// Getting and converting a phrase for further work
for (let i = 0; i < phraseRef.length; i++) {
  const phrase = [];

  const item = phraseRef[i]
  const phraseHeight = item.offsetHeight;
  const phraseLineHeight = document.defaultView.getComputedStyle(item).getPropertyValue('line-height')
  const phraseLineHeightValue = Number(phraseLineHeight.match(/\d+/g).join('.'))
  const lines = phraseHeight / phraseLineHeightValue

  const letters = item.textContent.split('')
  const lettersToLine = Math.round(letters.length / lines)

  let currentLetters = 0

  // The process of dividing a phrase into lines separated by a space
  for (let j = 0; j < lines; j++) {
    const currentLettersToLine = lettersToLine + currentLetters
    let nextSpacerIndex = item.textContent.indexOf(' ', currentLettersToLine) // Does not take into account &nbsp

    if (nextSpacerIndex < 0) {
      nextSpacerIndex = letters.length
    }

    const strToLine = item.textContent.substring(currentLetters, nextSpacerIndex)
    currentLetters = nextSpacerIndex

    phrase.push(strToLine)
  }

  config.phrases.push(phrase)
}

// Clearing the default text from a phrase and zeroing width
for (let i = 0; i < phraseRef.length; i++) {
  phraseRef[i].textContent = ''
  phraseRef[i].style.maxWidth = '100%'
}

const animationStep = config.animationStep
const phrases = config.phrases

// Create phrase line and add animation delay
const createPhraseToLine = (phrase, index) => {
  const spanHTML = document.createElement('span')
  spanHTML.innerText = phrase
  spanHTML.style = `--animation-text-delay: ${animationStep * index}s`

  return spanHTML
}

// Iterate create phrases for generate phrase in line
for (let i = 0; i < phrases.length; i++) {
  const phrase = phrases[i]

  for (let j = 0; j < phrase.length; j++) {
    const phraseLineHTML = createPhraseToLine(phrase[j], j)
    phraseRef[i].appendChild(phraseLineHTML)
  }
}
