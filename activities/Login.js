import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
var DOMParser = require('react-native-html-parser').DOMParser

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <Button
                    title="Menu"
                    onPress={this.props.navigation.toggleDrawer.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});