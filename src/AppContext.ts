import { Square } from 'chess.js'
import { createContext } from 'react'

interface AppContext {
  selectedSquare?: Square
  onSquareClicked: (square: Square) => void
}

export default createContext<AppContext>({
  selectedSquare: 'a1',
  onSquareClicked: () => {
    throw new Error('Context not initialized.')
  },
})
