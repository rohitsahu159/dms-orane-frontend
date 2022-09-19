import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Modal, Portal, Provider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ProductModal } from '../modal/ProductModal';


const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const CreateSO = () => {
    const [supplier, setSupplier] = useState(null);
    const [orderType, setOrderType] = useState(null);
    const [paymentTerm, setPaymentTerm] = useState(null);
    const [billingAddress, setBillingAddress] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    let popupRef = React.createRef()

    const onShowPopup = () => {
        popupRef.show()
    }

    const onClosePopup = () => {
        popupRef.close()
    }

    const addProducts = (data) => {
        console.log("this is create PO Page",data)
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                       Select Buyer
                    </Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="supplier"
                        placeholder={!isFocus ? 'Select Supplier' : '...'}
                        searchPlaceholder="Search..."
                        value={supplier}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setSupplier(item.supplier);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="user"
                                size={20}
                            />
                        )}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.container, { width: '50%' }]}>
                        <Text style={styles.label}>
                            Order Type
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="orderType"
                            placeholder={!isFocus ? 'Select Order Type' : '...'}
                            searchPlaceholder="Search..."
                            value={orderType}
                            onChange={item => {
                                setOrderType(item.orderType);
                            }}
                        />
                    </View>
                    <View style={[styles.container, { width: '50%' }]}>
                        <Text style={styles.label}>
                            Paymnt Term
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="paymentTerm"
                            placeholder={!isFocus ? 'Select Payment Term' : '...'}
                            searchPlaceholder="Search..."
                            value={paymentTerm}
                            onChange={item => {
                                setPaymentTerm(item.paymentTerm);
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.container, { width: '50%' }]}>
                        <Text style={styles.label}>
                            Billing Address
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="billingAddress"
                            placeholder={!isFocus ? 'Select Address' : '...'}
                            searchPlaceholder="Search..."
                            value={billingAddress}
                            onChange={item => {
                                setBillingAddress(item.billingAddress);
                            }}
                        />
                    </View>
                    <View style={[styles.container, { width: '50%' }]}>
                        <Text style={styles.label}>
                            Shipping Address
                        </Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="shippingAddress"
                            placeholder={!isFocus ? 'Select Address' : '...'}
                            searchPlaceholder="Search..."
                            value={shippingAddress}
                            onChange={item => {
                                setShippingAddress(item.shippingAddress);
                            }}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    {/* <TouchableWithoutFeedback> */}
                    <Button onPress={onShowPopup} title="Add Items Detail" color='white' trailing={props => (
                        <IconButton icon={props => <Icon style={{ color: '#00a7e5' }} name="plus" {...props} />} {...props} />
                    )} />
                    <ProductModal
                        ref={(target) => popupRef = target}
                        onTouchOutside={onClosePopup}
                        title="Demo Modal"
                        addProducts={addProducts}
                    />
                    {/* </TouchableWithoutFeedback> */}
                </View>
                <View style={styles.container}>
                    <Button onPress={() => { alert('sdhfisufosa') }} title="Generate Sales Order" color='#00a7e5' trailing={props => (
                        <IconButton icon={props => <Icon style={{ color: '#00a7e5' }} name="plus" {...props} />} {...props} />
                    )} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default CreateSO