import { Component, createSignal, onMount } from "solid-js";
import { TryResult } from "./App";
import styles from "./App.module.css";

type InputProps = {
  isEnabled?: boolean;
  handleNext: Function;
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
      class={`${styles.input} ${styles[props.defaultValue?.result || ""]}`}
      value={letter()}
      disabled={!props.isEnabled}
      onInput={handleInput}
    />
  );
};
