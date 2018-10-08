import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import axios from 'axios';
var DOMParser = require('react-native-html-parser').DOMParser;
import { connect } from 'react-redux';
import { setTitle } from '../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import fixXmlErrors from '../util/fixXmlErrors';
const iconv = require('iconv-lite');
import { Buffer } from 'buffer';

class BoardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, boardList: null };
        const url = 'https://www.mitbbs.com/mwap/forum/request/classes.php';
        axios.get(url).then(response => {
            let boardListData = response.data.detail.content;
            boardListData = boardListData.replace('\\/', '/').replace('\\"', '"');
            this.parseBoardGroupList(boardListData);
        })
        this.props.dispatch(setTitle('分类讨论区'));
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={40} color='grey' />
                    </View> :
                    <ScrollView style={styles.boardList}>
                        {this.state.boardList}
                    </ScrollView>
                }
            </View>
        );
    }
    parseBoardGroupList(boardListData) {
        const oParser = new DOMParser();
        const oDOM = oParser.parseFromString(boardListData, "text/html");
        const boardDivs = oDOM.getElementByClassName('board_wrap').getElementsByClassName('bd_list border_bottom');
        const displayList = Array.prototype.map.call(boardDivs, div => {
            const boardName = div.querySelect('strong')[0].textContent;
            const url = div.querySelect('a')[0].getAttribute('href');
            return this.makeBoardMarkup(boardName, url, true)
        })
        this.setState({ isLoading: false, boardList: displayList });
    }
    parseBoardList(boardListData) {
        const oParser = new DOMParser();
        const oDOM = oParser.parseFromString(boardListData, "text/html");
        const boardDivs = oDOM.documentElement.getElementsByClassName('content_list_wrap padding10 border_bottom padding-bottom board_link');
        const displayList = Array.prototype.map.call(boardDivs, div => {
            const boardName = div.getElementsByClassName('hot_name')[0].textContent.trim();
            const url = div.querySelect('a')[0].getAttribute('href');
            const isDirectory = url.includes('boardlist.php?');
            return this.makeBoardMarkup(boardName, url, isDirectory)
        })
        this.setState({ isLoading: false, boardList: displayList });
    }
    updateBoardList(url) {
        this.setState({ isLoading: true });
        axios({
            method: 'get',
            url: 'https://www.mitbbs.com' + url,
            responseType: 'arraybuffer'
        }).then(response => {
            let html = iconv.decode(new Buffer(response.data), 'gbk');
            this.parseBoardList(fixXmlErrors(html))
        })
    }
    goToBoard(url) {
        this.props.navigation.navigate('BoardArticles', { url });
    }
    makeBoardMarkup(boardName, url, isDirectory) {
        let action;
        if (isDirectory) {
            action = this.updateBoardList.bind(this, url);
        } else {
            action = this.goToBoard.bind(this, url)
        }
        const ret = (<TouchableHighlight key={boardName} style={styles.menuItem} onPress={action}>
            <Text style={{ fontSize: 20 }} >{boardName}
                {isDirectory && <Icon name='chevron-right' size={20} color='black' />}</Text>
        </TouchableHighlight>);
        return ret;
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
    boardList: {
        flex: 1,
        flexDirection: "column",
    },
})


export default connect()(BoardList);