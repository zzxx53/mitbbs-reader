import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
var DOMParser = require('react-native-html-parser').DOMParser;
import { connect } from 'react-redux';
import { setTitle } from '../store/actions';
import PostDisplay from '../fragments/PostDisplay';
import fixXmlErrors from '../util/fixXmlErrors';
const iconv = require('iconv-lite');
import { Buffer } from 'buffer';

class ThreadDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, posts: null };
        const url = 'https://www.mitbbs.com' + this.props.navigation.getParam('url');
        axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer'
        }).then(response => {
            let html = iconv.decode(new Buffer(response.data), 'gbk');
            this.parseThread(fixXmlErrors(html))
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
                        {this.state.posts}
                    </ScrollView>
                }
            </View>
        );
    }
    parseThread(text) {
        const oParser = new DOMParser();
        const oDOM = oParser.parseFromString(text, "text/html");
        const threadTitle = oDOM.getElementByClassName('news_title').getElementsByTagName('p')[0].textContent;
        this.props.dispatch(setTitle(threadTitle));
        const posts = oDOM.getElementByClassName('news_conter').querySelect('li');
        const postsMarkup = posts.map(post => {
            const author = post.getElementsByClassName('theme_up')[0].getElementsByTagName('h4')[0].textContent.trim();
            const timestamp = post.getElementsByClassName('theme_time')[0].textContent.trim();
            const contentNode = post.getElementsByClassName('theme_middle black_font')[0];
            const content = this.parsePost(contentNode.childNodes);
            const key = contentNode.getAttribute('id');
            return (
                <PostDisplay key={key} author={author} timestamp={timestamp} content={content} />
            )
        })
        console.log(postsMarkup)
        this.setState({ isLoading: false, posts: postsMarkup });
    }
    parsePost(nodes) {
        let lines = [];
        for (let i = 0; i < nodes.length; i++) {
            const text = nodes[i].textContent.trim();
            text && lines.push(text);
        }
        return lines;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    articleList: {
        flex: 1,
        flexDirection: "column",
    },
});

export default connect()(ThreadDisplay);