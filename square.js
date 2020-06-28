import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

function Square(props) {
  var row = props.rowS;
  var column = props.columnS;
    if (props.color === " "){
        return (
    <TouchableOpacity style={styles.whiteCircle} onPress={() => (props.addPiece(column))} />
      );
    } else if (props.color === "R"){
      return (
    <TouchableOpacity style={styles.redCircle} onPress={() => (props.addPiece(column))} />
  );
  } else if (props.color === "B") {
      return (
    <TouchableOpacity style={styles.blueCircle} onPress={() => (props.addPiece(column))} />
  );
  }
}

var circleSize = 44;

const styles = StyleSheet.create({
whiteCircle: {
  width: circleSize,
  height: circleSize,
  backgroundColor: "white",
  borderRadius: circleSize / 2,
  margin: 5
},

redCircle: {
  width: circleSize,
  height: circleSize,
  backgroundColor: "red",
  borderRadius: circleSize / 2,
  margin: 5
},
blueCircle: {
  width: circleSize,
  height: circleSize,
  backgroundColor: "blue",
  borderRadius: circleSize / 2,
  margin: 5
}
})

export default Square;