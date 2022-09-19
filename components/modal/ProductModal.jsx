import { Text, View, Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import { getProducts } from '../../redux/productAction/action';
import axios from "axios"
import { DataTable, Searchbar, Card, Title, Paragraph, Checkbox } from 'react-native-paper';
import { inrFormat, urlConstants } from '../../redux/constants';
import Loader from '../Loader';
import _ from 'lodash';

const deviceHeight = Dimensions.get('window').height
export class ProductModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            productList: [],
            checked: false,
            selectedProductList: []
        }
    }

    async componentDidMount() {
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 99999,
            "sellerRole": "WAREHOUSE",
            "buyerRole": "SUPER_DISTRIBUTOR",
            "buyerState": "Jharkhand",
            "buyerUserId": "1100072",
            "hierarchyId": "8d35fe3c-cca8-40d9-8969-aa6f2bd4bf8e",
            "inventoryReferenceId": "1100072",
            "sortArray": [

            ],
            "searchCriteria": [
                {
                    "key": "sellerId",
                    "value": "3d6e1017-218c-4059-8f1d-880396243977",
                    "operation": "EQUAL"
                },
                {
                    "key": "isActive",
                    "value": true,
                    "operation": "EQUAL"
                }
            ]
        }

        const { data } = await axios.post(`${urlConstants.BASE_URI_DEV}/products/price/filtered`, JSON.stringify(bodyData), {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }
        })

        let productList = data.data.productPrice
        this.setState({ productList })
    }

    show = () => {
        this.setState({ show: true })
    }

    close = () => {
        this.setState({ show: false })
    }

    selectPO = (data) => {
        let productList = [...this.state.productList]
        let selectedProductList = [];
        for (let i = 0; i < productList.length; i++) {
            if (data.productCode == productList[i].productCode) {
                // if (productList[i].checked == undefined || productList[i].checked == false) {
                //     productList[i].checked = true
                // } else {
                    productList[i].checked = false
                // }
            }
        }

        selectedProductList = _.filter(productList, obj => obj.checked === true);
        this.setState({ productList, selectedProductList })
        console.log(selectedProductList)
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
                <View style={{ flexDirection: 'row', margin: 15 }}>
                    <Text style={{ width: '50%', fontWeight: 'bold', fontSize: 25 }}>
                        {title}
                    </Text>
                    <Text style={{ width: '50%' }}>
                        <Button onPress={this.loginHandler} title="Add Selected Products" color='#00a7e5' />
                    </Text>
                </View>

                <ScrollView>
                    {this.state.productList.map((list, i) => (
                        <Card style={{ marginVertical: 2 }} key={i}>
                            <Card.Content>

                                <View style={{ flexDirection: 'row', marginTop: -15 }}>
                                    <Checkbox
                                        status={list.checked}
                                        onPress={() => this.selectPO(list)}
                                    />
                                    <Title style={{ color: '#00a7e5', fontSize: 17 }}>{i + 1}{list.productName}</Title>
                                </View>
                                <View style={{ marginLeft: 40 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>MRP:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(list.price[0].mrp)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>GST :</Text >
                                        <Text style={{ fontWeight: '500' }}> {list.gst} %</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Purchase Price:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(list.price[0].purchasePrice)}</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    ))}
                </ScrollView>
            </View>
        )
    }

    render() {
        let { show } = this.state
        const { onTouchOutside, title } = this.props
        return (
            this.state.productList.length == 0 ? <Loader /> : <Modal
                animationType='fade'
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        width: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        // paddingHorizontal: 10,
                        // paddingBottom: 20,
                        maxHeight: deviceHeight * .8,
                        marginBottom: 70
                    }}>
                        {this.renderTitle()}
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ProductModal