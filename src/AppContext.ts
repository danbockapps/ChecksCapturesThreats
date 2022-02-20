import { Square } from 'chess.js'
import { createContext } from 'react'

interface AppContext {
  selectedSquare?: Square
}

export default createContext<AppContext | null>(null)
