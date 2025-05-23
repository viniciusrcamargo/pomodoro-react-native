import { Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function ActionButton({active, onPress, display}) {
     return(
     <Pressable
              onPress={onPress}
              style={active ? styles.contextButtonActive : styles.contextButtonText}
            >
              <Text style={styles.contextButtonText}>{display}</Text>
    </Pressable>
    )
}

const styles = StyleSheet.create({
     contextButtonText: {
    fontSize: 12.5,
    color: '#FFF',
    padding: 8
},
  contextButtonActive: {
    backgroundColor: '#144480',
    borderRadius: 8
},
})