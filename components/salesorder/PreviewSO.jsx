import { StyleSheet, Button, Text, BackHandler, View, Alert } from 'react-native'
import React, { useEffect } from 'react';
// import Icon from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { inrFormat } from '../../redux/constants';
import { useSelector, useDispatch } from 'react-redux';
import { createPO } from '../../redux/actions/purchaseAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from "react-native-toast-message";

const cars = [
    'Hyundai Venue',
    'Tata Nexon',
    'Hyundai Creta',
    'Kia Carens',
    'Renault Kiger',
    'Maruti Suzuki Ertiga',
];

const PreviewSO = ({ route, navigation }) => {
    useEffect(() => {
        const backAction = () => {

            navigation.navigate("createSO")

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
                    <Icon name="arrow-left" size={25} onPress={() => navigation.navigate('createSO')} color="#00a7e5" />
                </View>
            ),
        });
    }, [navigation]);

    const dispatch = useDispatch()
    const { params } = route.params;
    let salesDetail = params.data

    const submitSO = async () => {
        console.log(salesDetail)
        Alert.alert(
            "",
            "Your Sales Order Created Successfully",
            [
                { text: "OK", onPress: () => navigation.navigate("mySalesOrder") }
            ]
        );
        // let data = await dispatch(createPO(salesDetail))

        // if (data.status == 'success') {
        //     Toast.show({
        //         type: 'success',
        //         position: 'top',
        //         text1: `Your Purchase Order Created Successfully`,
        //         visibilityTime: 2000
        //     })
        //     navigation.navigate('mySalesOrder')
        // }

    }
    return (
        <SafeAreaView>
            <View style={styles.Container}>
                <View style={styles.contain}>
                    <Text>
                        <Icon name="check-circle" size={40} color="green" />
                    </Text>
                </View>
                <Text style={[styles.commonStyle]}>{salesDetail.buyerFirmName}</Text>
                <Text style={[styles.common]}>{salesDetail.buyerBillingAddress}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 2, backgroundColor: 'black' }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 20, fontWeight: 'bold' }}>Sales Order</Text>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Buyer :</Text>
                    <Text style={{ width: '50%', top: 7, fontWeight: 'bold' }}>{salesDetail.sellerFirmName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Billing Address :</Text>
                    <Text style={{ width: '50%', top: 7, fontWeight: 'bold' }}>{salesDetail.buyerBillingAddress}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Order Type :</Text>
                    <Text style={{ width: '50%', top: 7, fontWeight: 'bold' }}>{salesDetail.orderType}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Payment Term :</Text>
                    <Text style={{ width: '50%', top: 7, fontWeight: 'bold' }}>{salesDetail.paymentTerm}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Shipping Adress :</Text>
                    <Text style={{ width: '50%', top: 7, fontWeight: 'bold' }}>{salesDetail.buyerShippingAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Exp Delivery Date :</Text>
                    <Text style={{ width: '50%', top: 7, fontWeight: 'bold' }}>{salesDetail.expectedDeliveryDate}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Expiry Date :</Text>
                    <Text style={{ width: '50%', top: 7, fontWeight: 'bold' }}>{salesDetail.expiryDateTime}</Text>
                </View>
            </View>
            <Text style={{ margin: 10, fontWeight: '400', fontSize: 25, marginTop: 40 }}>Summary</Text>
            <View style={{ margin: 5, padding: 5, top: -10 }}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Total Basic Value </Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7, fontWeight: 'bold' }}>{inrFormat(salesDetail.grossValue)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Total Discount </Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7, fontWeight: 'bold' }}>{inrFormat(0)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Net Value </Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7, fontWeight: 'bold' }}>{inrFormat(salesDetail.netValue)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Tax Value</Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7, fontWeight: 'bold' }}>{inrFormat(salesDetail.taxValue)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4, color: 'green' }}>Grand Total</Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7, fontWeight: 'bold', color: 'green' }}>{inrFormat(salesDetail.totalValue)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />


            </View>
            <View style={{ justifyContent: 'center', width: '100%', bottom: 0, alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ padding: 20 }}>
                    <Button onPress={() => { submitSO() }} title="Confirm" color='#00a7e5' />
                </Text>

                <Text style={{ padding: 20 }}>
                    <Button onPress={() => { navigation.navigate('createSO') }} title="Cancel" color='#00a7e5' />
                </Text>
            </View>
            <Toast />
        </SafeAreaView>


    );
};

export default PreviewSO

const styles = StyleSheet.create({

    Container: {
        // flex: 1,
        backgroundColor: "#e6eeff",
        padding: 10,
        margin: 5,
        elevation: 8,
        borderRadius: 10,
        top: 30
    },

    common: {
        fontSize: 15,
        textAlign: 'center',
        top: -25,
        padding: 3,
        margin: 3,
    },
    contain: {

        marginLeft: 170,
        top: -25,


    },
    commonStyle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        top: -15,
        padding: 3,
        margin: 3



    }
});