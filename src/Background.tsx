import React, { FC, useContext } from 'react'
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import AppContext from './AppContext'
import { vectorToSquare } from './converters'

const LIGHT = 'rgb(100, 133, 68)'
const DARK = 'rgb(230, 233, 198)'

interface BaseProps {
  light: boolean
}

interface RowProps extends BaseProps {
  row: number
}

interface SquareProps extends RowProps {
  col: number
}

const Square: FC<SquareProps> = props => {
  const color = props.light ? DARK : LIGHT
  const textStyle: StyleProp<TextStyle> = { ...styles.text, color }

  const context = useContext(AppContext)
  const square = vectorToSquare({ x: props.col, y: props.row })

  return (
    <TouchableWithoutFeedback onPressIn={() => context.onSquareClicked(square)}>
      <View
        style={{
          ...styles.square,
          backgroundColor:
            // TODO memoize this so only the square that needs to rerenders
            square === context.selectedSquare ? 'orange' : props.light ? LIGHT : DARK,
        }}
      >
        <Text style={[textStyle, { opacity: props.col === 0 ? 1 : 0 }]}>
          {'' + (8 - props.row)}
        </Text>
        {props.row === 7 && (
          <Text style={[textStyle, { alignSelf: 'flex-end' }]}>
            {String.fromCharCode(97 + props.col)}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const Row: FC<RowProps> = props => {
  const offset = props.light ? 0 : 1
  return (
    <View style={styles.row}>
      {new Array(8).fill(0).map((_, i) => (
        <Square row={props.row} col={i} key={i} light={(i + offset) % 2 === 1} />
      ))}
    </View>
  )
}

const Background: FC = () => {
  return (
    <View>
      {new Array(8).fill(0).map((_, i) => (
        <Row key={i} light={i % 2 === 0} row={i} />
      ))}
    </View>
  )
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  square: { height: width / 8, flex: 1, padding: 4, justifyContent: 'space-between' },
  text: { fontWeight: '500', fontSize: 9 },
})

export default Background
