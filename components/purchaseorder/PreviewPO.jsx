import { StyleSheet,Button, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { inrFormat } from '../../redux/constants';

const cars = [
    'Hyundai Venue',
    'Tata Nexon',
    'Hyundai Creta',
    'Kia Carens',
    'Renault Kiger',
    'Maruti Suzuki Ertiga',
];

const PreviewPO = ({ route, navigation }) => {
    const { params } = route.params;
    let purchaseDetail = params.data
    console.log("PROPS", params);
    return (
        <SafeAreaView>
            <View style={styles.Container}>
                <View style={styles.contain}>
                    <Text>
                        <Icon name="checkcircle" size={40} color="green" />
                    </Text>
                </View>
                <Text style={[styles.commonStyle]}>{purchaseDetail.buyerFirmName}</Text>
                <Text style={[styles.common]}>{purchaseDetail.buyerBillingAddress}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 2, backgroundColor: 'black' }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 20, fontWeight: 'bold' }}>Purchase Order</Text>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Supplier :</Text>
                    <Text style={{ width: '50%', top: 7 }}>{purchaseDetail.sellerFirmName}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Billing Address :</Text>
                    <Text style={{ width: '50%', top: 7 }}>{purchaseDetail.buyerBillingAddress}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Order Type :</Text>
                    <Text style={{ width: '50%', top: 7 }}>{purchaseDetail.orderType}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Payment Term :</Text>
                    <Text style={{ width: '50%', top: 7 }}>{purchaseDetail.paymentTerm}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Shipping Adress :</Text>
                    <Text style={{ width: '50%', top: 7 }}>{purchaseDetail.buyerShippingAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Exp Delivery Date :</Text>
                    <Text style={{ width: '50%', top: 7 }}>{purchaseDetail.expectedDeliveryDate}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Expiry Date :</Text>
                    <Text style={{ width: '50%', top: 7 }}>{purchaseDetail.expiryDateTime}</Text>
                </View>
            </View>
            <Text style={{ margin: 10, fontWeight: '400', fontSize: 25, marginTop: 40 }}>Summary</Text>
            <View style={{margin:5,padding:5,top:-10}}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Total Basic Value </Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7 }}>{inrFormat(purchaseDetail.grossValue)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Total Discount </Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7 }}>{inrFormat(0)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Net Value </Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7 }}>{inrFormat(purchaseDetail.netValue)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Tax Value</Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7 }}>{inrFormat(purchaseDetail.taxValue)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />



                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Grand Total</Text>
                    <Text style={{ width: '50%', marginLeft: 100, top: 7 }}>{inrFormat(purchaseDetail.totalValue)}</Text>
                </View>
                <Divider style={{ height: 2, marginTop: 10 }} />
                <View style={{marginTop:60}}>
                   <Button title="Continue"/>
                </View>

            </View>
        </SafeAreaView>


    );
};

export default PreviewPO

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
        textAlign: "left",
        top: -25,
        padding: 3,
        margin: 3
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