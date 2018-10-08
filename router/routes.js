import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, StatusBar } from 'react-native';
import { DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import TopArticles from '../activities/TopArticles';
import Login from '../activities/Login';
import BigTenArticles from '../activities/BigTenArticles';
import ThreadDisplay from '../activities/ThreadDisplay';
import DrawerView from '../fragments/DrawerView';
import AppTitle from '../fragments/AppTitle';
import BoardArticles from '../activities/BoardArticles';
import BoardList from '../activities/BoardList';

// actual menu content is in DrawerView; all compoments needs to be added to route config map (first param of createDrawerNavigator) 
const DrawerNavigator = createDrawerNavigator({
    TopArticles: { screen: TopArticles },
    Login: { screen: Login },
    BigTenArticles: { screen: BigTenArticles },
    ThreadDisplay: { screen: ThreadDisplay },
    BoardArticles: { screen: BoardArticles },
    BoardList: { screen: BoardList }
}, {
        initialRouteName: 'TopArticles',
        contentComponent: DrawerView,
        drawerWidth: 300
    }
);

const MenuImage = ({ navigation }) => {
    if (!navigation.state.isDrawerOpen) {
        return (<Icon name='bars' size={20} color='white' />)
    } else {
        return (<Icon name='arrow-left' size={20} color='white' />)
    }
}

// need this mainly for the header bar, so only has one route configured
const StackNavigator = createStackNavigator({
    DrawerNavigator: { screen: DrawerNavigator }
}, {
        navigationOptions: ({ navigation }) => ({
            headerTitle: <AppTitle />,
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
