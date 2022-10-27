import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, BackHandler, ScrollView, TouchableOpacity, Pressable, Modal, Dimensions, FlatList, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable, Searchbar, Card, Title, Paragraph, Checkbox } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, IconButton, TextInput } from '@react-native-material/core';
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
import SelectList from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';
import { COLORS } from '../../redux/constants';
const { height, width } = Dimensions.get('window')

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();


const CreatePO = ({ navigation }) => {
    useEffect(() => {
        const backAction = () => {

            navigation.navigate("myPurchaseOrder")

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
                    <Icon name="arrow-left" size={25} onPress={() => navigation.navigate('myPurchaseOrder')} color="#00a7e5" />
                </View>
            ),
        });
    }, [navigation]);

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
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
    const [productList, setProductList] = useState([])
    const [selectedSellerData, setSelectedSellerData] = useState({});
    const [search, setSearch] = useState('')
    const [selected, setSelected] = React.useState("");

    const [saucesProductList, setSaucesProductList] = useState([])
    const [noodelsProductList, setNoodelsProductList] = useState([])
    const [masalaProductList, setMasalaProductList] = useState([])
    const [cookingPasteProductList, setCookingPasteProductList] = useState([])
    const [soupsProductList, setSoupsProductList] = useState([])

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getSeller(`buyerReferenceId=${user.employerReferenceId}`))
        dispatch(getBuyerById(user.employerReferenceId))
        dispatch(getPOMasterData())
    }, [])

    const { sellerList } = useSelector(state => state.sellerList)
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

    const handelIncreament = async (value, productCode, label) => {
        let tempArr = await selectedProductList.map((product) => {
            if (productCode == product.productCode) {
                let caseBoxQty = product.caseBoxQty
                let pcsQty = product.pcsQty
                if (label == 'caseBoxQty') {
                    caseBoxQty = Number(value)
                } else {
                    pcsQty = Number(value)
                }
                let orderedQuantity = (caseBoxQty * product.standardUnitConversionFactor) + pcsQty
                console.log(orderedQuantity)
                let grossValue = orderedQuantity * product.prcsWithoutGst
                let primaryDiscountValue = (grossValue * product.primaryDiscountPercent) / 100
                let netValue = grossValue - primaryDiscountValue
                let taxValue = (netValue * product.taxPercent) / 100
                let totalValue = netValue + taxValue
                let discount = primaryDiscountValue
                return {
                    ...product,
                    caseBoxQty: caseBoxQty,
                    pcsQty: pcsQty,
                    orderedQuantity: value,
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

    const getModifiedData = (products) => {
        return products.map(e => {
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
                mrp: e.price.length != 0 ? e.price[0].mrp : 0,
                prcsWithoutGst: e.price.length != 0 ? (e.price[0].purchasePrice / (1 + (e.gst / 100))) : 0,
                purchasePrice: e.price.length != 0 ? (e.price[0].purchasePrice) : 0,
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
        setIsLoading(true)

        if (saucesProductList.length == 0) {
            let bodyData = {
                "pageNumber": 0,
                "pageSize": 9999,
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
                        "key": "category",
                        "operation": "PRODUCT_HIERARCHY_EQUAL",
                        "value": "Sauces"
                    },
                    {
                        "key": "isActive",
                        "value": true,
                        "operation": "EQUAL"
                    }
                ]
            }
            let data = await dispatch(getProducts(bodyData))
            let arr1 = await getModifiedData(data.data.productPrice)
            setSaucesProductList(arr1)
        }

        if (noodelsProductList.length == 0) {
            let bodyData = {
                "pageNumber": 0,
                "pageSize": 9999,
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
                        "key": "category",
                        "operation": "PRODUCT_HIERARCHY_EQUAL",
                        "value": "Noodles"
                    },
                    {
                        "key": "isActive",
                        "value": true,
                        "operation": "EQUAL"
                    }
                ]
            }
            let data = await dispatch(getProducts(bodyData))
            let arr2 = await getModifiedData(data.data.productPrice)
            setNoodelsProductList(arr2)
        }

        if (masalaProductList.length == 0) {
            let bodyData = {
                "pageNumber": 0,
                "pageSize": 9999,
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
                        "key": "category",
                        "operation": "PRODUCT_HIERARCHY_EQUAL",
                        "value": "Masala"
                    },
                    {
                        "key": "isActive",
                        "value": true,
                        "operation": "EQUAL"
                    }
                ]
            }
            let data = await dispatch(getProducts(bodyData))
            let arr3 = await getModifiedData(data.data.productPrice)
            setMasalaProductList(arr3)
        }

        if (cookingPasteProductList.length == 0) {
            let bodyData = {
                "pageNumber": 0,
                "pageSize": 9999,
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
                        "key": "category",
                        "operation": "PRODUCT_HIERARCHY_EQUAL",
                        "value": "Cooking Paste"
                    },
                    {
                        "key": "isActive",
                        "value": true,
                        "operation": "EQUAL"
                    }
                ]
            }
            let data = await dispatch(getProducts(bodyData))
            let arr4 = await getModifiedData(data.data.productPrice)
            setCookingPasteProductList(arr4)
        }

        if (soupsProductList.length == 0) {
            let bodyData = {
                "pageNumber": 0,
                "pageSize": 9999,
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
                        "key": "category",
                        "operation": "PRODUCT_HIERARCHY_EQUAL",
                        "value": "Soups"
                    },
                    {
                        "key": "isActive",
                        "value": true,
                        "operation": "EQUAL"
                    }
                ]
            }
            let data = await dispatch(getProducts(bodyData))
            let arr5 = await getModifiedData(data.data.productPrice)
            setSoupsProductList(arr5)
        }

        setIsLoading(false)
        setModalVisible(!modalVisible)
    }

    const handleChange = (productCode, tabName) => {
        if (tabName == 'sauceTab') {
            let temp = saucesProductList.map((product) => {
                if (productCode == product.productCode) {
                    return { ...product, isChecked: !product.isChecked };
                }
                return product;
            });
            setSaucesProductList(temp);
        }

        if (tabName == 'noodlesTab') {
            let temp = noodelsProductList.map((product) => {
                if (productCode == product.productCode) {
                    return { ...product, isChecked: !product.isChecked };
                }
                return product;
            });
            setNoodelsProductList(temp);
        }

        if (tabName == 'masalaTab') {
            let temp = masalaProductList.map((product) => {
                if (productCode == product.productCode) {
                    return { ...product, isChecked: !product.isChecked };
                }
                return product;
            });
            setMasalaProductList(temp);
        }

        if (tabName == 'cookingpasteTab') {
            let temp = cookingPasteProductList.map((product) => {
                if (productCode == product.productCode) {
                    return { ...product, isChecked: !product.isChecked };
                }
                return product;
            });
            setCookingPasteProductList(temp);
        }

        if (tabName == 'soupsTab') {
            let temp = soupsProductList.map((product) => {
                if (productCode == product.productCode) {
                    return { ...product, isChecked: !product.isChecked };
                }
                return product;
            });
            setSoupsProductList(temp);
        }
    };

    const onSelectSuplier = (supplierId) => {
        let obj = sellerList.find(o => o.id === supplierId);
        setSelectedSellerData(obj)
        setSupplier(supplier)
        setProducts([])
        setSelectedProductList([])
    }

    const SaucesPrd = ({ navigation }) => {

        return (
            <View>
                <FlatList
                    data={saucesProductList}
                    keyExtractor={item => `key-${item.productCode}`}
                    renderItem={({ item, index }) => (
                        <Card style={{ margin: 5, padding: 10, backgroundColor: item.isChecked ? '#E7E9E9' : 'white' }} onPress={() => handleChange(item.productCode, 'sauceTab')}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <View>
                                        <Text style={{ color: '#00a7e5', marginTop: 5, fontSize: 16 }}>{`${item.productCode} - ${item.productName}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>MRP:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.mrp)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>GST :</Text >
                                        <Text style={{ fontWeight: '500' }}> {item.gst} %</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Purchase Price:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.purchasePrice)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    )}
                />
            </View>
        )
    }

    const NoodlesPrd = ({ navigation }) => {

        return (
            <View>
                <FlatList
                    data={noodelsProductList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card style={{ margin: 5, padding: 10, backgroundColor: item.isChecked ? '#E7E9E9' : 'white' }} onPress={() => handleChange(item.productCode, 'noodlesTab')}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <View>
                                        <Text style={{ color: '#00a7e5', marginTop: 5, fontSize: 16 }}>{`${item.productCode} - ${item.productName}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>MRP:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.mrp)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>GST :</Text >
                                        <Text style={{ fontWeight: '500' }}> {item.gst} %</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Purchase Price:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.purchasePrice)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    )}
                />
            </View>
        )
    }

    const MasalaPrd = ({ navigation }) => {

        return (
            <View>
                <FlatList
                    data={masalaProductList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card style={{ margin: 5, padding: 10, backgroundColor: item.isChecked ? '#E7E9E9' : 'white' }} onPress={() => handleChange(item.productCode, 'masalaTab')}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <View>
                                        <Text style={{ color: '#00a7e5', marginTop: 5, fontSize: 16 }}>{`${item.productCode} - ${item.productName}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>MRP:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.mrp)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>GST :</Text >
                                        <Text style={{ fontWeight: '500' }}> {item.gst} %</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Purchase Price:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.purchasePrice)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    )}
                />
            </View>
        )
    }

    const SoupsPrd = ({ navigation }) => {

        return (
            <View>
                <FlatList
                    data={soupsProductList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card style={{ margin: 5, padding: 10, backgroundColor: item.isChecked ? '#E7E9E9' : 'white' }} onPress={() => handleChange(item.productCode, 'soupsTab')}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <View>
                                        <Text style={{ color: '#00a7e5', marginTop: 5, fontSize: 16 }}>{`${item.productCode} - ${item.productName}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>MRP:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.mrp)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>GST :</Text >
                                        <Text style={{ fontWeight: '500' }}> {item.gst} %</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Purchase Price:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.purchasePrice)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    )}
                />
            </View>
        )
    }

    const CookingPastePrd = ({ navigation }) => {

        return (
            <View>
                <FlatList
                    data={cookingPasteProductList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card style={{ margin: 5, padding: 10, backgroundColor: item.isChecked ? '#E7E9E9' : 'white' }} onPress={() => handleChange(item.productCode, 'cookingpasteTab')}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <View>
                                        <Text style={{ color: '#00a7e5', marginTop: 5, fontSize: 16 }}>{`${item.productCode} - ${item.productName}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>MRP:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.mrp)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>GST :</Text >
                                        <Text style={{ fontWeight: '500' }}> {item.gst} %</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Purchase Price:</Text >
                                        <Text style={{ fontWeight: '500' }}> {inrFormat(item.purchasePrice)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    )}
                />
            </View>
        )
    }

    const addSelectedProducts = async () => {
        setIsLoading(true)
        let array1 = await saucesProductList.filter((product) => product.isChecked);
        let array2 = await noodelsProductList.filter((product) => product.isChecked);
        let array3 = await masalaProductList.filter((product) => product.isChecked);
        let array4 = await cookingPasteProductList.filter((product) => product.isChecked);
        let array5 = await soupsProductList.filter((product) => product.isChecked);
        let mergedArray = await array1.concat(array2, array3, array4, array5)
        setSelectedProductList(mergedArray)
        setModalVisible(false)
        setIsLoading(false)
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

        navigation.navigate('previewPO', { params: { data: bodyData } })
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
                <Card style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Card.Content>
                        <Title style={{ color: '#00a7e5', fontSize: 17, marginTop: -15 }}>{list.productName}</Title>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%' }}>
                                <Text>MRP : <Text style={{ fontWeight: '500' }}>{inrFormat(list.mrp)}</Text></Text>
                                <Text>GST : <Text style={{ fontWeight: '500' }}>{list.gst} %</Text></Text>
                                <Text>Price/Pcs (Excl GST) : <Text style={{ fontWeight: '500' }}>{inrFormat(list.prcsWithoutGst)} </Text></Text>
                                <Text>Pcs/Box : <Text style={{ fontWeight: '500' }}>{list.standardUnitConversionFactor} </Text></Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%', marginHorizontal: 2 }}>
                                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                        <TextInput
                                            label="Cases"
                                            variant='outlined'
                                            value={String(list.caseBoxQty)}
                                            keyboardType='numeric'
                                            onChange={(value) => { handelIncreament(value, list.productCode, 'caseBoxQty') }}
                                            />

                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <TextInput
                                            label="Pcs"
                                            variant='outlined'
                                            value={String(list.pcsQty)}
                                            keyboardType='numeric'
                                            onChangeText={(value) => { handelIncreament(value, list.productCode, 'pcsQty') }}
                                        />
                                    </View>
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

        let productsTempArr1 = await saucesProductList.map((product) => {
            if (lineItem.item.productCode == product.productCode) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setSaucesProductList(productsTempArr1);

        let productsTempArr2 = await noodelsProductList.map((product) => {
            if (lineItem.item.productCode == product.productCode) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setNoodelsProductList(productsTempArr2);

        let productsTempArr3 = await masalaProductList.map((product) => {
            if (lineItem.item.productCode == product.productCode) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setMasalaProductList(productsTempArr3);

        let productsTempArr4 = await cookingPasteProductList.map((product) => {
            if (lineItem.item.productCode == product.productCode) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setCookingPasteProductList(productsTempArr4);

        let productsTempArr5 = await soupsProductList.map((product) => {
            if (lineItem.item.productCode == product.productCode) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setSoupsProductList(productsTempArr5);

        setSelectedProductList(selectedTempArr)
    }

    return (
        <SafeAreaView style={{ height: height }}>
            <View style={styles.containner1}>
                <View style={styles.container}>
                    <Text style={{ paddingLeft: 5, color: '#00a7e5' }}>Supplier</Text>
                    <SelectList setSelected={setSupplier} data={sellerList || []} onSelect={() => onSelectSuplier(supplier)} />
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

                {isLoading ? <Loader /> : <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }}
                    head
                >
                    <View style={styles.modal}>

                        <SafeAreaView style={{
                            flex: 1,
                            backgroundColor: COLORS.white,
                        }}>
                            {isLoading ? <Loader /> : <View style={{ width: '80%', alignSelf: 'center', padding: 20 }}>
                                <Button onPress={() => { addSelectedProducts() }} title="Add Selected Products" color='#00a7e5' />
                            </View>}
                            <Tab.Navigator
                                initialRouteName='sauces'
                                screenOptions={({ route }) => ({
                                    tabBarActiveTintColor: "blue",
                                    tabBarInactiveTintColor: "#555",
                                    tabBarLabelStyle: {
                                        fontSize: 15,
                                    },
                                    tabBarItemStyle: {
                                        width: 'auto',
                                        alignItems: 'center',
                                    },
                                    tabBarScrollEnabled: true
                                })}
                            >
                                <Tab.Screen
                                    name='sauces'
                                    component={SaucesPrd}
                                    options={{
                                        title: "Sauces"
                                    }}
                                />
                                <Tab.Screen
                                    name='noodles'
                                    component={NoodlesPrd}
                                    options={{
                                        title: "Noodles"
                                    }}
                                />
                                <Tab.Screen
                                    name='masala'
                                    component={MasalaPrd}
                                    options={{
                                        title: "Masala"
                                    }}
                                />
                                <Tab.Screen
                                    name='cookingPaste'
                                    component={CookingPastePrd}
                                    options={{
                                        title: "Cooking Paste"
                                    }}
                                />
                                <Tab.Screen
                                    name='soups'
                                    component={SoupsPrd}
                                    options={{
                                        title: "Soups"
                                    }}
                                />
                            </Tab.Navigator>
                        </SafeAreaView>
                    </View>
                </Modal>}
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