import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

function Announce(props) {
return (
  <View>
    <TouchableOpacity onPress={props.boardReset}>
      <Text style={props.winner[0] == 'R' ? styles.red : styles.blue}>{props.winner}</Text>
  </TouchableOpacity>
  </View>

)
}


const styles = StyleSheet.create({
  red: {
    color: 'red',
    fontSize: 50,
    height: 75,
    fontWeight: "900",
    textAlign: 'center',

  },
  blue: {
    color: 'blue',
    fontSize: 50,
    height: 75,
    fontWeight: "900",
    textAlign: 'center',

  },

});
export default Announce;