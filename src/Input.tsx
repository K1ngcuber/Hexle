import { Component, createSignal, onMount } from "solid-js";
import { TryResult } from "./App";
import styles from "./App.module.css";

type InputProps = {
  isEnabled?: boolean;
  isFlipped?: string;
  handleNext: Function;
  handleRemove: Function;
  index: number;
  ref?: any;
  defaultValue?: TryResult;
};

export const Input: Component<InputProps> = (props) => {
  const [letter, setLetter] = createSignal("");
  onMount(() => {
    setLetter(props.defaultValue?.value || "");
  });

  const handleInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    // Only allow letters A-F and numbers 0-9
    if (!/^[0-9A-F]$/i.test(value)) {
      // Clear the input field
      (e.target as HTMLInputElement).value = "";

      return;
    }

    setLetter(value);
    props.handleNext(props.index, value);
  };

  return (
    <input
      ref={props.ref}
      class={`${styles.input} ${
        props.defaultValue?.result === "Exact" ? styles.Exact : ""
      } ${props.defaultValue?.result === "Close" ? styles.Close : ""} ${
        props.isFlipped === "" ? "" : styles.flip
      } ${props.isFlipped === "Exact" ? styles.Exact : ""} ${
        props.isFlipped === "Close" ? styles.Close : ""
      }`}
      value={letter()}
      disabled={!props.isEnabled}
      onInput={handleInput}
      onKeyDown={(e) => {
        if (e.key === "Backspace") {
          props.handleRemove(props.index);
        }
      }}
    />
  );
};
