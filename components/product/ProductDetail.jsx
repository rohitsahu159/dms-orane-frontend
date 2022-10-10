import { StyleSheet, Image, Text, View, SafeAreaView, BackHandler, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, inrFormat } from '../../redux/constants';
import { getProuctDetail } from '../../redux/actions/productAction';
import Loader from '../Loader';
import Icon from 'react-native-vector-icons/FontAwesome';


const ProductDetail = ({ route, navigation }) => {
    useEffect(() => {
        const backAction = () => {
            navigation.navigate("productList")
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
                    <Icon name="arrow-left" size={25} onPress={() => navigation.navigate('productList')} color="#00a7e5" />
                </View>
            ),
        });
    }, [navigation]);

    const dispatch = useDispatch()
    const { itemId } = route.params;

    useEffect(() => {
        dispatch(getProuctDetail(itemId))
    }, [dispatch, itemId])

    const { productDetail, loading } = useSelector(state => state.productDetail)

    let product = {}
    if (productDetail != undefined) {
        product = productDetail
    }

    return (
        loading ? <Loader /> : <SafeAreaView>
            <Image
                source={{ uri: `${product.imageUrl}` }}
                style={styles.logo}
            />
            <View style={styles.container}>
                <Text style={{ fontSize: 18, fontWeight: "400", margin: 10, color: COLORS.oraneBlue }}>
                    {product.productDescription}
                </Text>
            </View>
            <Text style={styles.atk}>
                Basic Product Details
            </Text>

            <View style={styles.container1} >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Product Name : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7, fontWeight: 'bold' }}>{product.productName}</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Product ID : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7, fontWeight: 'bold' }}>{product.productCode}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Brand (Division) : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7, fontWeight: 'bold' }}>{product.productHierarchy?.division}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Category :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7, fontWeight: 'bold' }}>{product.productHierarchy?.category}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Sub Category :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7, fontWeight: 'bold' }}>{product.productHierarchy?.subCategory}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Sub Category 2 :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7, fontWeight: 'bold' }}>{product.productHierarchy?.subCategory2}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>SAP Product ID :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7, fontWeight: 'bold' }}>{product.externalReferenceId}</Text>
                </View>

            </View>
        </SafeAreaView>

    )
}

export default ProductDetail

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        marginTop: 20,
        resizeMode: 'contain'
    },
    container: {
        backgroundColor: "white",
        padding: 10,
        margin: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center'
    },
    container1: {
        backgroundColor: "white",
        padding: 10,
        margin: 10,
        justifyContent: 'flex-end'
    },
    coconut: {
        width: '22%',
        height: '6%',
        backgroundColor: "white",
        padding: 10,
        margin: 10,
        borderRadius: 20
    },
    atk: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
})