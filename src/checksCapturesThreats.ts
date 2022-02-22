import { ChessInstance } from 'chess.js'

export const getChecksCapturesThreats = (ch: ChessInstance) =>
  Array.from(new Set([...getChecks(ch), ...getCaptures(ch), ...getThreats(ch)]))

const getChecks = (ch: ChessInstance) => ch.moves().filter(m => m.includes('+'))

const getCaptures = (ch: ChessInstance) =>
  ch
    .moves({ verbose: true })
    .filter(m => m.flags.includes('c'))
    .map(m => m.san)

const getThreats = (ch: ChessInstance) => []
