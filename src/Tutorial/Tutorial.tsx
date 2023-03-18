import { Component, createSignal, onMount } from 'solid-js'

import tutorialStyles from './Tutorial.module.css'
import appStyles from '../App.module.css'

export const Tutorial: Component<{ handleStart: Function }> = (props) => {
  const [fadeOut, setFadeOut] = createSignal(false)
  const [color, setColor] = createSignal('rgb(255,0,255)')

  onMount(() => {
    document.addEventListener('mousemove', function (event) {
      // Get the x and y positions of the mouse
      var x = event.clientX
      var y = event.clientY

      // Generate a random color based on the mouse position
      var r = Math.floor((x / window.innerWidth) * 256)
      var g = Math.floor((y / window.innerHeight) * 256)
      var b = Math.floor(Math.random() * 256)

      // Generate the RGB color string
      var color = 'rgb(' + r + ', ' + g + ', ' + b + ')'

      setColor(color)
    })
  })

  const handleStart = () => {
    setFadeOut(true)
    props.handleStart()
  }

  return (
    <div
      class={`${tutorialStyles.tutorialModal} ${
        fadeOut() && tutorialStyles.fadeOut
      }`}
    >
      <h1>Hexle</h1>
      <p>
        Looking for a fun and addictive game that will put your color knowledge
        to the test? <br />
        Check out Hexle! <br /> In this game, instead of guessing words, you'll
        be trying to guess a hex color code in just 10 tries. <br />
        <br />A Hex Color Code is a six-character combination of letters A-F and
        numbers 0-9, that represents a specific color. For example,{' '}
        <span class={tutorialStyles.tutorialRed}>#FF0000</span> is red,{' '}
        <span class={tutorialStyles.tutorialGreen}>#00FF00</span> is green, and{' '}
        <span class={tutorialStyles.tutorialBlue}>#0000FF</span> is blue. <br />
        Mixing these colors together will give you a variety of other{' '}
        <span style={{ 'border-bottom': `2px solid ${color()}` }}>colors</span>.
        <br />
        <br />
        Every guess will be marked either yellow or green. <br />A{' '}
        <span class={tutorialStyles.tutorialYellow}>yellow</span> mark means
        that the letter or number is in the color code, but the wrong position.
        <br />A <span class={tutorialStyles.tutorialGreen}>green</span> mark
        means that the letter or number is in the correct position.
      </p>
      <div class={appStyles.inputRow}>
        <div class={appStyles.hashTag}>#</div>
        <input class={appStyles.input} disabled value="2" />
        <input
          class={appStyles.input + ' ' + appStyles.Exact}
          disabled
          value="9"
        />
        <input class={appStyles.input} disabled value="0" />
        <input class={appStyles.input} disabled value="7" />
        <input
          class={appStyles.input + ' ' + appStyles.Close}
          disabled
          value="4"
        />
        <input
          class={appStyles.input + ' ' + appStyles.Exact}
          disabled
          value="3"
        />
      </div>
      <p>
        Are you ready to challenge yourself and embark on this colorful
        adventure?
      </p>
      <button
        onClick={() => handleStart()}
        class={tutorialStyles.tutorialButton}
      >
        Start
      </button>
    </div>
  )
}
