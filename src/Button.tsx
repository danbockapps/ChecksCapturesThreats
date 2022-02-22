import { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
  onPress: () => void
}

const Button: FC<Props> = props => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.children}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    borderRadius: 5,
    height: 50,
    backgroundColor: '#999933',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
})

export default Button
