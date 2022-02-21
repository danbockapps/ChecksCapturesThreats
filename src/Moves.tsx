import { FC } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

interface Props {
  moves: string[]
  onPress: (move: string) => void
}

const Moves: FC<Props> = props => (
  <View style={styles.moves}>
    {props.moves.map((move, i) => (
      <TouchableOpacity key={i} style={styles.move} onPress={() => props.onPress(move)}>
        <Text>{move}</Text>
      </TouchableOpacity>
    ))}
  </View>
)

const styles = StyleSheet.create({
  moves: { flexDirection: 'row', flexWrap: 'wrap' },
  move: {
    marginRight: 1.5,
    marginLeft: 1.5,
    marginBottom: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
  },
})

export default Moves
