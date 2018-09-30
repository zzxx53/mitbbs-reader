import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { width as windowWidth } from '../util/window'

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                backgroundColor: 'steelblue',
                height: 40,
                width: windowWidth,
                padding: 10
            }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    {/* <TouchableOpacity style={{ flex: 1 }} > */}
                    <Icon
                        name='bars'
                        size={20}
                        color='white'
                        onPress={this.toggleMenu.bind(this)}
                    />
                    {/* </TouchableOpacity> */}
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: 30 }}>{this.props.title}</Text>
                    <TouchableOpacity style={{ flex: 1 }} onPress={this.props.refresh}>
                        <Icon name='refresh' size={20} color='white' style={{ flex: 1 }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    toggleMenu() {
        console.log("menu button")
        return this.props.navigation.toggleDrawer.bind(this)
    }
}
