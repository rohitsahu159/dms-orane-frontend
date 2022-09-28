import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native'
import React from 'react';


const ProductList = () => {
    return (
        <SafeAreaView>
            <View >
                <Image style={styles.logo} source={require("../../assets/img/1.jpg")} />
            </View>
            <ScrollView>
                <View style={styles.container}>

                    <Text style={{ fontSize: 24, color: '#00A3E4' }}>Sauches</Text>
                    <Image style={styles.logo} source={require("../../assets/img/Master.jpg")} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductList

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 180,
        flex: 0,
    },
    contain: {
        width: '20%',
        height: '20%',

    },
    atk: {
        marginLeft: 6,
        top: -12,
        color: '#00A3E4',
        fontSize: 20,

    },


    Container: {

        color: '#FFFFFF',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        borderWidth: 50,
        borderColor: '#FFFFFF',
        borderheight: 190,







    },
    contain: {
        marginRight: 40,
        marginLeft: 40,

        marginTop: 10,
    }

})