import { View, Text, SafeAreaView, ScrollView, StyleSheet, Platform, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { DataTable, Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import Table from 'react-native-simple-table';
import { round } from 'lodash';
import { getSODetail } from '../../redux/actions/salesAction';
import { useSelector, useDispatch } from 'react-redux';
import { inrFormat } from '../../redux/constants';
import Loader from '../Loader';


const SalesOrderDetail = ({ route }) => {
    const dispatch = useDispatch()
    const itemId = route.params;
    useEffect(() => {
        if (user) {
            dispatch(getSODetail(itemId.itemId))
        }

    }, [dispatch, itemId])

    const { user } = useSelector(state => state.auth)
    const { soDetail, loading } = useSelector(state => state.soDetail)

    let salesOrderDetail = {}
    let soLineItems = []
    console.log("daaaaata", soLineItems)
    if (soDetail) {
        salesOrderDetail = soDetail;
        soLineItems = soDetail.lineItems
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
    let ProductCard;

    return (
        loading ? <Loader /> : <SafeAreaView>


            <View style={{ flexDirection: 'row' }}>
                <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18, top: 5 }}>SO Number:</Text>
                <Text style={{ marginTop: 14, fontWeight: 'bold', color: '#00a7e5', top: 5 }}>{salesOrderDetail.salesOrderId}</Text>
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Customer :</Text>
                    <Text style={{ marginHorizontal: 70, color: '#00a7e5' }}>{salesOrderDetail.buyerFirmName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Billing Address :</Text>
                    <Text style={{ marginHorizontal: 70, width: '50%' }}>{salesOrderDetail.buyerBillingAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Shipping Address :</Text>
                    <Text style={{ marginHorizontal: 70, width: '50%' }}>{salesOrderDetail.buyerShippingAddress}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Payment Term :</Text>
                    <Text style={{ marginHorizontal: 70, width: '50%' }}>{salesOrderDetail.paymentTerm}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>SAP Sales Order No :</Text>
                    <Text style={{ marginHorizontal: 70, width: '50%' }}></Text>
                </View>
            </View>

            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>Summary</Text>
            <View style={styles.container2}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Total Basic Value :</Text>
                    <Text style={{ marginHorizontal: 70, width: '50%' }}>{inrFormat(salesOrderDetail.grossValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Total Discount :</Text>
                    <Text style={{ marginHorizontal: 70, width: '50%' }}>{inrFormat(salesOrderDetail.primaryDiscountValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Net Value :</Text>
                    <Text style={{ marginHorizontal: 70, width: '50%' }}>{inrFormat(salesOrderDetail.netValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>GST :</Text>
                    <Text style={{ marginHorizontal: 70, width: '50%' }}>{inrFormat(salesOrderDetail.taxValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold', color: 'green', fontWeight: 'bold' }}>Grand Total :</Text>
                    <Text style={{ marginHorizontal: 70, width: '50%', color: 'green', fontWeight: 'bold' }}>{inrFormat(salesOrderDetail.totalValue)}</Text>
                </View>
            </View>

            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>Products</Text>
            {
                ProductCard = ({ list }) => {
                    return (<>
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

                    </>)
                }
            }

            <FlatList
                data={soLineItems || []}
                renderItem={({ item }) => {
                    return <ProductCard list={item} />;
                }
                }

            />


            {/* <ScrollView>
                {soLineItems && soLineItems.map((list) => (
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
            </ScrollView> */}
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
        padding: 8,
        margin: 10,
        elevation: 8,
        borderRadius: 10,

    },
    container2: {
        // flex: 1,
        marginBottom: 10,
        top: -5,
        backgroundColor: "#fff",
        padding: 8,
        margin: 10,
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

export default SalesOrderDetail