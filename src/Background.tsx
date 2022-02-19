import React, { FC } from 'react'
import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native'

const LIGHT = 'rgb(100, 133, 68)'
const DARK = 'rgb(230, 233, 198)'

const styles = StyleSheet.create({ container: { flex: 1, flexDirection: 'row' } })

interface BaseProps {
  white: boolean
}

interface RowProps extends BaseProps {
  row: number
}

interface SquareProps extends RowProps {
  col: number
}

const Square: FC<SquareProps> = props => {
  const backgroundColor = props.white ? LIGHT : DARK
  const color = props.white ? DARK : LIGHT
  const textStyle: StyleProp<TextStyle> = { fontWeight: '500' as const, color, fontSize: 9 }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        padding: 4,
        justifyContent: 'space-between',
      }}
    >
      <Text style={[textStyle, { opacity: props.col === 0 ? 1 : 0 }]}>{'' + (8 - props.row)}</Text>
      {props.row === 7 && (
        <Text style={[textStyle, { alignSelf: 'flex-end' }]}>
          {String.fromCharCode(97 + props.col)}
        </Text>
      )}
    </View>
  )
}

const Row: FC<RowProps> = props => {
  const offset = props.white ? 0 : 1
  return (
    <View style={styles.container}>
      {new Array(8).fill(0).map((_, i) => (
        <Square row={props.row} col={i} key={i} white={(i + offset) % 2 === 1} />
      ))}
    </View>
  )
}

const Background: FC = () => {
  return (
    <View style={{ flex: 1 }}>
      {new Array(8).fill(0).map((_, i) => (
        <Row key={i} white={i % 2 === 0} row={i} />
      ))}
    </View>
  )
}

export default Background
