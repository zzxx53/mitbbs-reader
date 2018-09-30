import React from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './router/routes';

export default class App extends React.Component {
  render() {
    return (
      <Navigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
