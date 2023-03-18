export const getRandomHexCode = (): string => {
  const now = new Date() // create a new Date object
  now.setUTCHours(0, 0, 0, 0) // set the time to midnight (UTC
  const utcTimestamp = now.valueOf() // get the UTC timestamp in milliseconds
  const hexCode =
    '#' + ((utcTimestamp & 0xffffff) + 0x1000000).toString(16).slice(1) // generate a random 6-digit hexcode based on the UTC timestamp
  return hexCode
}

export const seedRandom = (seed: string): (() => number) => {
  const state = new Array(4)
  state[0] = 0xf1_ea_5e_ed
  state[1] = 0xe4_bd_6e_46
  state[2] = 0x8c_df_5d_5d
  state[3] = 0x8a_b8_b0_94

  // Mix the seed into the state array
  for (let i = 0; i < seed.length; i++) {
    state[i % 4] ^= seed.charCodeAt(i) << ((i % 8) * 8)
  }

  // Define the random number generator function
  function rng(): number {
    const t = state[0] ^ (state[0] << 11)
    state[0] = state[1]
    state[1] = state[2]
    state[2] = state[3]
    state[3] = state[3] ^ (state[3] >>> 19) ^ (t ^ (t >>> 8))
    return state[3] / 0x1_00_00_00_00
  }

  // Return the random number generator function
  return rng
}

export type TryResult = {
  value: string
  result: 'Exact' | 'Close' | 'None'
}

export const checkInput = (input: string, colorCode: string): TryResult[] => {
  //without the hastag
  input = input.toUpperCase().slice(1)
  colorCode = colorCode.toUpperCase().slice(1)
  const tryResult = [] as TryResult[]

  //create a list of 6 tryresults
  for (let i = 0; i < 6; i++) {
    tryResult.push({
      value: input[i],
      result: 'None',
    })
  }

  //check how often each letter appears in the color code
  const colorCodeLetterCount = {} as Record<string, number>
  for (const letter of colorCode) {
    if (colorCodeLetterCount[letter]) {
      colorCodeLetterCount[letter]++
    } else {
      colorCodeLetterCount[letter] = 1
    }
  }

  //check for matching letters
  for (let i = 0; i < 6; i++) {
    if (input[i] === colorCode[i]) {
      tryResult[i].result = 'Exact'
      colorCodeLetterCount[colorCode[i]]--
    }
  }

  //check for close matches
  for (let i = 0; i < 6; i++) {
    if (colorCodeLetterCount[input[i]] && tryResult[i].result === 'None') {
      tryResult[i].result = 'Close'
      colorCodeLetterCount[input[i]]--
    }
  }
  



  return tryResult
}
