import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
var DOMParser = require('react-native-html-parser').DOMParser
import Toolbar from '../fragments/Toolbar';
import { windowWidth, statusBarHeight } from '../util/window';
import ThreadDisplay from './ThreadDisplay';

export default class TopArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articles: [] }
        this.getArticles();
    }
    render() {
        const articleList = this.state.articles.map(article => {
            return this.generateArticleLink(article);
        });
        return (
            <View style={styles.container}>
                <ScrollView style={styles.articleList}>
                    {articleList}
                </ScrollView>
            </View>
        );
    }
    getArticles() {
        axios.get('http://www.mitbbs.com/mwap/forum/request/top.php').then(response => {
            this.parseArticles(response.data);
        }).catch(error => {
            Alert.alert('Error loading', '', [{ text: 'OK' }])
        })
    }
    parseArticles(data) {
        const oParser = new DOMParser();
        const pageContent = data.detail.content.replace("\\\"", "\"");
        const oDOM = oParser.parseFromString(pageContent, "text/html");
        const articles = oDOM.querySelect('li[class="article_list_nopic"] a').reverse();
        this.setState({ articles })
    }
    generateArticleLink(articleLink) {
        const linkText = articleLink.textContent.trim();
        if (!linkText) { return null; }
        return (
            <TouchableOpacity key={articleLink.getAttribute("href")} style={styles.articleItem} onPress={this.goToThread.bind(this, articleLink.getAttribute("href"))}>
                <Text
                    style={{ color: 'black', fontSize: 20 }}
                > {articleLink.textContent.trim()} </Text>
            </TouchableOpacity>
        )
    }
    goToThread(url) {
        console.log(url)
        this.props.navigation.navigate('ThreadDisplay', { url })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "column",
        justifyContent: "space-between",
    },
    articleList: {
        flex: 1,
        flexDirection: "column",
    },
    articleItem: {
        borderTopWidth: 2,
        borderTopColor: '#ddd',
        padding: 5,
        height: 35,
        width: windowWidth
    }
});