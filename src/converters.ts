import { Square } from 'chess.js'
export const vectorToSquare = (vector: { x: number; y: number }): Square =>
  `${String.fromCharCode(97 + vector.x)}${8 - vector.y}` as Square
