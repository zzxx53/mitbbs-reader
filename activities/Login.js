import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ToastAndroid } from 'react-native';
var DOMParser = require('react-native-html-parser').DOMParser;
import { connect } from 'react-redux';
import { windowWidth } from '../util/window';
import { setTitle } from '../store/actions'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(setTitle("登录"))
        this.state = { username: '', password: '', captcha: '' }
    }
    render() {
        const textInputStyle = { height: 40, width: windowWidth, margin: 20 };
        return (
            <View style={styles.container}>
                <TextInput
                    textContentType='username'
                    placeholder='账号'
                    style={textInputStyle}
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder='密码'
                    style={textInputStyle}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <Button
                    title='登录'
                    style={{ flex: 1, margin: 20 }}
                    onPress={this.requestLogin.bind(this)} />
            </View>
        );
    }
    requestLogin() {
        const loginPayload = {
            reqType: '0601',
            username: this.state.username,
            password: this.state.password,
            kickmulti: 'yes'
        };
        const fd = new FormData();
        fd.append('msg', JSON.stringify(loginPayload));
        fetch('https://www.mitbbs.com/iphone_new/service_new.php', {
            method: 'POST',
            body: fd
        })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (response.data.result === "1") {
                    ToastAndroid.show('登录成功', ToastAndroid.SHORT)
                    this.props.navigation.dispatch('TopArticles');
                }
                else {
                    ToastAndroid.show('登录失败', ToastAndroid.SHORT)
                }
            })
            .catch(error => {
                ToastAndroid.show('登录失败', ToastAndroid.SHORT)
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

export default connect()(Login);