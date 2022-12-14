import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Pressable, Modal, Dimensions, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable, Searchbar, Card, Title, Paragraph, Checkbox, TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, IconButton } from '@react-native-material/core';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { getSeller } from '../../redux/actions/sellerAction';
import { createPO, getPOMasterData } from '../../redux/actions/purchaseAction';
import { getBuyerById } from '../../redux/actions/buyerAction';
import { inrFormat } from '../../redux/constants';
import Loader from '../Loader';
import { getProducts } from '../../redux/actions/productAction';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable } from 'react-native-gesture-handler';

const deviceHeight = Dimensions.get('window').height

const data = [
    { id: 1, txt: 'React Native', isChecked: false },
    { id: 2, txt: 'Javascript', isChecked: false },
    { id: 3, txt: 'Laravel', isChecked: false },
    { id: 4, txt: 'PHP', isChecked: false },
    { id: 5, txt: 'jQuery', isChecked: false },
    { id: 6, txt: 'Boostrap', isChecked: false },
    { id: 7, txt: 'HTML', isChecked: false },
];

const CreatePO = () => {
    const dispatch = useDispatch()
    const [supplier, setSupplier] = useState(null);
    const [orderType, setOrderType] = useState(null);
    const [paymentTerm, setPaymentTerm] = useState(null);
    const [billingAddress, setBillingAddress] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateMode, setDateMode] = useState('');
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [quantity, setQuantity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProductList, setSelectedProductList] = useState([]);
    const [selectedSellerData, setSelectedSellerData] = useState({});


    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getSeller(`buyerReferenceId=${user.employerReferenceId}`))
        dispatch(getBuyerById(user.employerReferenceId))
        dispatch(getPOMasterData())
    }, [dispatch, loading])

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

    const handelDecreament = () => {
        setQuantity(quantity - 1)
    }
    const handelIncreament = (name, productCode) => {
        let tempArr = selectedProductList.map((product) => {
            if (productCode == product.productCode) {
                let updatedQuantity = 0
                if (name == 'increase') {
                    updatedQuantity = product.orderedQuantity + 1
                } else {
                    updatedQuantity = product.orderedQuantity - 1
                }

                let grossValue = updatedQuantity * product.prcsWithoutGst
                let primaryDiscountValue = (grossValue * product.primaryDiscountPercent) / 100
                let netValue = grossValue - primaryDiscountValue
                let taxValue = (netValue * product.taxPercent) / 100
                let totalValue = netValue + taxValue
                let discount = primaryDiscountValue
                return {
                    ...product,
                    orderedQuantity: updatedQuantity,
                    grossValue: grossValue,
                    primaryDiscountValue: primaryDiscountValue,
                    netValue: netValue,
                    taxValue: taxValue,
                    totalValue: totalValue,
                    discount: discount
                };
            }
            return product;
        });
        setSelectedProductList(tempArr)
    }

    const openProductModal = async () => {
        if (supplier == '') {
            return alert('Please Select Supplier')
        }
        if (products.length == 0) {
            let bodyData = {
                "pageNumber": 0,
                "pageSize": 25,
                "sellerRole": selectedSellerData.userRole,
                "buyerRole": buyerData.userRole,
                "buyerState": buyerData.address[0].state,
                "buyerUserId": buyerData.userId,
                "hierarchyId": buyerData.hierarchyId,
                "inventoryReferenceId": user.employerUserId,
                "sortArray": [],
                "searchCriteria": [
                    {
                        "key": "sellerId",
                        "value": selectedSellerData.id,
                        "operation": "EQUAL"
                    },
                    {
                        "key": "isActive",
                        "value": true,
                        "operation": "EQUAL"
                    }
                ]
            }
            let data = await dispatch(getProducts(bodyData))
            const arr = data.data.productPrice.map(e => {
                let sgstPercent = 0
                let cgstPercent = 0
                let igstPercent = 0
                let ugstPercent = 0
                if (selectedSellerData.address.state == buyerData.address[0].state) {
                    sgstPercent = e.gst / 2;
                    cgstPercent = e.gst / 2;
                    igstPercent = 0;
                } else {
                    igstPercent = e.gst;
                    cgstPercent = 0;
                    sgstPercent = 0;
                }
                return {
                    ...e,
                    isChecked: false,
                    caseBoxQty: 0,
                    pcsQty: 0,
                    orderedQuantity: 0,
                    mrp: e.price[0].mrp,
                    prcsWithoutGst: e.price[0].purchasePrice / (1 + (e.gst / 100)),
                    purchasePrice: e.price[0].purchasePrice,
                    grossValue: 0,
                    primaryDiscountPercent: 0,
                    primaryDiscountValue: 0,
                    netValue: 0,
                    taxPercent: e.gst,
                    taxValue: 0,
                    totalValue: 0,
                    salesUnit: 'PCS',
                    pcsPerBox: e.standardUnitConversionFactor,
                    sgstPercent: sgstPercent,
                    cgstPercent: cgstPercent,
                    igstPercent: igstPercent,
                    ugstPercent: ugstPercent,
                    discount: 0
                }
            });
            setProducts(arr)
        }
        setModalVisible(!modalVisible)
    }

    const { loading } = useSelector(state => state.products)

    const handleChange = (productCode) => {
        let temp = products.map((product) => {
            if (productCode == product.productCode) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setProducts(temp);

        let selected = temp.filter((product) => product.isChecked);
        setSelectedProductList(selected)
    };

    const onSelectSuplier = (data) => {
        setSelectedSellerData(data)
        setSupplier(data.companyName)
        setProducts([])
        setSelectedProductList([])
    }

    const submitPO = async () => {
        let lineItemArr = await selectedProductList.map(items => _.pick(items, ['productCode', 'productName', 'purchasePrice', 'orderedQuantity',
            'salesUnit', 'pcsPerBox', 'mrp', 'taxPercent', 'totalValue', 'netValue', 'grossValue', 'taxValue', 'sgstPercent', 'cgstPercent',
            'igstPercent', 'ugstPercent', 'discount']))

        let bodyData = {
            sellerUserId: selectedSellerData.userId,
            sellerState: selectedSellerData.address.state,
            sellerFirmName: selectedSellerData.companyName,
            sellerRole: selectedSellerData.userRole,
            sellerPhoneNumber: selectedSellerData.employee == null ? null : selectedSellerData.employee.phoneNumber,
            sellerGstinNumber: selectedSellerData.gstinNumber,
            buyerPanNumber: buyerData.panNumber,
            buyerUserId: buyerData.userId,
            buyerSapCode: buyerData.externalReferenceId,
            buyerFirmName: buyerData.companyName,
            buyerPhoneNumber: buyerData.employee.phoneNumber,
            buyerContactName: buyerData.employee.contactPerson,
            buyerCity: buyerData.address[0].city,
            buyerPincode: buyerData.address[0].pincode,
            buyerState: buyerData.address[0].state,
            buyerRole: buyerData.userRole,
            buyerShippingAddress: shippingAddress,
            buyerBillingAddress: billingAddress,
            netValue: _.sumBy(lineItemArr, function (o) { return o.netValue }),
            grossValue: _.sumBy(lineItemArr, function (o) { return o.grossValue }),
            totalValue: _.sumBy(lineItemArr, function (o) { return o.totalValue }),
            taxValue: _.sumBy(lineItemArr, function (o) { return o.taxValue }),
            orderType: orderType,
            paymentTerm: paymentTerm,
            shipmentMode: null,
            expectedDeliveryDate: Number(deliveryDate),
            orderDateTime: Number(new Date()),
            expiryDateTime: Number(expiryDate),
            hierarchyId: buyerData.hierarchyId,
            lineItems: lineItemArr,
        };

        console.log("bodyData: ", bodyData)
        // dispatch(createPO(bodyData))
    }

    const leftSwipe = () => {
        return <View style={styles.deleteBox}>
            <Icon name="trash" size={30} color="#900" />
        </View>
    }

    const renderFlatList = (renderData) => {
        return (
            <FlatList
                data={renderData}
                renderItem={({ item }) => (
                    <Card style={{ margin: 5 }}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable onPress={() => handleChange(item.productCode)} >
                                    <MaterialCommunityIcons
                                        name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="#000" />
                                </Pressable>
                                <Text style={{ color: '#00a7e5', marginLeft: 15 }}>{item.productName}</Text>
                            </View>

                        </View>
                        <View style={{ marginLeft: 40 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>MRP:</Text >
                                <Text style={{ fontWeight: '500' }}> {inrFormat(item.price[0].mrp)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>GST :</Text >
                                <Text style={{ fontWeight: '500' }}> {item.gst} %</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Purchase Price:</Text >
                                <Text style={{ fontWeight: '500' }}> {inrFormat(item.price[0].purchasePrice)}</Text>
                            </View>
                        </View>
                    </Card>
                )}
            />
        );
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
                    // onChange={item => {
                    //     setSupplier(item.companyName);
                    //     setIsFocus(false);
                    // }}
                    onChange={item => { onSelectSuplier(item) }}
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
                    <Text style={{ textAlign: 'center' }}>{deliveryDate.toDateString()}</Text>
                </View>
                <View style={[styles.container, { width: '50%' }]}>
                    <Button onPress={() => showDatepicker('expiryDate')} title="Expiry Date" />
                    <Text style={{ textAlign: 'center' }}>{expiryDate.toDateString()}</Text>
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
                <Button onPress={() => openProductModal()} title="Add Items Detail" color='white' />
            </View>

            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }}
                    head
                >
                    <View style={styles.modal}>
                        <View style={{ flexDirection: 'row', margin: 15 }}>
                            <Text style={{ width: '50%', fontWeight: 'bold', fontSize: 25, color: 'green' }}>
                                Products
                            </Text>
                            <Text style={{ right: 0, position: 'absolute' }}>
                                <Icon name="arrow-left" onPress={() => { setModalVisible(!modalVisible) }} size={30} color="#900" />
                            </Text>
                        </View>

                        {loading ? <Loader /> : <View style={{ flex: 1 }}>
                            {renderFlatList(products)}
                        </View>}
                    </View>
                </Modal>
            </View>
            <View style={{ maxHeight: 500, paddingBottom: 30 }}>
                <ScrollView>
                    {selectedProductList && selectedProductList.map((list) => (
                        <Swipeable renderLeftActions={leftSwipe} key={list.productCode}>
                            <Card style={{ marginVertical: 2 }}>
                                <Card.Content>
                                    <Title style={{ color: '#00a7e5', fontSize: 17, marginTop: -15 }}>{list.productName}</Title>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text>MRP : <Text style={{ fontWeight: '500' }}>{inrFormat(list.price[0].mrp)}</Text></Text>
                                            <Text>GST : <Text style={{ fontWeight: '500' }}>{list.gst} %</Text></Text>
                                            <Text>Price/Pcs (Excl GST) : <Text style={{ fontWeight: '500' }}>{inrFormat(list.prcsWithoutGst)} </Text></Text>
                                        </View>
                                        <View style={{ width: '50%' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Button color='#fff' title='-' onPress={() => { handelIncreament('decrease', list.productCode) }} />
                                                <Text style={{ width: 45, textAlign: 'center', margin: 10 }}>{list.orderedQuantity}</Text>
                                                <Button color='#fff' title='+' onPress={() => { handelIncreament('increase', list.productCode) }} />
                                            </View>
                                            <Text style={{ textAlign: 'center', color: 'green' }}>Total value : <Text style={{ fontWeight: '500' }}>{inrFormat(list.totalValue)}</Text></Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </Swipeable>
                    ))}
                </ScrollView>
                {selectedProductList.length != 0 && <View style={styles.container}>
                    <Button onPress={() => { submitPO() }} title="Preview Purchase Order" color='#00a7e5' />
                </View>}
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
    modalContainer: {
        justifyContent: 'flex-end',
        // backgroundColor: '#000000AA',
        height: deviceHeight * .8,
    },
    modal: {

        height: deviceHeight * 1,
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    card: {
        // padding: 10,
        // margin: 5,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 5,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    deleteBox:{
        justifyContent:'center',
        margin:30
    }
});

export default CreatePO