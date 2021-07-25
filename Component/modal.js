import React, { Component } from 'react';
import { Dimensions, Modal, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container, Header, Content, Body, Left, Icon, Right, Title, Button, Text } from 'native-base';
import { View } from 'react-native-animatable';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        const { showModal, articleData } = this.props;
        const article = articleData;
        const title = articleData.title;
        const handleClose = () => {
            this.props.onClose();
        }

        return (
            <Modal
                animationType="slide"
                transparent
                visible={showModal}
                onRequestClose={this.handleClose}>
                <Container style={{ margin: 15, marginBottom: 0, backgroundColor: '#fff' }}>
                    <Header style={{ backgroundColor: '#900C3F'}}>
                        <Left>
                            <Button onPress={handleClose} transparent>
                                <Icon name="close" style={{ color: 'white', fontSize: 12 }} />
                            </Button>
                        </Left>
                    </Header>
                    <Content>
                        <View style={styles.MainContainer}>
                            <Text style={styles.ArticleFontStyle}>
                                {article}
                            </Text>
                        </View>
                    </Content>
                </Container>


            </Modal>
        )
    }
}
const styles = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
 
  ArticleFontStyle: {
    fontSize: 20,
    lineHeight: 40,
  }
 
});

export default ModalComponent;
