import { View, Text, SafeAreaView, ScrollView, StyleSheet, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { DataTable, Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import Table from 'react-native-simple-table';
import { round } from 'lodash';
import { getPODetail } from '../../redux/actions/purchaseAction';
import { useSelector, useDispatch } from 'react-redux';
import { inrFormat } from '../../redux/constants';
import Loader from '../Loader';
import Icon from 'react-native-vector-icons/FontAwesome';


const PurchaseDetail = ({ route, navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <Icon name="arrow-left" size={25} onPress={() => navigation.navigate('myPurchaseOrder')} color="#00a7e5" />
                </View>
            ),
        });
    }, [navigation]);

    const dispatch = useDispatch()
    const { itemId } = route.params;

    useEffect(() => {
        if (user && itemId) {
            dispatch(getPODetail(itemId))
        }

    }, [dispatch, itemId])

    const { user } = useSelector(state => state.auth)
    const { poDetail, loading } = useSelector(state => state.poDetail)

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
        loading ? <Loader /> : <SafeAreaView>

            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>PO Number: <Text style={{ color: '#00a7e5' }}>{purchaseDetail.purchaseOrderId}</Text></Text>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Seller :</Text>
                    <Text style={{ width: '50%' }}>{purchaseDetail.buyerFirmName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Expected Delivery Date :</Text>
                    <Text style={{ width: '50%' }}>{purchaseDetail.expectedDeliveryDate}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Billing Address :</Text>
                    <Text style={{ width: '50%' }}>{purchaseDetail.buyerBillingAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Order Type :</Text>
                    <Text style={{ width: '50%' }}>{purchaseDetail.orderType}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Payment Term :</Text>
                    <Text style={{ width: '50%' }}>{purchaseDetail.paymentTerm}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Shipping Address :</Text>
                    <Text style={{ width: '50%' }}>{purchaseDetail.buyerShippingAddress}</Text>
                </View>
            </View>

            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>Summary</Text>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Total Basic Value :</Text>
                    <Text style={{ width: '50%', textAlign: 'right' }}>{inrFormat(purchaseDetail.grossValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Total Discount :</Text>
                    <Text style={{ width: '50%', textAlign: 'right' }}>{inrFormat(purchaseDetail.primaryDiscountValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Net Value :</Text>
                    <Text style={{ width: '50%', textAlign: 'right' }}>{inrFormat(purchaseDetail.netValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>CGST :</Text>
                    <Text style={{ width: '50%', textAlign: 'right' }}>{inrFormat(purchaseDetail.taxValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold', color: 'green', fontWeight: 'bold' }}>Grand Total :</Text>
                    <Text style={{ width: '50%', color: 'green', fontWeight: 'bold', textAlign: 'right' }}>{inrFormat(purchaseDetail.totalValue)}</Text>
                </View>
            </View>

            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>Products</Text>
            {/* <View style={styles.container1}>
                    <Table height={400} columns={columns} dataSource={poLineItems} />
                </View> */}
            <ScrollView>
                {poLineItems && poLineItems.map((list) => (
                    <Card style={{ marginVertical: 2 }} key={list.id}>
                        <Card.Content>
                            <Title style={{ color: '#00a7e5', fontSize: 17, marginTop: -15 }}>{list.productName}</Title>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '50%' }}>
                                    <Text>MRP:</Text >
                                    <Text style={{ fontWeight: '500' }}> {inrFormat(list.mrp)}</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '50%' }}>
                                    <Text>Quantity :</Text >
                                    <Text style={{ fontWeight: '500' }}> {list.orderedQuantity}</Text>
                                </Text>
                                <Text style={{ width: '50%' }}>
                                    <Text style={{ fontWeight: 'bold', color: 'green', textAlign: 'right', right: 0, position: 'absolute' }}>Total : {inrFormat(list.totalValue)}</Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '50%' }}>
                                    <Text>GST :</Text >
                                    <Text style={{ fontWeight: '500' }}> {list.taxPercent} %</Text>
                                </Text>
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
            {/* <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Name</DataTable.Title>
                            <DataTable.Title>Email</DataTable.Title>
                            <DataTable.Title>Age</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row >
                            <DataTable.Cell>John</DataTable.Cell>
                            <DataTable.Cell>john@kindacode.com</DataTable.Cell>
                            <DataTable.Cell>33</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Bob</DataTable.Cell>
                            <DataTable.Cell>test@test.com</DataTable.Cell>
                            <DataTable.Cell>105</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Mei</DataTable.Cell>
                            <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
                            <DataTable.Cell>23</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable> */}
            {/* </View> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        marginVertical: 10,
    }
});

export default PurchaseDetail