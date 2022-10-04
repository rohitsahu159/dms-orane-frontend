import { StyleSheet, SafeAreaView, Text, Dimensions, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';

const { height, width } = Dimensions.get('window')

const CompanyProfile = () => {
    return (
        <SafeAreaView>

            <View style={styles.container}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Address : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>Villa Capital,Sadhana Compound,{'\n'}Swami Vivekanand Road,Oshiwara,Jogeshwari West,near HP Petrol Pump,Mumbai,Maharastra 400102</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Geo Location : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}></Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>GSTIN No : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>27AACCC2649A2Z2</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>PAN No : </Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>AACCC2649A</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>City :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>Mumbai</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>State :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>Maharashtra</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Pin Code :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>400102</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ margin: 3, width: '50%', fontSize: 15, top: 4 }}>Country :</Text>
                    <Text style={{ width: '50%', marginLeft: 5, top: 7 }}>India</Text>
                </View>

                <View style={styles.container1}>

                    <Icon
                        name='v-card'
                        size={35}
                        color='#00aced' />


                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginHorizontal: 50, top: -30 }}>Contact Person Details</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ margin: 3, width: '50%', fontSize: 15, top: -10 }}>Contact Person : </Text>
                        <Text style={{ width: '50%', marginLeft: 5, top: -5 }}>Aditya Nikhil</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ margin: 3, width: '50%', fontSize: 15, top: -10 }}>Email Address :</Text>
                        <Text style={{ width: '50%', marginLeft: 5, top: -5 }}>aditya.nikhil@capitalfoods.co.in</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ margin: 3, width: '50%', fontSize: 15, top: -10 }}>Role :</Text>
                        <Text style={{ width: '50%', marginLeft: 5, top: -5 }}>Admin</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ margin: 3, width: '50%', fontSize: 15, top: -10 }}>Mobile :</Text>
                        <Text style={{ width: '50%', marginLeft: 5, top: -5 }}>9990202144</Text>
                    </View>
                </View>

                <View style={styles.container2}>
                    <Icon
                        name='v-card'
                        size={35}
                        color='#00aced' />


                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginHorizontal: 50, top: -30 }}>Bank Account Details</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ margin: 3, width: '50%', fontSize: 15, top: -10 }}>Bank Name : </Text>
                        <Text style={{ width: '50%', marginLeft: 5, top: -5 }}></Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ margin: 3, width: '50%', fontSize: 15, top: -10 }}>Account No :</Text>
                        <Text style={{ width: '50%', marginLeft: 5, top: -5 }}></Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ margin: 3, width: '50%', fontSize: 15, top: -10 }}>Bank Id :</Text>
                        <Text style={{ width: '50%', marginLeft: 5, top: -5 }}></Text>
                    </View>
                </View>

            </View>


        </SafeAreaView>
    )
}

export default CompanyProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10,
        margin: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: height
    },
    container1: {
        backgroundColor: "#f5f5fd",
        padding: 10,
        top: 20,
        margin: 10,
        borderRadius: 15,

    },
    container2: {
        backgroundColor: "#f5f5fd",
        padding: 10,
        top: 20,
        margin: 10,
        borderRadius: 15,

    }
})