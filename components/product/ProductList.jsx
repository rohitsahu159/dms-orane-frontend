import { SafeAreaView, ScrollView, Image, StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, inrFormat } from '../../redux/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import { getAllProducts } from '../../redux/actions/productAction';

const Tab = createMaterialTopTabNavigator();
const width = Dimensions.get('window').width / 2 - 30;

const SaucesPrd = ({ navigation }) => {
    const dispatch = useDispatch()
    const [saucesProduct, setSaucesProduct] = useState([])
    const [search, setSearch] = useState('')
    const [productList, setProductList] = useState([])


    useEffect(() => {
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 9999,
            "sortArray": [],
            "searchCriteria": [
                {
                    "key": "category",
                    "operation": "PRODUCT_HIERARCHY_EQUAL",
                    "value": "Sauces"
                }
            ]
        }

        getProducts(bodyData)

    }, [])

    const getProducts = async (data) => {
        let products = await dispatch(getAllProducts(data))
        setSaucesProduct(products.data.product)
        setProductList(products.data.product)
    }

    const searchFilterFunction = (text) => {
        let searchResult = productList.filter(item =>
            Object.keys(item).some(key =>
                String(item[key]).toLowerCase().includes(text.toLowerCase())
            )
        );
        setSaucesProduct(searchResult)
        setSearch(Text)
    }

    const Card = ({ product }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail', { itemId: product.id })}>
                <View style={styles.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: `${product.imageUrl}` }}
                            style={{ flex: 1, resizeMode: 'contain', height: 170, width: '100%' }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 10, color: COLORS.oraneBlue }}>
                        {product.productCode} - {product.productName}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            Net Weight: {product.netWeight}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={styles.searchContainer}>
                <TextInput onChangeText={(text) => { searchFilterFunction(text) }} value={search} placeholder="Search Product..." style={styles.input} />
            </View>

            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={saucesProduct || []}
                renderItem={({ item }) => {
                    return <Card product={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const NoodlesPrd = ({ navigation }) => {
    const dispatch = useDispatch()
    const [noodlesProduct, setNoodlesProduct] = useState([])
    const [search, setSearch] = useState('')
    const [noodlesList, setNoodlesList] = useState([])

    useEffect(() => {
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 9999,
            "sortArray": [],
            "searchCriteria": [
                {
                    "key": "category",
                    "operation": "PRODUCT_HIERARCHY_EQUAL",
                    "value": "Noodles"
                }
            ]
        }

        getProducts(bodyData)

    }, [])

    const getProducts = async (data) => {
        let products = await dispatch(getAllProducts(data))
        setNoodlesProduct(products.data.product)
        setNoodlesList(products.data.product)
    }

    
    const searchFilterFunction = (text) => {
        let searchResult = noodlesList.filter(item =>
            Object.keys(item).some(key =>
                String(item[key]).toLowerCase().includes(text.toLowerCase())
            )
        );
        setNoodlesProduct(searchResult)
        setSearch(Text)
    }


    const Card = ({ product }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail', { itemId: product.id })}>
                <View style={styles.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: `${product.imageUrl}` }}
                            style={{ flex: 1, resizeMode: 'contain', height: 170, width: '100%' }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 10, color: COLORS.oraneBlue }}>
                      {product.productCode} - {product.productName}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            Net Weight: {product.netWeight}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.searchContainer}>
                <TextInput onChangeText={(text) => { searchFilterFunction(text) }} value={search} placeholder="Search Product..." style={styles.input} />
            </View>

            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={noodlesProduct || []}
                renderItem={({ item }) => {
                    return <Card product={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const MasalaPrd = ({ navigation }) => {
    const dispatch = useDispatch()
    const [masalaProduct, setMasalaProduct] = useState([])
    const [search, setSearch] = useState('')
    const [masalaList, setMasalaList] = useState([])

    useEffect(() => {
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 9999,
            "sortArray": [],
            "searchCriteria": [
                {
                    "key": "category",
                    "operation": "PRODUCT_HIERARCHY_EQUAL",
                    "value": "Masala"
                }
            ]
        }

        getProducts(bodyData)

    }, [])

    const getProducts = async (data) => {
        let products = await dispatch(getAllProducts(data))
        setMasalaProduct(products.data.product)
        setMasalaList(products.data.product)
    }
    const searchFilterFunction = (text) => {
        let searchResult = masalaList.filter(item =>
            Object.keys(item).some(key =>
                String(item[key]).toLowerCase().includes(text.toLowerCase())
            )
        );
        setMasalaProduct(searchResult)
        setSearch(Text)
    }

    const Card = ({ product }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail', { itemId: product.id })}>
                <View style={styles.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: `${product.imageUrl}` }}
                            style={{ flex: 1, resizeMode: 'contain', height: 170, width: '100%' }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 10, color: COLORS.oraneBlue }}>
                       {product.productCode} - {product.productName}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            Net Weight: {product.netWeight}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
               <View style={styles.searchContainer}>
                <TextInput onChangeText={(text) => { searchFilterFunction(text) }} value={search} placeholder="Search Product..." style={styles.input} />
            </View>
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={masalaProduct || []}
                renderItem={({ item }) => {
                    return <Card product={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const SoupsPrd = ({ navigation }) => {
    const dispatch = useDispatch()
    const [soupsProduct, setSoupsProduct] = useState([])
    const [search, setSearch] = useState('')
    const [soupsList, setSoupsList] = useState([])

    useEffect(() => {
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 9999,
            "sortArray": [],
            "searchCriteria": [
                {
                    "key": "category",
                    "operation": "PRODUCT_HIERARCHY_EQUAL",
                    "value": "Soups"
                }
            ]
        }

        getProducts(bodyData)

    }, [])

    const getProducts = async (data) => {
        let products = await dispatch(getAllProducts(data))
        setSoupsProduct(products.data.product)
        setSoupsList(products.data.product)

    }

    const searchFilterFunction = (text) => {
        let searchResult = soupsList.filter(item =>
            Object.keys(item).some(key =>
                String(item[key]).toLowerCase().includes(text.toLowerCase())
            )
        );
        setSoupsProduct(searchResult)
        setSearch(Text)
    }
    

    const Card = ({ product }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail', { itemId: product.id })}>
                <View style={styles.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: `${product.imageUrl}` }}
                            style={{ flex: 1, resizeMode: 'contain', height: 170, width: '100%' }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 10, color: COLORS.oraneBlue }}>
                      {product.productCode} - {product.productName}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            Net Weight: {product.netWeight}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
                    <View style={styles.searchContainer}>
                <TextInput onChangeText={(text) => { searchFilterFunction(text) }} value={search} placeholder="Search Product..." style={styles.input} />
            </View>
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={soupsProduct || []}
                renderItem={({ item }) => {
                    return <Card product={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const CookingPastePrd = ({ navigation }) => {
    const dispatch = useDispatch()
    const [cookingPasteProduct, setCookingPasteProduct] = useState([])
    const [search, setSearch] = useState('')
    const [cookingpastaList, setCookingPastaList] = useState([])


    useEffect(() => {
        let bodyData = {
            "pageNumber": 0,
            "pageSize": 9999,
            "sortArray": [],
            "searchCriteria": [
                {
                    "key": "category",
                    "operation": "PRODUCT_HIERARCHY_EQUAL",
                    "value": "Cooking Paste"
                }
            ]
        }

        getProducts(bodyData)

    }, [])

    const getProducts = async (data) => {
        let products = await dispatch(getAllProducts(data))
        setCookingPasteProduct(products.data.product)
        setCookingPastaList(products.data.product)
    }

    const searchFilterFunction = (text) => {
        let searchResult = cookingpastaList.filter(item =>
            Object.keys(item).some(key =>
                String(item[key]).toLowerCase().includes(text.toLowerCase())
            )
        );
        setCookingPasteProduct(searchResult)
        setSearch(Text)
    }

    const Card = ({ product }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail', { itemId: product.id })}>
                <View style={styles.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: `${product.imageUrl}` }}
                            style={{ flex: 1, resizeMode: 'contain', height: 170, width: '100%' }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 10, color: COLORS.oraneBlue }}>
                    {product.productCode} - {product.productName}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            Net Weight: {product.netWeight}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>

                <View style={styles.searchContainer}>
                <TextInput onChangeText={(text) => { searchFilterFunction(text) }} value={search} placeholder="Search Product..." style={styles.input} />
            </View>
          
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={cookingPasteProduct || []}
                renderItem={({ item }) => {
                    return <Card product={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const ProductList = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
            // paddingHorizontal: 20,
            backgroundColor: COLORS.white
        }}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/img/1.jpg')}
                    style={{ flex: 1, resizeMode: 'contain', height: 170, width: '100%' }}
                />
            </View>
            {/* <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={25} style={{ marginLeft: 20 }} />
                    <TextInput placeholder="Search" style={styles.input} />
                </View>
            </View> */}
            <Tab.Navigator
                initialRouteName='sauces'
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "#555",
                    tabBarLabelStyle: {
                        fontSize: 18,
                    },
                    tabBarItemStyle: {
                        width: 'auto',
                        alignItems: 'flex-start',
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
    )
}

export default ProductList

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
    categoryTextSelected: {
        color: COLORS.green,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: COLORS.green,
    },
    card: {
        height: 210,
        backgroundColor: COLORS.light,
        width,
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
    header: {
        // marginTop: 30,
        // width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchContainer: {
        height: 40,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        margin: 5,
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: COLORS.dark,
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
    },
})