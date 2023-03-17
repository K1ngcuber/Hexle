import { Component, createSignal } from "solid-js";
import { Input } from "./Input";
import styles from "./App.module.css";
import { TryResult } from "./App";

type InputRowProps = {
  handleInput?: Function;
  active: boolean;
  defaultValue: TryResult[];
  bla: any;
};

export const InputRow: Component<InputRowProps> = (props) => {
  const [inputRefs, setInputRefs] = createSignal([] as HTMLInputElement[]);
  const [colorCode, setColorCode] = createSignal("#000000");

  //Select the next input field
  const handleNext = (index: number, letter: string) => {
    //update colorCode
    setColorCode(
      colorCode().slice(0, index + 1) + letter + colorCode().slice(index + 2)
    );

    if (index === 5) {
      props.handleInput!(colorCode());
    }

    if (inputRefs()[index + 1]) {
      inputRefs()[index + 1].focus();
    }
  };

  return (
    <div class={styles.inputRow}>
      <p>#</p>
      {/* Loop 6 times */}
      {Array.from({ length: 6 }, (_, i) => (
        <Input
          ref={(el: HTMLInputElement) => setInputRefs([...inputRefs(), el])}
          index={i}
          handleNext={handleNext}
          isEnabled={props.active}
          defaultValue={props.defaultValue ? props.defaultValue[i] : undefined}
        />
      ))}
    </div>
  );
};
