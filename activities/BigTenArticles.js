import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
var DOMParser = require('react-native-html-parser').DOMParser
import Toolbar from './fragments/Toolbar';

export default class TopArticles extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Toolbar title="Home" />
                <Text>Big 10</Text>
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