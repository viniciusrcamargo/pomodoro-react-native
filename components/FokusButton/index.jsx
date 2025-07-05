import {Pressable, Text, StyleSheet} from 'react-native';

export default function FokusButton({onPress, title, icon}) {
    return(
        <Pressable style={styles.button} onPress={onPress}>
          {icon}
          <Text style={styles.buttonText}>
            {title}
          </Text>
          </Pressable>
    )
}

const styles = StyleSheet.create({
     button:{
    backgroundColor: '#B872FF',
    borderRadius: 32,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center'},
  buttonText:{
    textAlign: 'center',
    color: '#021123',
    fontSize: 18,
  },
})