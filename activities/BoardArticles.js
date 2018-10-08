import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import axios from 'axios';
var DOMParser = require('react-native-html-parser').DOMParser;
import { connect } from 'react-redux';
import { setTitle } from '../store/actions';
import PostDisplay from '../fragments/PostDisplay';
import fixXmlErrors from '../util/fixXmlErrors';
const iconv = require('iconv-lite');
import { Buffer } from 'buffer';

class BoardArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, articleList: null };
        const url = 'https://www.mitbbs.com' + this.props.navigation.getParam('url');
        axios({
            method: 'get',
            url,
            responseType: 'arraybuffer'
        }).then(response => {
            let html = iconv.decode(new Buffer(response.data), 'gbk');
            html = fixXmlErrors(html);
            // fix missing </ul> after last <li class="theme_li">
            const posLastPost = html.lastIndexOf('<li class="theme_li">');
            const firstHalf = html.substring(0, posLastPost);
            let latterHalf = html.substring(posLastPost, html.length);
            const posLastPostEndTag = latterHalf.indexOf('</li>') + 5;
            latterHalf = latterHalf.substring(0, posLastPostEndTag) +
                '</ul>' +
                latterHalf.substring(posLastPostEndTag, latterHalf.length);
            html = firstHalf + latterHalf;
            this.parseArticleList(html);
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={40} color='grey' />
                    </View> :
                    <ScrollView style={styles.articleList}>
                        {this.state.articleList}
                    </ScrollView>
                }
            </View>
        );
    }
    parseArticleList(html) {
        const oParser = new DOMParser();
        const oDOM = oParser.parseFromString(html, "text/html");
        const articleList = oDOM.documentElement.getElementsByClassName('theme_li');
        const articleListMarkup = Array.prototype.map.call(articleList, element => {
            const title = element.getElementsByClassName('theme_middle h44')[0].textContent;
            const url = element.querySelect('a')[0].getAttribute('href');
            const date = element.getElementsByClassName('theme_time')[0].textContent;
            const author = element.getElementsByClassName('theme-id')[0].textContent;
            return this.makeArticleMarkup(title, url, date, author);
        });
        this.setState({ isLoading: false, articleList: articleListMarkup })
    }
    makeArticleMarkup(title, url, date, author) {
        let action = this.showPost.bind(this, url)
        const ret = (<TouchableHighlight key={title} onPress={action}>
            <View style={styles.menuItem}>
                <Text style={{ fontSize: 20 }} >{title}</Text>
                <Text style={{ fontSize: 16 }} >{date}</Text>
                <Text style={{ fontSize: 16 }} >{author}</Text>
            </View>
        </TouchableHighlight>);
        return ret;
    }
    showPost(url) {
        this.props.navigation.navigate('ThreadDisplay', { url });
    }
}

const styles = StyleSheet.create({
    menuItem: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        flex: 1,
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    articleList: {
        flex: 1,
        flexDirection: "column",
    },
})

export default connect()(BoardArticles);