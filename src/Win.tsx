import { Component } from "solid-js";
import styles from "./App.module.css";

type WinProps = {
  colorCode: string;
};

export const Win: Component<WinProps> = (props) => {
  return (
    <div class={styles.win}>
      <h1 class={styles.winHeader}>Congratulations</h1>
      <div>The color was: {props.colorCode}</div>
    </div>
  );
};
