import { Component, createSignal, onMount } from "solid-js";
import styles from "./App.module.css";

type WinProps = {
  colorCode: string;
};

export const Win: Component<WinProps> = (props) => {
  const [timeString, setTimeString] = createSignal("");

  onMount(() => {
    // Start countdown
    countdown();
  });

  const getContrastColor = () => {
    // Convert hexcode to RGB values
    const r = parseInt(props.colorCode.slice(1, 3), 16);
    const g = parseInt(props.colorCode.slice(3, 5), 16);
    const b = parseInt(props.colorCode.slice(5, 7), 16);

    // Calculate relative luminance of color
    const luminance =
      0.2126 * (r / 255) ** 2.2 +
      0.7152 * (g / 255) ** 2.2 +
      0.0722 * (b / 255) ** 2.2;

    // Choose contrasting color based on luminance
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  const countdown = () => {
    // Get time string
    setTimeString(getTimeString());

    // Update time string every second
    setTimeout(countdown, 1000);
  };

  const getTimeString = () => {
    // Calculate time until next day
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    const diff = nextDay.getTime() - now.getTime();

    // Convert milliseconds to seconds
    const seconds = Math.floor(diff / 1000);

    // Convert seconds to hours, minutes and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div class={styles.win}>
      <h1
        style={{
          color: getContrastColor(),
        }}
        class={styles.winHeader}
      >
        Congratulations
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
  );
};
