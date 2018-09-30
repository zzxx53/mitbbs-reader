import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import axios from 'axios';
var DOMParser = require('react-native-html-parser').DOMParser
import Toolbar from '../fragments/Toolbar';
import { windowWidth, statusBarHeight } from '../util/window'

export default class TopArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articles: [] }
        this.getArticles(); fontSize
    }
    render() {
        const articleList = this.state.articles.map(article => {
            return this.generateArticleLink(article);
        });
        return (
            <View style={styles.container}>
                <Toolbar title="Home" navigation={this.props.navigation} />
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
            <View key={articleLink.getAttribute("href")} style={styles.articleItem}>
                <Text
                    style={{ color: 'black', fontSize: 20 }}
                > {articleLink.textContent.trim()} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 25
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