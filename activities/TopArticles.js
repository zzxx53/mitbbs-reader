import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
var DOMParser = require('react-native-html-parser').DOMParser
import { connect } from 'react-redux'
import { windowWidth, statusBarHeight } from '../util/window';
import { setTitle } from '../store/actions'

class TopArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articles: [], isLoading: true };
        this.props.dispatch(setTitle("置顶文章"))
        this.getArticles();
    }
    render() {
        const articleList = this.state.articles.map((article, index) => {
            return this.generateArticleLink(article, index);
        });
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={40} color='grey' />
                    </View> :
                    <ScrollView style={styles.articleList}>
                        {articleList}
                    </ScrollView>
                }
            </View>
        );
    }
    getArticles() {
        fetch('http://www.mitbbs.com/mwap/forum/request/top.php').then(response => {
            return response.json();
        })
            .then(jsonContent => {
                this.parseArticles(jsonContent);
            })
            .catch(error => {
                this.setState({ isLoading: false })
                Alert.alert('Error loading', '', [{ text: 'OK' }])
            })
    }
    parseArticles(data) {
        const oParser = new DOMParser();
        const pageContent = data.detail.content.replace("\\\"", "\"");
        const oDOM = oParser.parseFromString(pageContent, "text/html");
        const articles = oDOM.querySelect('li[class="article_list_nopic"] a').reverse();
        this.setState({ articles, isLoading: false })
    }
    generateArticleLink(articleLink, index) {
        const linkText = articleLink.textContent.trim();
        if (!linkText) { return null; }
        if (this.isAd(articleLink)) { return null }
        return (
            <TouchableOpacity key={"article" + index} style={styles.articleItem} onPress={this.goToThread.bind(this, articleLink.getAttribute("href"))}>
                <Text
                    style={{ color: 'black', fontSize: 20 }}
                > {articleLink.textContent.trim()} </Text>
            </TouchableOpacity>
        )
    }
    goToThread(url) {
        this.props.navigation.navigate('ThreadDisplay', { url })
    }
    isAd(articleLink) {
        return articleLink.parentNode.parentNode.querySelect('p[class="commen_p"]')[0].textContent.includes("广告")
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: 'Top Articles',
        };
    };
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

export default connect()(TopArticles);
