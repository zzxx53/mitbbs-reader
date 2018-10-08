import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';

class PostDisplay extends React.Component {
    render() {
        return (<View style={styles.container}>
            <View style={styles.metadataContainer}>
                <Text style={{ fontSize: 16, color: 'maroon' }}>{this.props.author}</Text>
                <Text style={{ fontSize: 16, color: 'green' }}>{this.props.timestamp}</Text>
            </View>
            {
                this.props.content.map(line => {
                    return (<Text style={{ fontSize: 18 }}>{line}</Text>)
                })
            }

        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        padding: 10
    },
    metadataContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#999',
        justifyContent: 'space-between'
    }
});


export default connect()(PostDisplay);