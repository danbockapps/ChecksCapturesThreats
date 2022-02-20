import { Chess, Square } from 'chess.js'
import { FC, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import AppContext from './AppContext'
import Background from './Background'
import { vectorToSquare } from './converters'
import Piece from './Piece'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({ container: { width, height: width } })

const Board: FC = () => {
  const [selectedSquare, setSelectedSquare] = useState<Square>()
  console.log('selectedSquare', selectedSquare)

  const chess = new Chess('1nr2rk1/pb2qpp1/1p1p1n1p/3Pp3/2P1N3/P2B1N2/1PQ2PPP/2RR2K1 w - - 1 17')
  return (
    <View style={styles.container}>
      <AppContext.Provider value={{ selectedSquare }}>
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
                onPress={() => setSelectedSquare(vectorToSquare({ x, y }))}
              />
            )
          }
          return null
        }),
      )}
    </View>
  )
}

export default Board
