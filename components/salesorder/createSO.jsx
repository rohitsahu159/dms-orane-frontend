import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView,BackHandler, ScrollView, TouchableOpacity, Pressable, Modal, Dimensions, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable, Searchbar, Card, Title, Paragraph, Checkbox } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, IconButton, TextInput } from '@react-native-material/core';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { getSeller } from '../../redux/actions/sellerAction';
import { createPO, getPOMasterData } from '../../redux/actions/purchaseAction';
import { getBuyerById, getBuyerList } from '../../redux/actions/buyerAction';
import { inrFormat } from '../../redux/constants';
import Loader from '../Loader';
import { getProducts } from '../../redux/actions/productAction';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable } from 'react-native-gesture-handler';
import SelectList from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';

const { height, width } = Dimensions.get('window')

const data = [
    { key: 1, value: 'React Native', isChecked: false },
    { key: 2, value: 'Javascript', isChecked: false },
    { key: 3, value: 'Laravel', isChecked: false },
    { key: 4, value: 'PHP', isChecked: false },
    { key: 5, value: 'jQuery', isChecked: false },
    { key: 6, value: 'Boostrap', isChecked: false },
    { key: 7, value: 'HTML', isChecked: false },
];


const CreatePO = ({ navigation }) => {
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

    const dispatch = useDispatch()
    const [buyer, setBuyer] = useState(null);
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
    const [productList, setProductList] = useState([])
    const [selectedBuyerData, setSelectedBuyerData] = useState({});
    const [search, setSearch] = useState('')
    const [selected, setSelected] = React.useState("");

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getBuyerList(user.employerReferenceId))
        dispatch(getBuyerById(user.employerReferenceId))
        dispatch(getPOMasterData())
    }, [])

    const { buyerList } = useSelector(state => state.buyerList)
    const { masterData } = useSelector(state => state.masterData)
    const { buyerData } = useSelector(state => state.buyerData)

    let orderTypeList = []
    let billingAddressList = []
    let shippingAddressList = []
    if (masterData) {
        orderTypeList = masterData.orderType.map(e => {
            return {
                ...e,
                key: e.orderType,
                value: e.orderType,
            }
        });
    }
    if (buyerData?.address != undefined) {
        let tempAddr = buyerData.address.map(e => {
            return {
                ...e,
                key: e.addressLine1,
                value: e.addressLine1,
            }
        });

        billingAddressList = tempAddr
        shippingAddressList = tempAddr
    }

    let paymentTermList = [
        { key: 'PAYMENT IN ADVANCE', value: 'PAYMENT IN ADVANCE' },
        { key: 'CASH ON DELIVERY', value: 'CASH ON DELIVERY' },
        { key: 'END OF THE MONTH', value: 'END OF THE MONTH' },
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

    const searchFilterFunction = (text) => {
        let searchResult = productList.filter(item =>
            Object.keys(item).some(key =>
                String(item[key]).toLowerCase().includes(text.toLowerCase())
            )
        );
        setProducts(searchResult)
        setSearch(Text)
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


        if (supplier == null) {
            return Toast.show({
                type: 'success',
                position: 'top',
                text1: `Please Select Supplier`,
                visibilityTime: 2000
            })
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
            setProductList(arr)
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

    const onSelectBuyer = (buyerId) => {
        let obj = buyerList.find(o => o.id === buyerId);
        setSelectedBuyerData(obj)
        setBuyer(buyer)
        setProducts([])
        setSelectedProductList([])
    }

    const previewPO = async () => {
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

        // navigation.navigate('previewPO', { params: { data: bodyData } })
    }

    const ItemBox = (props) => {
        let list = props.data.item
        const leftSwipe = () => {
            return <View style={styles.deleteBox}>
                <Icon onPress={props.handelDelete} name="trash" size={30} color="#900" />
            </View>
        }
        return (
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
        )
    }

    const deleteItem = async (lineItem) => {
        let selectedTempArr = await _.reject(selectedProductList, { productCode: lineItem.item.productCode })

        let productsTempArr = await products.map((product) => {
            if (lineItem.item.productCode == product.productCode) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setProducts(productsTempArr);
        setSelectedProductList(selectedTempArr)
    }

    const renderFlatList = (renderData) => {
        return (
            <FlatList
                data={renderData}
                renderItem={({ item }) => (
                    <Card style={{ margin: 5 }} onLongPress={() => handleChange(item.productCode)}>
                        <View>
                            <View style={{ flexDirection: 'row', width: '90%' }}>
                                <Pressable onPress={() => handleChange(item.productCode)} >
                                    <Checkbox
                                        status={item.isChecked ? 'checked' : 'unchecked'}
                                    />
                                </Pressable>
                                <Text style={{ color: '#00a7e5', marginTop: 5, fontSize: 16 }}>{`${item.productCode} - ${item.productName}`}</Text>
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
        <SafeAreaView style={{ height: height }}>
            <View style={styles.containner1}>
                <View style={styles.container}>
                    <Text style={{ paddingLeft: 5, color: '#00a7e5' }}>Buyer</Text>
                    <SelectList setSelected={setBuyer} data={buyerList || []} onSelect={() => onSelectBuyer(buyer)} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.container, { width: '50%' }]}>
                        <Text style={{ paddingLeft: 5, color: '#00a7e5' }}>Order Type</Text>
                        <SelectList setSelected={setOrderType} data={orderTypeList || []} onSelect={() => setOrderType(orderType)} />
                    </View>
                    <View style={[styles.container, { width: '50%' }]}>
                        <Text style={{ paddingLeft: 5, color: '#00a7e5' }}>Payment Term</Text>
                        <SelectList setSelected={setPaymentTerm} data={paymentTermList || []} onSelect={() => setPaymentTerm(paymentTerm)} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.container, { width: '50%' }]}>
                        <Text style={{ paddingLeft: 5, color: '#00a7e5' }}>Billing Address</Text>
                        <SelectList setSelected={setBillingAddress} data={billingAddressList || []} onSelect={() => setBillingAddress(billingAddress)} />
                    </View>
                    <View style={[styles.container, { width: '50%' }]}>
                        <Text style={{ paddingLeft: 5, color: '#00a7e5' }}>Shipping Address</Text>
                        <SelectList setSelected={setShippingAddress} data={shippingAddressList || []} onSelect={() => setShippingAddress(shippingAddress)} />
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
                                <TextInput
                                    label="Search..."
                                    color='#00a7e5'
                                    style={{ width: '80%' }}
                                    value={search}
                                    onChangeText={(text) => searchFilterFunction(text)}
                                    leading={props => <Icon name="search" {...props} />}
                                />
                                <Text style={{ right: 0, position: 'absolute', width: '10%', marginVertical: 10 }}>
                                    <Icon name="plus-circle" onPress={() => { setModalVisible(!modalVisible) }} size={35} color="#00a7e5" />
                                </Text>
                            </View>
                            {loading ? <Loader /> : <View style={{ flex: 1 }}>
                                {renderFlatList(products)}
                            </View>}
                        </View>
                    </Modal>
                </View>
                <View style={{ flex: 1, paddingBottom: 80 }}>
                    <FlatList
                        data={selectedProductList}
                        renderItem={(item) => {
                            return <ItemBox data={item} handelDelete={() => { deleteItem(item) }} />
                        }}
                    />
                    {selectedProductList.length != 0 && <View style={{ position: 'absolute', bottom: 60, width: '100%' }}>
                        <Button onPress={() => { previewPO() }} title="Preview Purchase Order" color='#00a7e5' />
                    </View>}
                </View>
                <Toast />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containner1: {
        height: height,
        width: width
    },
    container: {
        backgroundColor: 'white',
        padding: 8,
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
        height: height * .8,
    },
    modal: {
        height: height * 1,
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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
    deleteBox: {
        justifyContent: 'center',
        margin: 30
    },
});

export default CreatePO