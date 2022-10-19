import { View, Text, SafeAreaView, ScrollView, Dimensions, BackHandler, StyleSheet, Platform, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DataTable, Searchbar, Card, Title, Paragraph, Checkbox } from 'react-native-paper';
import Table from 'react-native-simple-table';
import { round } from 'lodash';
import { getSODetail } from '../../redux/actions/salesAction';
import { useSelector, useDispatch } from 'react-redux';
import { inrFormat } from '../../redux/constants';
import Loader from '../Loader';
import { Button, IconButton, TextInput } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable } from 'react-native-gesture-handler';
import { getProductInventory } from '../../redux/actions/productAction';

const { height, width } = Dimensions.get('window')
const CreateSI = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const itemId = route.params;

    const [vehicleNumber, setVehicleNumber] = useState(null)
    const [driverName, setDriverName] = useState(null)
    const [driverNumber, setDriverNumber] = useState(null)
    const [isCashDiscount, setIsCashDiscount] = useState(false);
    const [isExtraCashDiscount, setIsExtraCashDiscount] = useState(false);
    const [cashDiscount, setCashDiscount] = useState(0);
    const [extraCashDiscount, setExtraCashDiscount] = useState(0);
    const [salesInvoiceObj, setSalesInvoiceObj] = useState({})
    const [salesInvoiceItems, setSalesInvoiceItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { user } = useSelector(state => state.auth)
    const { soDetail, loading } = useSelector(state => state.soDetail)

    useEffect(() => {
        const backAction = () => {
            navigation.navigate("mySalesOrder")
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if (user) {
            getSalesOrderDetail(itemId.itemId)
        }
    }, [itemId])

    async function getSalesOrderDetail(id) {
        let dataObj = await dispatch(getSODetail(id))
        let salesDetail = dataObj.data
        let salesList = dataObj.data.lineItems
        setSalesInvoiceObj(salesDetail)
        setSalesInvoiceItems(salesList)

        let productCodeArr = [];

        if (salesList.length > 0) {
            for (let i = 0; i < salesList.length; i++) {
                productCodeArr.push({
                    "productCode": Number(salesList[i].productCode),
                    "requiredQuantity": Number(salesList[i].remainingQuantity),
                    "soOrderQuantity": Number(salesList[i].orderedQuantity),
                });
            }
        }
        let bodyData = {
            "sellerId": salesDetail.sellerUserId,
            "sellerRole": salesDetail.sellerRole,
            "buyerRole": salesDetail.buyerRole,
            "buyerState": salesDetail.buyerState,
            "productArray": productCodeArr,
            "hierarchyId": salesDetail.hierarchyId,
        }
        let inventoryData = await dispatch(getProductInventory(bodyData))
        console.log(inventoryData)
    }

    const leftSwipe = (item) => {
        return <View style={styles.deleteBox}>
            <Icon onPress={() => { deleteItem(item) }} name="trash" size={30} color="#900" />
        </View>
    }

    return (
        loading ? <Loader /> : <SafeAreaView style={{ height: height, paddingBottom: 20, flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Sales Order Number :</Text>
                    <Text style={{ color: '#00a7e5' }}>{salesInvoiceObj.salesOrderId}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Buyer :</Text>
                    <Text style={{ width: '50%' }}>{salesInvoiceObj.buyerFirmName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Billing Address :</Text>
                    <Text style={{ width: '50%' }}>{salesInvoiceObj.buyerBillingAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Shipping Address :</Text>
                    <Text style={{ width: '50%' }}>{salesInvoiceObj.buyerShippingAddress}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                <View style={{ width: '50%', paddingHorizontal: 10 }}>
                    <TextInput
                        variant='standard'
                        color='#00a7e5'
                        label='Vehicle Number'
                        value={vehicleNumber}
                        onChangeText={setVehicleNumber}
                    />
                </View>
                <View style={{ width: '50%' }}>
                    <TextInput
                        variant='standard'
                        color='#00a7e5'
                        label='Driver Name'
                        value={driverName}
                        onChangeText={setDriverName}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%', paddingHorizontal: 10 }}>
                    <TextInput
                        variant='standard'
                        color='#00a7e5'
                        label='Driver Number'
                        value={driverNumber}
                        onChangeText={setDriverNumber}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                <View style={{ width: '50%', flexDirection: 'row' }}>
                    <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 15 }}>Cash Discount</Text>
                    <Checkbox
                        color='#00a7e5'
                        status={isCashDiscount ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setIsCashDiscount(!isCashDiscount);
                        }}
                    />
                </View>

                {isCashDiscount ? <View style={{ width: '50%', paddingHorizontal: 10 }}>
                    <TextInput
                        label="Cash Discount (%)"
                        variant='outlined'
                        value={String(cashDiscount)}
                        keyboardType='numeric'
                        onChangeText={setCashDiscount}
                    />
                </View> : null}
            </View>

            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <View style={{ width: '50%', flexDirection: 'row' }}>
                    <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 15 }}>Ext. Sec. Discount</Text>
                    <Checkbox
                        color='#00a7e5'
                        status={isExtraCashDiscount ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setIsExtraCashDiscount(!isExtraCashDiscount);
                        }}
                    />
                </View>

                {isExtraCashDiscount ? <View style={{ width: '50%', paddingHorizontal: 10 }}>
                    <TextInput
                        label="Extra Cash Discount (%)"
                        variant='outlined'
                        value={String(extraCashDiscount)}
                        keyboardType='numeric'
                        onChangeText={setExtraCashDiscount}
                    />
                </View> : null}
            </View>

            <Text style={{ paddingHorizontal: 5, fontWeight: 'bold', fontSize: 18, padding: 10 }}>Products</Text>
            <View style={{ flex: 1, paddingBottom: 80 }}>
                <ScrollView>
                    {salesInvoiceItems.map((list) => (
                        <Swipeable renderLeftActions={() => leftSwipe(list)} key={list.productCode}>
                            <View style={[styles.container, { padding: 10, marginBottom: 10 }]}>
                                <Title style={{ color: '#00a7e5', fontSize: 17, marginTop: -15 }}>{list.productName}</Title>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%' }}>
                                        <Text>MRP : <Text style={{ fontWeight: '500' }}>{inrFormat(list.mrp)}</Text></Text>
                                        <Text>GST : <Text style={{ fontWeight: '500' }}>{list.taxPercent} %</Text></Text>
                                        <Text>Price/Pcs : <Text style={{ fontWeight: '500' }}>{inrFormat(list.purchasePrice)} </Text></Text>
                                        <Text>Pcs/Box : <Text style={{ fontWeight: '500' }}>{list.pcsPerBox} </Text></Text>
                                        <Text>Inventory : <Text style={{ fontWeight: '500' }}>0 </Text></Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '50%', marginHorizontal: 2 }}>
                                                <TextInput
                                                    label="Cases"
                                                    variant='outlined'
                                                    value={String(list.caseBoxQty)}
                                                    keyboardType='decimal-pad'
                                                    onChangeText={(value) => { handelIncreament(value, list.productCode, 'caseBoxQty') }}
                                                />
                                            </View>
                                            <View style={{ width: '50%' }}>
                                                <TextInput
                                                    label="Pcs"
                                                    variant='outlined'
                                                    value={String(list.pcsQty)}
                                                    keyboardType='decimal-pad'
                                                    onChangeText={(value) => { handelIncreament(value, list.productCode, 'pcsQty') }}
                                                />
                                            </View>
                                        </View>
                                        <Text style={{ textAlign: 'center', color: 'green' }}>Total value : <Text style={{ fontWeight: '500' }}>{inrFormat(list.totalValue)}</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </Swipeable>
                    ))}
                </ScrollView>
                {/* {selectedProductList.length != 0 && <View style={{ position: 'absolute', bottom: 60, width: '100%' }}>
                        <Button onPress={() => { previewSO() }} title="Preview Sales Order" color='#00a7e5' />
                    </View>} */}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 8,
        margin: 10,
        elevation: 8,
        borderRadius: 10,
    },
    productContainer: {
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: 10,
    },
});

export default CreateSI