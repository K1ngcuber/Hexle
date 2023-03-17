export const generateRandomHex = (): string => {
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

  return `#${hexCode}`;
};

export const seedRandom = (seed: string): (() => number) => {
  const state = new Array(4);
  state[0] = 0xf1_ea_5e_ed;
  state[1] = 0xe4_bd_6e_46;
  state[2] = 0x8c_df_5d_5d;
  state[3] = 0x8a_b8_b0_94;

  // Mix the seed into the state array
  for (let i = 0; i < seed.length; i++) {
    state[i % 4] ^= seed.charCodeAt(i) << ((i % 8) * 8);
  }

  // Define the random number generator function
  function rng(): number {
    const t = state[0] ^ (state[0] << 11);
    state[0] = state[1];
    state[1] = state[2];
    state[2] = state[3];
    state[3] = state[3] ^ (state[3] >>> 19) ^ (t ^ (t >>> 8));
    return state[3] / 0x1_00_00_00_00;
  }

  // Return the random number generator function
  return rng;
};

export type TryResult = {
  value: string;
  result: "Exact" | "Close" | "None";
};

export const checkInput = (input: string, colorCode: string): TryResult[] => {
  const tryResult = [] as TryResult[];

  for (let i = 1; i <= 6; i++) {
    if (input[i].toLocaleLowerCase() === colorCode[i].toLocaleLowerCase()) {
      tryResult.push({ value: input[i], result: "Exact" });
    } else if (
      colorCode.toLocaleLowerCase().includes(input[i].toLocaleLowerCase()) &&
      !tryResult.some((x) => x.value === input[i]) &&
      !input.slice(0, i).includes(input[i])
    ) {
      tryResult.push({ value: input[i], result: "Close" });
    } else {
      tryResult.push({ value: input[i], result: "None" });
    }
  }
  return tryResult;
};
