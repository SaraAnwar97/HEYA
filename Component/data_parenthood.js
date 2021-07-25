import React, { Component } from 'react';
import { ListItem, Left, Right, Thumbnail, Body, View, Text, Button } from 'native-base';

class DataItem extends Component {

    constructor(props) {
        super(props);
        this.data = props.data;
    }

    handlePress = () => {
        const { article } = this.data;
        this.props.onPress({ article });
    }

    render() {
        if (this.data.category = "parenthood") {
            return (
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail square source={require('../Images/parenthood.jpg')} />
                    </Left>
                    <Body>
                        <Text numberOfLines={2}>{this.data.title}</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.handlePress}>
                            <Text>View</Text>
                        </Button>
                    </Right>
                </ListItem>
            );
        }
    }
}

export default DataItem;