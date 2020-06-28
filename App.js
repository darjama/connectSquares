import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Square from './square';
import Board from './c4board';
import Announce from './Announce'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],],
      gameOver: false,
      currentPlayer: 'R',
      winner: ''
    };
  }

  addPiece (column) {
    if (this.state.board[0][column] !== ' ') {
      alert("That column is full, please pick another");
      return;
    }
    if (this.state.gameOver) {
      return;
    }
    var row;
    for (var i = this.state.board.length -1; i >= 0; i--) {
      if (this.state.board[i][column] === ' ') {
        var tempBoard = this.state.board;
        tempBoard[i][column] = this.state.currentPlayer
       this.setState ({
         board: tempBoard
       })
        this.forceUpdate();
        row = i;
        this.winTest(row, column);
        this.drawTest();
        return;
      }
    }
  }

  boardReset(){
    this.setState({
      gameOver: false,
      board: [[' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],],
      winner: ''
    })

  }
  currentPlayerToggle (){
    if (this.state.currentPlayer === 'R') {
      this.setState({
        currentPlayer: 'B'
      })
    } else {
      this.setState({
        currentPlayer: 'R'
      })
    }
  }

  drawTest () {
    if ( this.state.board[0].indexOf(' ') === -1) {
      this.setState({
        gameOver: true,
        winner: "No One Wins :("
      })
    }
  }

  winTest (row, column) {
    var won;
    if (this.horizontalTest(row) ||
    this.verticalTest(column) ||
    this.diagonalTestRTL(row, column) ||
    this.diagonalTestLTR(row, column))
    {
      //announce winner
      if (this.state.currentPlayer === 'R') {
        won = "RED WINS!!!"
      } else {
        won = "BLUE WINS!!!"
      }
      this.setState({
        gameOver: true,
        winner: won
      })

    } else {
      this.currentPlayerToggle();
    }
  }


    horizontalTest (row){
      var color = this.state.currentPlayer;
      var winSet = color + color + color + color;
      var rowString = this.state.board[row].join('');
      if (rowString.indexOf(winSet) > -1) {
        return true;
      } else {
        return false;
      }
    }

    verticalTest (column){
      var color = this.state.currentPlayer;
      var winSet = color + color + color + color;
      var columnString = '';
      for (var i = 0; i < this.state.board.length; i++) {
        columnString = columnString + this.state.board[i][column];
      }
      if (columnString.indexOf(winSet) > -1) {
        return true;
      } else {
        return false;
      }
    }

    diagonalTestLTR (row, column){
      var j;
      var i;
      var color = this.state.currentPlayer;
      var winSet = color + color + color + color;
      var diagLTRString = '';
      i = row;
      j = column;
      while (i < 6 && j < 7) {
        diagLTRString = this.state.board[i][j] + diagLTRString;
        i ++;
        j ++;
      }
      i = row - 1;
      j = column - 1;
      while (i >= 0 && j >= 0) {
        diagLTRString = diagLTRString + this.state.board[i][j];
        i --;
        j--;
      }
      if (diagLTRString.indexOf(winSet) > -1) {
        return true;
      } else {
        return false;
      }
    }

    diagonalTestRTL (row, column){
      var i; var j;
      var color = this.state.currentPlayer;
      var winSet = color + color + color + color;
      var diagRTLString = '';
      i = row;
      j = column;
      while (i < 6 && j >= 0) {
        diagRTLString = this.state.board[i][j] + diagRTLString;
        i ++;
        j --;
      }
      i = row - 1;
      j = column + 1;
      while (i >= 0 && j < 7) {
        diagRTLString = diagRTLString + this.state.board[i][j];
        i --;
        j++;
      }
      if (diagRTLString.indexOf(winSet) > -1) {
        return true;
      } else {
        return false;
      }
    }

  render() {

    return (

        <View style={{backgroundColor: 'teal', position:'absolute', left:0, bottom: 0, top: 0, right: 0}}>
          <View style={{justifyContent: 'flex-end', height: 60}}>
            <Text style={styles.title}>C4 - Family Fun!
            </Text>
          </View>
          <Announce winner={this.state.winner} boardReset={this.boardReset.bind(this)}/>
          <View style={{zIndex: 1, flex: 1, height: 325, alignItems: 'center', justifyContent: 'flex-start'}}>
            <Board addPiece={this.addPiece.bind(this)} boardArray={this.state.board} />
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>{this.state.currentPlayer === 'R' ? 'Red' : 'Blue'}'s Turn</Text>
          </View>

        </View>
    )
  }
}



const styles = StyleSheet.create({
announce: {
  color: 'red',
  backgroundColor: 'white',
  fontSize: 50,
  height: 75,
  fontWeight: "900",
  textAlign: 'center',
  zIndex: 1,
  position: 'absolute', left:20, bottom: 0, top: 200, right: 0

},
title: {
  color: 'darkgrey',
  fontFamily: 'Roboto',
  fontSize: 30,
  fontWeight: "900",
  textAlign: 'center',
  backgroundColor: '#ffff00'
}
});
