import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';

import Square from './square'


function Board(props) {
  let table = [];
  for (var i = 0; i < 6; i++) {
    let cells = [];
      for (var j = 0; j < 7; j++) {
        var unique = i.toString() + j.toString();
        cells.push(<Square key={unique} color={props.boardArray[i][j]} addPiece={props.addPiece} rowS={i} columnS={j}/>
      )}
      table.push(<View key={Math.floor(Math.random()*1000000)} style={styles.tableRow}>{cells}</View>);
      }

  return (
        <View style={styles.table}>{table}</View>
  )
}

const styles = StyleSheet.create({
table: {
  flex: 1,
  flexDirection: 'column',
  //borderCollapse: "collapse",
  minHeight: 250,
  width: 400,
  margin: "auto",
  height: 300,
  maxHeight: 350,
  alignItems: "center",
  backgroundColor: "yellow",
},
tableRow:{
  flex: 1,
  flexDirection: 'row',
  backgroundColor: 'yellow',
  width: "auto",

}

})


export default Board;