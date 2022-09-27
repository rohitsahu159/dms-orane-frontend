import { StyleSheet, Image, Text, View, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { inrFormat } from '../../redux/constants';


const ProductDetail = () => {
    return (
        <SafeAreaView>

            <Image
                style={styles.logo}
                source={require("../../assets/maggi.png")} />
            <View style={styles.container}>
                <Text style={{ fontSize: 18, fontWeight: "400", margin: 10 }}>
                    S&J Pink Pasta Sauce Mix 60 * 2 * 23 gm
                </Text>
                <Text style={{ width: '50%', fontSize: 20, marginLeft: 10, color: '#1a1aff' }}>{inrFormat(30293)}</Text>
            </View>
                 {/* {margin:5,padding:5,top:10} */}

            <Text style={styles.atk}>
                Basic Product Details
            </Text>

            <View  style={styles.container1} >

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Product Name : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>S&J Pink Pasta Sauce Mix 60 * 2 * 23 gm</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Product ID : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>1601474</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Description : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>S&J Pink Pasta Sauce Mix 60 * 2 * 23 gm</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Brand(Division) : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>S&J</Text>
                </View>




                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Category :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>Masala</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Sub Category :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>Pasta Masala</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Sub Category 2 :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}></Text>
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>SAP Product ID :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>1601474</Text>
                </View>



            </View>


        </SafeAreaView>

    )
}

export default ProductDetail

const styles = StyleSheet.create({

    logo: {
        width: '50%',
        height: '40%',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 100
    },
    container: {
        backgroundColor: "white",
        padding: 10,
        margin: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'flex-end'
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
        textAlign:'center',
        fontSize: 20,
        fontWeight:'bold'
    }

})