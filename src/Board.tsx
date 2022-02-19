import { Chess } from 'chess.js'
import React, { FC } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Background from './Background'
import Piece from './Piece'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({ container: { width, height: width } })

const Board: FC = () => {
  const chess = new Chess()
  return (
    <View style={styles.container}>
      <Background />
      {chess.board().map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            return (
              <Piece
                key={`${x}-${y}`}
                id={`${piece.color}${piece.type}` as const}
                startPosition={{ x, y }}
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
