import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import TopArticles from './activities/TopArticles';
import Login from './activities/Login'


export default App = createDrawerNavigator({
  Home: {
    screen: TopArticles,
  },
  Login: {
    screen: Login,
  },
});
/*export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TopArticles />
      </View>
    );
  }
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
