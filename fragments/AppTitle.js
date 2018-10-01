import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class AppTitle extends React.Component {
  render() {
    return (
      <Text style={{ color: 'white', fontSize: 20 }}>
        {this.props.appTitle}
      </Text>
    );
  }
}

function select(state) {
  return {
    appTitle: state.appState.title
  }
}

export default connect(select)(AppTitle);
