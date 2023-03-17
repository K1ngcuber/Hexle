import { Component, createEffect, createSignal, onMount } from "solid-js";
import { Input } from "./Input";
import styles from "./App.module.css";
import { TryResult } from "./App";

type InputRowProps = {
  checkInput: Function;
  handleInput: Function;
  active: boolean;
  defaultValue: TryResult[];
};

export const InputRow: Component<InputRowProps> = (props) => {
  const [inputRefs, setInputRefs] = createSignal([] as HTMLInputElement[]);
  const [flipped, setFlipped] = createSignal(
    Array.from({ length: 6 }, () => "")
  );
  const [colorCode, setColorCode] = createSignal("#000000");

  onMount(() => {
    //Focus on the first input field
    inputRefs()[0].focus();
  });

  //Focus on the first field when active changes
  createEffect(() => {
    if (props.active) {
      inputRefs()[0].focus();
    }
  });

  const startFlipAnimation = async (check: TryResult[]) => {
    const allPromises = [] as Promise<any>[];
    //Flip one after the other
    for (let i = 0; i < 6; i++) {
      allPromises.push(
        new Promise((resolve) => {
          setTimeout(() => {
            setFlipped(
              flipped().map((value, index) =>
                index === i ? check.at(i)?.result ?? "None" : value
              )
            );
            resolve(true);
          }, i * 500);
        })
      );
    }

    //Reset the flip animation
    await Promise.all(allPromises);

    await new Promise((resolve) => {
      setTimeout(() => {
        setFlipped(Array.from({ length: 6 }, () => ""));
        resolve(true);
      }, 600);
    });
  };

  //Select the next input field
  const handleNext = async (index: number, letter: string) => {
    //update colorCode
    setColorCode(
      colorCode().slice(0, index + 1) + letter + colorCode().slice(index + 2)
    );

    if (index === 5 && colorCode().length === 7) {
      const result = props.checkInput(colorCode());
      await startFlipAnimation(result);

      props.handleInput(colorCode());
    }

    if (inputRefs()[index + 1]) {
      inputRefs()[index + 1].focus();
    }
  };

  //Remove the last input field and focus on the previous one
  const handleRemove = (index: number) => {
    if (index === 0) {
      return;
    }

    setColorCode(colorCode().slice(0, index) + colorCode().slice(index + 1));

    if (inputRefs()[index - 1]) {
      inputRefs()[index - 1].focus();
    }

    inputRefs()[index].value = "";
  };

  return (
    <div class={styles.inputRow}>
      <div class={styles.hashTag}>#</div>
      {/* Loop 6 times */}
      {flipped().map((value, i) => (
        <Input
          ref={(el: HTMLInputElement) => setInputRefs([...inputRefs(), el])}
          index={i}
          handleNext={handleNext}
          handleRemove={handleRemove}
          isEnabled={props.active}
          isFlipped={value}
          defaultValue={props.defaultValue ? props.defaultValue[i] : undefined}
        />
      ))}
    </div>
  );
};
