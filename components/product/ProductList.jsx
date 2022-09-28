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


const plants = [
    {
        id: 1,
        name: 'Succulent Plant',
        price: '39.99',
        like: true,
        img: require('../../assets/img/Master.jpg'),
        about:
            'Succulent Plantis one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },

    {
        id: 2,
        name: 'Dragon Plant',
        price: '29.99',
        like: false,
        img: require('../../assets/img/plant.png'),
        about:
            'Dragon Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
        id: 3,
        name: 'Ravenea Plant',
        price: '25.99',
        like: false,
        img: require('../../assets/img/plant.png'),
        about:
            'Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },

    {
        id: 4,
        name: 'Potted Plant',
        price: '25.99',
        like: true,
        img: require('../../assets/img/plant.png'),
        about:
            'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
        id: 5,
        name: 'Ravenea Plant',
        price: '50.99',
        like: true,
        img: require('../../assets/img/plant.png'),
        about:
            'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
        id: 6,
        name: 'Dragon Plant',
        price: '50.99',
        like: false,
        img: require('../../assets/img/plant.png'),
        about:
            'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
];

const SaucesPrd = ({ navigation }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            let bodyData = {
                "pageNumber": 0,
                "pageSize": 9999,
                "sellerRole": "COMPANY",
                "sortArray": [],
                "searchCriteria": [
                    {
                        "key": "division",
                        "operation": "PRODUCT_HIERARCHY_EQUAL",
                        "value": "S&J"
                    }
                ]
            }
            dispatch(getAllProducts(bodyData))
        }

    }, [dispatch, loading])

    const { loading, user } = useSelector(state => state.auth)

    const { allProductList } = useSelector(state => state.allProducts)

    let products = []
    if (allProductList != undefined) {
        products = allProductList.product
    }

    const Card = ({ product }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail')}>
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
                        {product.productName}
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
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={products || []}
                renderItem={({ item }) => {
                    return <Card product={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const NoodlesPrd = ({ navigation }) => {
    const Card = ({ plant }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail', plant)}>
                <View style={styles.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={plant.img}
                            style={{ flex: 1, resizeMode: 'contain' }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, color: COLORS.oraneBlue }}>
                        {plant.name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            MRP: {inrFormat(plant.price)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={plants}
                renderItem={({ item }) => {
                    return <Card plant={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const MasalaPrd = ({ navigation }) => {
    const Card = ({ plant }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail', plant)}>
                <View style={styles.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={plant.img}
                            style={{ flex: 1, resizeMode: 'contain' }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, color: COLORS.oraneBlue }}>
                        {plant.name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            MRP: {inrFormat(plant.price)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={plants}
                renderItem={({ item }) => {
                    return <Card plant={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const SoupsPrd = ({ navigation }) => {
    const Card = ({ plant }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail', plant)}>
                <View style={styles.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={plant.img}
                            style={{ flex: 1, resizeMode: 'contain' }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, color: COLORS.oraneBlue }}>
                        {plant.name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            MRP: {inrFormat(plant.price)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={plants}
                renderItem={({ item }) => {
                    return <Card plant={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const CookingPastePrd = ({ navigation }) => {
    const Card = ({ plant }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('productDetail', plant)}>
                <View style={styles.card}>
                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={plant.img}
                            style={{ flex: 1, resizeMode: 'contain' }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, color: COLORS.oraneBlue }}>
                        {plant.name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            MRP: {inrFormat(plant.price)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={plants}
                renderItem={({ item }) => {
                    return <Card plant={item} />;
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
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={25} style={{ marginLeft: 20 }} />
                    <TextInput placeholder="Search" style={styles.input} />
                </View>
            </View>
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
        height: 50,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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