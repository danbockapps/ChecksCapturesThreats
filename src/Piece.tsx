import React, { FC } from 'react'
import { Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

const { width } = Dimensions.get('window')
const SIZE = width / 8
const styles = StyleSheet.create({ piece: { width: SIZE, height: SIZE } })
type Player = 'b' | 'w'
type Type = 'q' | 'r' | 'n' | 'b' | 'k' | 'p'
type Piece = `${Player}${Type}`
type Pieces = Record<Piece, ReturnType<typeof require>>
export const PIECES: Pieces = {
  bp: require('../assets/bp.png'),
  bn: require('../assets/bn.png'),
  br: require('../assets/br.png'),
  bb: require('../assets/bb.png'),
  bq: require('../assets/bq.png'),
  bk: require('../assets/bk.png'),
  wr: require('../assets/wr.png'),
  wn: require('../assets/wn.png'),
  wb: require('../assets/wb.png'),
  wq: require('../assets/wq.png'),
  wk: require('../assets/wk.png'),
  wp: require('../assets/wp.png'),
}

interface Props {
  id: Piece
  startPosition: { x: number; y: number }
  onPress: () => void
}

const Piece: FC<Props> = props => {
  const style = StyleSheet.create({
    view: {
      position: 'absolute',
      transform: [
        { translateX: props.startPosition.x * SIZE },
        { translateY: props.startPosition.y * SIZE },
      ],
    },
  })

  return (
    <View style={style.view}>
      <TouchableWithoutFeedback onPressIn={props.onPress} onPressOut={() => console.log(props.id)}>
        <Image source={PIECES[props.id]} style={styles.piece} />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Piece
