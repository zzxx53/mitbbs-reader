import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { DrawerActions } from 'react-navigation';

class DrawerScreen extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen('Login')}>
                                登录</Text>
                        </View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen('TopArticles')}>
                                置顶文章</Text>
                        </View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen('BigTenArticles')}>
                                热门推荐</Text>
                        </View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen('BigTenArticles')}>
                                论坛集萃</Text>
                        </View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen('BoardList')}>
                                分类讨论区</Text>
                        </View>
                        <View style={styles.menuItem}>
                            <Text onPress={this.navigateToScreen('BigTenArticles')}>
                                搜索</Text>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

DrawerScreen.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    menuItem: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'

    }
})

export default DrawerScreen;
