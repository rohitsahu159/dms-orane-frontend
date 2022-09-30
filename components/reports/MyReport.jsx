import { ScrollView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get('window');

const MyReport = () => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: 20, margin: 8, color: '#00A3E4' }}>My Reports</Text>
                <Text style={{ width: '30%', fontSize: 20, margin: 8, }}>Flexi Reports</Text>
                <View style={styles.contain}>
                    <Text style={{ fontSize: 20, textAlign: 'center', top: 1 }}>Analytics</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Customers Purchase Order</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 140, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 15 }}>Report </Text>
                                <Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', right: 0, marginLeft: 230 }} name="eye" size={20} />
                                <Text style={{ marginTop: 10, right: 60, top: 5, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20} />

                                </Text>

                            </View>

                            <SelectList />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Customers Clamis</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 140, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 15 }}>Report </Text>
                                <Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', right: 0, marginLeft: 230 }} name="eye" size={20} />
                                <Text style={{ marginTop: 10, right: 60, top: 5, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20} />
                                </Text>
                            </View>

                            <SelectList />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Inventory</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 140, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 15 }}>Report </Text>
                                <Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', right: 0, marginLeft: 230 }} name="eye" size={20} />
                                <Text style={{ marginTop: 10, right: 60, top: 5, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20} />
                                </Text>
                            </View>
                            <SelectList />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Customers Purchase Order</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 140, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 15 }}>Report </Text>
                                <Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', right: 0, marginLeft: 230 }} name="eye" size={20} />
                                <Text style={{ marginTop: 10, right: 60, top: 5, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20} />
                                </Text>

                            </View>
                            <SelectList />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Customers Claims</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 140, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 15 }}>Report </Text>
                                <Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', right: 0, marginLeft: 230 }} name="eye" size={20} />
                                <Text style={{ marginTop: 10, right: 60, top: 5, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20} />
                                </Text>
                            </View>
                            <SelectList />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Inventory</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 140, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 15 }}>Report </Text>
                                <Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', right: 0, marginLeft: 230 }} name="eye" size={20} />
                                <Text style={{ marginTop: 10, right: 60, top: 5, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20} />
                                </Text>
                            </View>
                            <SelectList />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Customers Purchase Order</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 140, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 15 }}>Report </Text>
                                <Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', right: 0, marginLeft: 230 }} name="eye" size={20} />
                                <Text style={{ marginTop: 10, right: 60, top: 5, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20} />
                                </Text>
                            </View>
                            <SelectList />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Customers Claims</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', height: 140, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 15 }}>Report </Text>
                                <Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', right: 0, marginLeft: 230 }} name="eye" size={20} />
                                <Text style={{ marginTop: 10, right: 60, top: 5, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20} />
                                </Text>
                            </View>
                            <SelectList />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default MyReport

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        borderTopRightRadius: 20,
        height: height - 40,
        paddingBottom: 20
    },
    icons: {
        flexDirection: 'row',
        padding: 5,
        marginLeft: 100,
        bottom: 40,
        marginright: 90


    },
    containerD: {
        padding: 10,
    },
    reportContainer: {
        backgroundColor: '#A5D5E8',
        width: '100%',
        // height: 90,
        top: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 20,
        marginVertical: 10
    },
    contain: {
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        width: '25%',
        height: 28,
        margin: 10,
        right: 50,
        left: 10,
        bottom: 2,

    },
})