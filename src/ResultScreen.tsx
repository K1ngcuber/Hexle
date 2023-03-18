import { Component, createSignal, onMount } from 'solid-js'
import { startParticles } from './AnimationHelper'
import styles from './App.module.css'

type WinProps = {
  colorCode: string;
  won: boolean;
  lost: boolean;
}

export const ResultScreen: Component<WinProps> = (props) => {
  const [timeString, setTimeString] = createSignal('')

  onMount(() => {
    if (props.won) {
      startParticles()
    }
    // Start countdown
    countdown()
  })

  const getContrastColor = () => {
    // Convert hexcode to RGB values
    const r = parseInt(props.colorCode.slice(1, 3), 16)
    const g = parseInt(props.colorCode.slice(3, 5), 16)
    const b = parseInt(props.colorCode.slice(5, 7), 16)

    // Calculate relative luminance of color
    const luminance =
      0.2126 * (r / 255) ** 2.2 +
      0.7152 * (g / 255) ** 2.2 +
      0.0722 * (b / 255) ** 2.2

    // Choose contrasting color based on luminance
    return luminance > 0.5 ? '#000000' : '#FFFFFF'
  }

  const countdown = () => {
    // Get time string
    setTimeString(getTimeString())

    // Update time string every second
    setTimeout(countdown, 1000)
  }

  //calculate difference between current time and next day in utc
  const getTimeString = (): string => {
    const now = Date.now() // current time in milliseconds
    const tomorrow = new Date() // create a new Date object
    tomorrow.setUTCHours(24, 0, 0, 0) // set the time to 00:00:00 UTC tomorrow

    const remainingTime = Math.floor((tomorrow.getTime() - now) / 1000) // calculate the remaining time in seconds

    const hours = Math.floor(remainingTime / 3600) // calculate the number of hours
    const minutes = Math.floor((remainingTime % 3600) / 60) // calculate the number of minutes
    const seconds = remainingTime % 60 // calculate the number of seconds

    return `${hours}h ${minutes}m ${seconds}s` // return the formatted string
  }

  return (
    <div class={styles.win}>
      <h1
        style={{
          color: getContrastColor(),
        }}
        class={styles.winHeader}
      >
        {props.won && 'Congratulations'}
        {props.lost && 'Game Over'}
      </h1>
      <div
        style={{
          color: getContrastColor(),
        }}
      >
        The color was: {props.colorCode}
      </div>
      <div style={{ color: getContrastColor() }}>Next in {timeString()}</div>
    </div>
  )
}
