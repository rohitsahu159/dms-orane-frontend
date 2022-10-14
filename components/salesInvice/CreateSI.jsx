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

const { height, width } = Dimensions.get('window')
const CreateSI = ({ route, navigation }) => {
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

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <Icon name="arrow-left" size={25} onPress={() => navigation.navigate('mySalesOrder')} color="#00a7e5" />
                </View>
            ),
        });
    }, [navigation]);

    const [vehicleNumber, setVehicleNumber] = useState(null)
    const [driverName, setDriverName] = useState(null)
    const [driverNumber, setDriverNumber] = useState(null)
    const [isCashDiscount, setIsCashDiscount] = useState(false);
    const [isExtraCashDiscount, setIsExtraCashDiscount] = useState(false);
    const [cashDiscount, setCashDiscount] = useState(0);
    const [extraCashDiscount, setExtraCashDiscount] = useState(0);
    const [qty, setQty] = useState(0)

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
    if (soDetail) {
        salesOrderDetail = soDetail;
        soLineItems = soDetail.lineItems
    }

    const Card = ({ list }) => {
        return (
            <View style={[styles.productContainer, { borderBottomWidth: 1, borderBottomColor: '#ccc' }]}>
                <Title style={{ color: '#00a7e5', fontSize: 17, marginHorizontal: 5 }}>{list.productCode} - {list.productName}</Title>
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    <View style={{ width: '50%' }}>
                        <Text>MRP : <Text style={{ fontWeight: '500' }}>{inrFormat(list.mrp)}</Text></Text>
                        <Text>GST : <Text style={{ fontWeight: '500' }}>{list.taxPercent} %</Text></Text>
                        <Text>Price/Pcs (Excl GST) : <Text style={{ fontWeight: '500' }}>{inrFormat(list.purchasePrice)} </Text></Text>
                        <Text>Pcs/Box : <Text style={{ fontWeight: '500' }}>{list.pcsPerBox} </Text></Text>
                        <Text>Inventory : <Text style={{ fontWeight: '500' }}>0 </Text></Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%', marginHorizontal: 2 }}>
                                <TextInput
                                    label="Cases"
                                    variant='outlined'
                                    value={0}
                                // keyboardType='numeric'
                                // onChangeText={(value) => { handelIncreament(value, list.productCode, 'caseBoxQty') }}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    label="Pcs"
                                    variant='outlined'
                                    value={0}
                                // keyboardType='numeric'
                                // onChangeText={(value) => { handelIncreament(value, list.productCode, 'pcsQty') }}
                                />
                            </View>
                        </View>
                        <Text style={{ textAlign: 'center', color: 'green' }}>Total value : <Text style={{ fontWeight: '500' }}>{inrFormat(list.totalValue)}</Text></Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        loading ? <Loader /> : <SafeAreaView style={{ height: height, paddingBottom: 20, flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Sales Order Number :</Text>
                    <Text style={{ color: '#00a7e5' }}>{salesOrderDetail.salesOrderId}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Buyer :</Text>
                    <Text style={{ width: '50%' }}>{salesOrderDetail.buyerFirmName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Billing Address :</Text>
                    <Text style={{ width: '50%' }}>{salesOrderDetail.buyerBillingAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: '50%', fontWeight: 'bold' }}>Shipping Address :</Text>
                    <Text style={{ width: '50%' }}>{salesOrderDetail.buyerShippingAddress}</Text>
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