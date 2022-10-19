import { View, Text, SafeAreaView, ScrollView, Dimensions, BackHandler, StyleSheet, Platform, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { DataTable, Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import Table from 'react-native-simple-table';
import { round } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { inrFormat } from '../../redux/constants';
import Loader from '../Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getSIDetail } from '../../redux/actions/salesAction';

const { height, width } = Dimensions.get('window')


const SalesInvoiceDetail = ({ route, navigation }) => {
    useEffect(() => {
        const backAction = () => {
            navigation.navigate("mySalesInvoice")
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <Icon name="arrow-left" size={25} onPress={() => navigation.navigate('mySalesOrder')} color="#00a7e5" />
                </View>
            ),
        });
    }, [navigation]);

    const dispatch = useDispatch()
    const itemId = route.params;
    useEffect(() => {
        if (user) {
            dispatch(getSIDetail(itemId.itemId))
        }
    }, [dispatch, itemId])

    const { user } = useSelector(state => state.auth)
    const { siDetail, loading } = useSelector(state => state.siDetail)

    let salesInvoiceDetail = {}
    let soLineItems = []
    if (siDetail) {
        salesInvoiceDetail = siDetail;
        soLineItems = siDetail.lineItems
    }
    console.log(salesInvoiceDetail)

    const Card = ({ list }) => {
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Title style={{ color: '#00a7e5', fontSize: 17, marginHorizontal: 10 }}>{list.productCode} - {list.productName}</Title>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginHorizontal: 10, width: '50%' }}>
                        <Text>MRP:</Text >
                        <Text style={{ fontWeight: '500' }}> {inrFormat(list.mrp)}</Text>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginHorizontal: 10, width: '50%' }}>
                        <Text>Quantity :</Text >
                        <Text style={{ fontWeight: '500' }}> {list.orderedQuantity}</Text>
                    </Text>
                    <Text style={{ width: '50%' }}>
                        <Text style={{ fontWeight: 'bold', color: 'green', textAlign: 'right', right: 0, position: 'absolute' }}>Total : {inrFormat(list.totalValue)}</Text>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginHorizontal: 10, width: '50%' }}>
                        <Text>GST :</Text >
                        <Text style={{ fontWeight: '500' }}> {list.taxPercent} %</Text>
                    </Text>
                </View>

            </View>
        );
    };

    return (
        loading ? <Loader /> : <SafeAreaView style={{ height: height, paddingBottom: 20, flex: 1 }}>
            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>Sales Invoice Number: <Text style={{ color: '#00a7e5' }}>{salesInvoiceDetail.invoiceId}</Text></Text>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Customer :</Text>
                    <Text style={{ color: '#00a7e5' }}>{salesInvoiceDetail.buyerFirmName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>SO Number :</Text>
                    <Text style={{ width: '50%' }}>{salesInvoiceDetail.soId}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>SAP Sales Order No :</Text>
                    <Text style={{ width: '50%' }}></Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Billing Address :</Text>
                    <Text style={{ width: '50%' }}>{salesInvoiceDetail.buyerBillingAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Shipping Address :</Text>
                    <Text style={{ width: '50%' }}>{salesInvoiceDetail.buyerShippingAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Payment Term :</Text>
                    <Text style={{ width: '50%' }}>{salesInvoiceDetail.paymentTerm}</Text>
                </View>
            </View>

            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>Summary</Text>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Total Basic Value :</Text>
                    <Text style={{ width: '50%' }}>{inrFormat(salesInvoiceDetail.grossValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Total Discount :</Text>
                    <Text style={{ width: '50%' }}>{inrFormat(salesInvoiceDetail.primaryDiscountValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Net Value :</Text>
                    <Text style={{ width: '50%' }}>{inrFormat(salesInvoiceDetail.netValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>GST :</Text>
                    <Text style={{ width: '50%' }}>{inrFormat(salesInvoiceDetail.taxValue)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold', color: 'green', fontWeight: 'bold' }}>Grand Total :</Text>
                    <Text style={{ width: '50%', color: 'green', fontWeight: 'bold' }}>{inrFormat(salesInvoiceDetail.totalValue)}</Text>
                </View>
            </View>

            <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 18 }}>Products</Text>
            
            <FlatList
                showsVerticalScrollIndicator={false}
                data={soLineItems || []}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}
            />
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

export default SalesInvoiceDetail