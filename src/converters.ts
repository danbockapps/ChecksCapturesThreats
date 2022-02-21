import { Square, Chess } from 'chess.js'

export const vectorToSquare = (vector: { x: number; y: number }): Square =>
  `${String.fromCharCode(97 + vector.x)}${8 - vector.y}` as Square

export const squaresToSan = (fen: string, from: Square, to: Square) => {
  const ch = new Chess(fen)
  return ch.move({ from, to })?.san
}
