import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, StatusBar } from 'react-native';
import { DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import TopArticles from '../activities/TopArticles';
import Login from '../activities/Login';
import BigTenArticles from '../activities/BigTenArticles';
import ThreadDisplay from '../activities/ThreadDisplay';

const DrawerNavigator = createDrawerNavigator({
    TopArticles: { screen: TopArticles },
    Login: { screen: Login },
    BigTenArticles: { screen: BigTenArticles }
});

const MenuImage = ({ navigation }) => {
    if (!navigation.state.isDrawerOpen) {
        return (<Icon name='bars' size={20} color='white' />)
    } else {
        return (<Icon name='arrow-left' size={20} color='white' />)
    }
}


const StackNavigator = createStackNavigator({
    DrawerNavigator: { screen: DrawerNavigator },
    ThreadDisplay: { screen: ThreadDisplay }
}, {
        navigationOptions: ({ navigation }) => ({
            title: 'ReactNavigation',  // Title to appear in status bar
            headerLeft:
                <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) }} style={{ paddingLeft: 10 }}>
                    <MenuImage style="styles.bar" navigation={navigation} />
                </TouchableOpacity>,
            headerStyle: {
                backgroundColor: 'steelblue',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },

        })
    });

export default StackNavigator;
