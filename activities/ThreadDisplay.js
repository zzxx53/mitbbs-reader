import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
var DOMParser = require('react-native-html-parser').DOMParser

export default class ThreadDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.navigation.getParam('url')}</Text>
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