import { View, Text, SafeAreaView, ScrollView, StyleSheet, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { DataTable, Searchbar } from 'react-native-paper';
import Table from 'react-native-simple-table';
import { round } from 'lodash';
import { getPODetail } from '../../redux/purchaseAction/action';
import { useSelector, useDispatch } from 'react-redux';
import { inrFormat } from '../../redux/constants';


const PurchaseDetail = ({ route }) => {
    const dispatch = useDispatch()
    const { itemId } = route.params;

    useEffect(() => {
        if (user && itemId) {
            dispatch(getPODetail(itemId))
        }

    }, [dispatch, itemId])

    const { loading, user } = useSelector(state => state.auth)
    const { poDetail } = useSelector(state => state.poDetail)

    console.log("po detail reducer", poDetail)
    let purchaseDetail = {}
    let poLineItems = []

    if (poDetail) {
        purchaseDetail = poDetail;
        poLineItems = poDetail.lineItems
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            width: 182,
        },
        {
            title: 'Quantity',
            dataIndex: 'orderedQuantity',
        },
        {
            title: 'MRP',
            dataIndex: 'mrp'
        },
        {
            title: 'GST(%)',
            dataIndex: 'taxPercent'
        },
        {
            title: 'Total Value',
            dataIndex: 'totalValue',
        },
    ];

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={{ margin: 10, fontWeight: 'bold' }}>PO Number: <Text style={{ color: '#00a7e5' }}>{purchaseDetail.purchaseOrderId}</Text></Text>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Seller:</Text>
                        <Text style={{ width: '50%' }}>{purchaseDetail.buyerFirmName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Expected Delivery Date:</Text>
                        <Text style={{ width: '50%' }}>{purchaseDetail.expectedDeliveryDate}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Billing Address:</Text>
                        <Text style={{ width: '50%' }}>{purchaseDetail.buyerBillingAddress}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Order Type:</Text>
                        <Text style={{ width: '50%' }}>{purchaseDetail.orderType}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Payment Term:</Text>
                        <Text style={{ width: '50%' }}>{purchaseDetail.paymentTerm}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Shipping Address:</Text>
                        <Text style={{ width: '50%' }}>{purchaseDetail.buyerShippingAddress}</Text>
                    </View>
                </View>

                <Text style={{ margin: 10, fontWeight: 'bold' }}>Summary</Text>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Total Basic Value:</Text>
                        <Text style={{ width: '50%', textAlign: 'right' }}>{inrFormat(purchaseDetail.grossValue)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Total Discount:</Text>
                        <Text style={{ width: '50%', textAlign: 'right' }}>{inrFormat(purchaseDetail.primaryDiscountValue)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Net Value:</Text>
                        <Text style={{ width: '50%', textAlign: 'right' }}>{inrFormat(purchaseDetail.netValue)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>CGST:</Text>
                        <Text style={{ width: '50%', textAlign: 'right' }}>{inrFormat(purchaseDetail.taxValue)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontWeight: 'bold' }}>Grand Total:</Text>
                        <Text style={{ width: '50%', textAlign: 'right' }}>{inrFormat(purchaseDetail.totalValue)}</Text>
                    </View>
                </View>

                <Text style={{ margin: 10, fontWeight: 'bold' }}>Products</Text>
                <View style={styles.container1}>
                    <Table height={400} columns={columns} dataSource={poLineItems} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
        elevation: 8,
        borderRadius: 10,
    },
    container1: {
        ...Platform.select({
            ios: {
                paddingTop: 20
            },
            android: {}
        }),
    },
    item: {
        width: '50%' // is 50% of container width
    }
});

export default PurchaseDetail