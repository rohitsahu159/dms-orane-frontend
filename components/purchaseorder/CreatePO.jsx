import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable, Searchbar, Card, Title, Paragraph, Checkbox, TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ProductModal } from '../modal/ProductModal';
// import DatePicker from 'react-native-date-picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { getSeller } from '../../redux/sellerAction/action';
import { getPOMasterData } from '../../redux/purchaseAction/action';
import { getBuyerById } from '../../redux/buyerAction/action';
import { inrFormat } from '../../redux/constants';
import Loader from '../Loader';

const productList = [
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
    { price: [{ mrp: 0, purchasePrice: 0 }], productName: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', gst: 12 },
]

const CreatePO = () => {
    const dispatch = useDispatch()
    const [supplier, setSupplier] = useState(null);
    const [orderType, setOrderType] = useState(null);
    const [paymentTerm, setPaymentTerm] = useState(null);
    const [billingAddress, setBillingAddress] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateMode, setDateMode] = useState('');
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [selectedProductList, setSelectedProductList] = useState([]);
    const [quantity, setQuantity] = useState(1)

    const { loading, user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            dispatch(getSeller(`buyerReferenceId=${user.employerReferenceId}`))
            dispatch(getBuyerById(user.employerReferenceId))
        }
        dispatch(getPOMasterData())
    }, [dispatch])

    const { sellerList } = useSelector(state => state.sellerList)
    const { masterData } = useSelector(state => state.masterData)
    const { buyerData } = useSelector(state => state.buyerData)

    let orderTypeList = []
    let billingAddressList = []
    let shippingAddressList = []
    if (masterData) {
        orderTypeList = masterData.orderType
    }
    if (buyerData) {
        billingAddressList = buyerData.address
        shippingAddressList = buyerData.address
    }

    let paymentTermList = [
        { paymentTerm: 'PAYMENT IN ADVANCE' },
        { paymentTerm: 'CASH ON DELIVERY' },
        { paymentTerm: 'END OF THE MONTH' },
    ]

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        if (dateMode == 'deliveryDate') {
            setDeliveryDate(currentDate)
        } else {
            setExpiryDate(currentDate)
        }
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = (data) => {
        setDateMode(data)
        showMode('date');
    };

    let popupRef = React.createRef()

    const onShowPopup = () => {
        popupRef.show()
    }

    const onClosePopup = () => {
        popupRef.close()
    }

    const addProducts = (data) => {
        setSelectedProductList(data)
    }

    const handelDecreament = () => {
        setQuantity(quantity - 1)
    }
    const handelIncreament = () => {
        setQuantity(quantity + 1)
    }

    return (
        loading ? <Loader /> : <SafeAreaView>

            <View style={styles.container}>
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Supplier
                </Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={sellerList || []}
                    search
                    maxHeight={300}
                    labelField="companyName"
                    valueField="companyName"
                    placeholder={!isFocus ? 'Select Supplier' : '...'}
                    searchPlaceholder="Search..."
                    value={supplier}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setSupplier(item.companyName);
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
                        data={orderTypeList || []}
                        search
                        maxHeight={300}
                        labelField="orderType"
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
                        data={paymentTermList || []}
                        search
                        maxHeight={300}
                        labelField="paymentTerm"
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
                        data={billingAddressList || []}
                        search
                        maxHeight={300}
                        labelField="addressLine1"
                        valueField="addressLine1"
                        placeholder={!isFocus ? 'Select Address' : '...'}
                        searchPlaceholder="Search..."
                        value={billingAddress}
                        onChange={item => {
                            setBillingAddress(item.addressLine1);
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
                        data={shippingAddressList || []}
                        search
                        maxHeight={300}
                        labelField="addressLine1"
                        valueField="addressLine1"
                        placeholder={!isFocus ? 'Select Address' : '...'}
                        searchPlaceholder="Search..."
                        value={shippingAddress}
                        onChange={item => {
                            setShippingAddress(item.addressLine1);
                        }}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.container, { width: '50%' }]}>
                    <Button onPress={() => showDatepicker('deliveryDate')} title="Exp. Delivery Date" />
                    <Text>{deliveryDate.toString()}</Text>
                </View>
                <View style={[styles.container, { width: '50%' }]}>
                    <Button onPress={() => showDatepicker('expiryDate')} title="Expiry Date" />
                    <Text>{expiryDate.toString()}</Text>
                </View>
                {show && (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={styles.container}>
                <Button onPress={onShowPopup} title="Add Items Detail" color='white' trailing={props => (
                    <IconButton icon={props => <Icon onPress={onShowPopup} style={{ color: '#00a7e5' }} name="plus" {...props} />} {...props} />
                )} />
                <ProductModal
                    ref={(target) => popupRef = target}
                    onTouchOutside={onClosePopup}
                    title="Products"
                    addProducts={addProducts}
                />
            </View>
            <View style={{ maxHeight: 500,paddingBottom:30 }}>
                <ScrollView>
                    {selectedProductList && selectedProductList.map((list) => (
                        <Card style={{ marginVertical: 2 }} key={list.productCode}>
                            <Card.Content>
                                <Title style={{ color: '#00a7e5', fontSize: 17, marginTop: -15 }}>{list.productName}</Title>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%' }}>
                                        <Text>MRP : <Text style={{ fontWeight: '500' }}>{inrFormat(list.price[0].mrp)}</Text></Text>
                                        <Text>GST : <Text style={{ fontWeight: '500' }}>{list.gst} %</Text></Text>
                                        <Text>Price/Pcs (Excl GST) : <Text style={{ fontWeight: '500' }}>{inrFormat(list.price[0].purchasePrice)} </Text></Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Button color='#fff' title='-' onPress={handelDecreament} />
                                            <Text style={{ width: 45, textAlign: 'center', margin: 10 }}>{quantity}</Text>
                                            <Button color='#fff' title='+' onPress={handelIncreament} />
                                        </View>
                                        <Text style={{ textAlign: 'center', color: 'green' }}>Total value : <Text style={{ fontWeight: '500' }}>{inrFormat(1234)}</Text></Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    ))}
                </ScrollView>
                <View style={styles.container}>
                    <Button onPress={() => { alert('sdhfisufosa') }} title="Preview Purchase Order" color='#00a7e5' trailing={props => (
                        <IconButton icon={props => <Icon style={{ color: '#00a7e5' }} name="plus" {...props} />} {...props} />
                    )} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
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
        top: 0,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 15,
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

export default CreatePO