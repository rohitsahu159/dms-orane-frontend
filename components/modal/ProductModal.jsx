import { Text, View, Modal, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';

const deviceHeight = Dimensions.get('window').height
export class ProductModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    show = () => {
        this.setState({ show: true })
    }

    close = () => {
        this.setState({ show: false })
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    loginHandler = () => {
        this.props.addProducts("Hello")
    }

    renderTitle = () => {
        const { title } = this.props
        return (
            <View>
                <Text style={{ color: '#182E44', fontSize: 20, fontWeight: '500', margin: 15 }}>
                    {title}
                </Text>
                {/* <View style={{margin:50}}> */}
                <Button onPress={this.loginHandler} title="Log In" color='#00a7e5' />
                {/* </View> */}
            </View>
        )
    }

    render() {
        let { show } = this.state
        const { onTouchOutside, title } = this.props
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{ flex: 1, backgroundColor: '#000000AA', justifyContent: 'flex-end' }}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        width: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 10,
                        maxHeight: deviceHeight * 0.4
                    }}>
                        {this.renderTitle()}
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ProductModal