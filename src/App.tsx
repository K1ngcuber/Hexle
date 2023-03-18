import { Component, createSignal, onMount } from 'solid-js'

import styles from './App.module.css'
import { checkInput, getRandomHexCode, TryResult } from './Helper'
import { InputRow } from './InputRow'
import { clearStorage, loadItem, saveItem } from './StorageService'
import { Tutorial } from './Tutorial/Tutorial'
import { ResultScreen } from './ResultScreen'

const App: Component = () => {
  //the current active row
  const [currentRow, setCurrentRow] = createSignal(0)

  //the color to guess
  const [colorCode, setColorCode] = createSignal('#000000')

  //current user input
  const [userCode, setUserCode] = createSignal('#000000')

  //show win screen
  const [win, setWin] = createSignal(false)

  //show lose screen
  const [lose, setLose] = createSignal(false)

  //show tutorial
  const [tutorial, setTutorial] = createSignal(false)

  //helper to only show animation once after win and not on reload
  const [particle, setParticle] = createSignal(false)

  //create empty tries array with 6 rows
  const [tries, setTries] = createSignal(
    Array.from({ length: 9 }, () => []) as TryResult[][],
  )

  onMount(() => {
    //Check if local storage is expired
    const savedDate = loadItem('colorCodeExpires')
    if (savedDate) {
      const currentDate = new Date().getUTCDate()
      if (currentDate != parseInt(savedDate)) {
        clearStorage()
      }
    }

    const savedWin = loadItem('win')
    if (savedWin) {
      setWin(savedWin === 'true')
    }

    const savedLose = loadItem('lose')
    if (savedLose) {
      setLose(savedLose === 'true')
    }

    //Check if tutorial already viewed
    // const savedTutorial = loadItem('tutorial')
    // if (savedTutorial) {
    //   setTutorial(savedTutorial === 'true')
    // } else {
    // }
    if(!win() && !lose()) setTutorial(true)

    //Check if color already exists in storage
    const savedColor = loadItem('colorCode')
    if (savedColor) {
      setColorCode(savedColor)
    }

    //Populate state with local storage data
    const savedTries = loadItem('tries')
    if (savedTries) {
      setTries(JSON.parse(savedTries))
    }

    const savedRow = loadItem('currentRow')
    if (savedRow) {
      setCurrentRow(parseInt(savedRow))
    }

    const savedUserColor = loadItem('userColor')
    if (savedUserColor) {
      setUserCode(savedUserColor)
    }

    const newColor = getRandomHexCode()

    //Save in local storage with expiration date of 1 day
    saveItem('colorCode', newColor)
    saveItem('colorCodeExpires', new Date().getUTCDate().toString())
    setColorCode(newColor)
  })

  const handleInput = (color: string) => {
    const checkResult = checkInput(color, colorCode())
    tries()[currentRow()] = checkResult

    setUserCode(color)
    setTries([...tries()])
    setCurrentRow(currentRow() + 1)

    saveItem('userColor', color)
    saveItem('tries', JSON.stringify(tries()))
    saveItem('currentRow', currentRow().toString())

    if (color === colorCode()) {
      setWin(true)
      setParticle(true)
      saveItem('win', 'true')
    }

    if (currentRow() === 8) {
      setLose(true)
      saveItem('lose', 'true')
    }
  }

  const handleStart = () => {
    saveItem('tutorial', 'false')
    setTimeout(() => {
      setTutorial(false)
    }, 500)
  }

  return (
    <div
      class={styles.App}
      style={{
        background: `linear-gradient(90deg, ${colorCode()} 0%, ${userCode()} 100%)`,
      }}
    >
      <header class={styles.content}>
        {tutorial() && <Tutorial handleStart={handleStart} />}
        <div>
          <span class={styles.headerRow}>
            <h1 class={styles.hexle}>Hexle </h1>- Guess the color
          </span>
        </div>
        <div class={styles.guessRow}>
          {(win() || lose()) && <ResultScreen colorCode={colorCode()} won={win()} lost={lose()}/>}
          {tries().map((_, i) => (
            <div class={styles.inputRow}>
              <InputRow
                checkInput={(userColor: string) =>
                  checkInput(userColor, colorCode())
                }
                handleInput={handleInput}
                active={!win() && i === currentRow()}
                defaultValue={tries()[i]}
              />
            </div>
          ))}
        </div>
        <div class={styles.footer}>
          <a
            target="_blank"
            class={styles.link}
            href="https://www.paypal.com/donate/?hosted_button_id=WX9MSDGB823U8"
          >
            Buy me a coffee ☕
          </a>
          <a
            target="_blank"
            class={styles.link}
            href="https://www.instagram.com/otter.on.tour/"
          >
            Made by Otterman 🦦
          </a>
          <a
            target="_blank"
            class={styles.link}
            href="https://github.com/K1ngcuber/Hexle"
          >
            Source code 📝
          </a>
        </div>
      </header>
    </div>
  )
}

export default App
