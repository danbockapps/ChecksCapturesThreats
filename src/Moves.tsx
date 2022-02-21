import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  moves: string[]
}

const Moves: FC<Props> = props => (
  <View>
    {props.moves.map((move, i) => (
      <View key={i} style={styles.move}>
        <Text>{move}</Text>
      </View>
    ))}
  </View>
)

const styles = StyleSheet.create({ move: { borderWidth: 1 } })

export default Moves
