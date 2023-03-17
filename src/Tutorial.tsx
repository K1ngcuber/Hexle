import { Component, createSignal } from "solid-js";
import styles from "./App.module.css";

export const Tutorial: Component<{ handleStart: Function }> = (props) => {
  const [fadeOut, setFadeOut] = createSignal(false);

  const handleStart = () => {
    setFadeOut(true);
    props.handleStart();
  };

  return (
    <div class={`${styles.tutorialModal} ${fadeOut() && styles.fadeOut}`}>
      <h1>Hexle</h1>
      <p>
        Welcome to the exciting world of guessing Hex Color Codes!
        <br />
        <br />
        In this game, you will have the chance to showcase your color
        recognition skills and guess the correct code.
        <br />
        <br />
        A Hex Color Code is a six-character combination of letters A-F and
        numbers 0-9, that represents a specific color.
        <br />
        <br />
        With every guess, you will receive feedback on how close you are to the
        correct color.
        <br />
        Are you ready to challenge yourself and embark on this colorful
        adventure? Get started now and see how quickly you can become a Hex
        Color Code master!
      </p>
      <button onClick={() => handleStart()} class={styles.tutorialButton}>
        Start
      </button>
    </div>
  );
};
