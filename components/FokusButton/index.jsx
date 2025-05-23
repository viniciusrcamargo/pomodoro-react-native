import {Pressable, Text, StyleSheet} from 'react-native';

export default function FokusButton({onPress}) {
    return(
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>
            Pressionar
          </Text>
          </Pressable>
    )
}

const styles = StyleSheet.create({
     button:{
    backgroundColor: '#B872FF',
    borderRadius: 32,
    padding: 10,
  },
  buttonText:{
    textAlign: 'center',
    color: '#021123',
    fontSize: 18,
  },
})