import { Chess, Square } from 'chess.js'
import { FC, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import AppContext from './AppContext'
import Background from './Background'
import Button from './Button'
import { getChecksCapturesThreats } from './checksCapturesThreats'
import { squaresToSan, vectorToSquare } from './converters'
import Moves, { MoveColor } from './Moves'
import Piece from './Piece'

const { width } = Dimensions.get('window')

const Board: FC = () => {
  const [selectedSquare, setSelectedSquare] = useState<Square>()
  const [moves, setMoves] = useState<string[]>([])
  const [correctMoves, setCorrectMoves] = useState<string[]>([])

  const chess = new Chess('1nr2rk1/pb2qpp1/1p1p1n1p/3Pp3/2P1N3/P2B1N2/1PQ2PPP/2RR2K1 w - - 1 17')

  const onSquareClicked = (square: Square) => {
    // if square is already selected, deselect it and return
    if (square === selectedSquare) {
      setSelectedSquare(undefined)
      return
    }

    // else if square has moveable piece, select it and return
    const piece = chess.get(square)
    if (piece?.color === chess.turn()) {
      setSelectedSquare(square)
      return
    }

    // else if a square was already selected and it's a legal move, record the move
    if (selectedSquare) {
      const san = squaresToSan(chess.fen(), selectedSquare, square)
      if (san && !moves.includes(san)) setMoves([...moves, san])
    }

    // select nothing
    setSelectedSquare(undefined)
  }

  const displayMoves = [
    ...moves.map<MoveColor>(move => ({
      move,
      color: correctMoves.includes(move) ? 'green' : 'black',
    })),
    ...correctMoves
      .filter(move => !moves.includes(move))
      .map<MoveColor>(move => ({ move, color: 'red' })),
  ]

  return (
    <View>
      <Moves moves={displayMoves} onPress={move => setMoves(moves.filter(m => m !== move))} />
      <View style={styles.container}>
        <AppContext.Provider value={{ selectedSquare, onSquareClicked }}>
          <Background />
        </AppContext.Provider>
        {chess.board().map((row, y) =>
          row.map((piece, x) => {
            if (piece !== null) {
              return (
                <Piece
                  key={`${x}-${y}`}
                  id={`${piece.color}${piece.type}` as const}
                  startPosition={{ x, y }}
                  onPress={() => onSquareClicked(vectorToSquare({ x, y }))}
                />
              )
            }
            return null
          }),
        )}
        <Button onPress={() => setCorrectMoves(getChecksCapturesThreats(chess))}>Done</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({ container: { flex: 2, width } })

export default Board
