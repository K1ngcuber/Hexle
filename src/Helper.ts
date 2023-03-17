export const generateRandomHex = (length: number): string => {
  let result = "";
  const characters = "0123456789ABCDEF";
  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
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
