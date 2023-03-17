import { batch, Component, createSignal, onMount } from "solid-js";

import styles from "./App.module.css";
import { seedRandom } from "./Helper";
import { InputRow } from "./InputRow";

export type TryResult = {
  value: string;
  result: "Exact" | "Close" | "None";
};

const App: Component = () => {
  const [currentRow, setCurrentRow] = createSignal(0);
  const [colorCode, setColorCode] = createSignal("#000000");
  const [userCode, setUserCode] = createSignal("#000000");
  //create empty tries array with 6 rows
  const [tries, setTries] = createSignal(
    Array.from({ length: 6 }, () => []) as TryResult[][]
  );

  onMount(() => {
    // Get the current date
    const today = new Date();

    // Get the day of the year (1-365)
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        1000 /
        60 /
        60 /
        24
    );

    // Use the day of the year as a seed value for the random number generator
    const rng = seedRandom(dayOfYear.toString());

    // Generate a random hex code
    const randomCode = ((rng() * 0xff_ff_ff) << 0).toString(16);
    const hexCode = `000000${randomCode}`.slice(-6);

    setColorCode(`#${hexCode}`);
  });

  const checkInput = (input: string): TryResult[] => {
    const tryResult = [] as TryResult[];

    for (let i = 1; i <= 6; i++) {
      if (input[i].toLocaleLowerCase() === colorCode()[i].toLocaleLowerCase()) {
        tryResult.push({ value: input[i], result: "Exact" });
      } else if (
        colorCode().toLocaleLowerCase().includes(input[i].toLocaleLowerCase())
      ) {
        tryResult.push({ value: input[i], result: "Close" });
      } else {
        tryResult.push({ value: input[i], result: "None" });
      }
    }
    return tryResult;
  };

  const handleInput = (color: string) => {
    const checkResult = checkInput(color);
    tries()[currentRow()] = checkResult;

    if (color === colorCode()) {
      alert("You win!");
      return;
    }

    setUserCode(color);
    setTries([...tries()]);
    setCurrentRow(currentRow() + 1);
  };

  return (
    <div
      class={styles.App}
      style={{
        background: `linear-gradient(90deg, ${colorCode()} 0%, ${userCode()} 100%)`,
      }}
    >
      <header class={styles.header}>
        <span class={styles.headerRow}>
          <h1>Hexle</h1> Guess the color
        </span>
        {tries().map((_, i) => (
          <div class={styles.inputRow}>
            <InputRow
              handleInput={handleInput}
              active={i === currentRow()}
              defaultValue={tries()[i]}
              bla={console.log(tries()[i])}
            />
          </div>
        ))}
      </header>
    </div>
  );
};

export default App;
