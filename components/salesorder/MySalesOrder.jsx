import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, FlatList, } from 'react-native';
import { DataTable, Searchbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button, IconButton, Stack } from '@react-native-material/core';
import { round, inr } from 'lodash';
import { getSOList } from '../../redux/actions/salesAction'
import Loader from '../Loader';
import { inrFormat } from '../../redux/constants';
const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get('window')

const PendingSO = ({ navigation }) => {
    const { soList, loading } = useSelector(state => state.soList)
    let pendingSOList = []

    if (soList) {
        pendingSOList = soList.filter(function (li) {
            return li.invoiceStatus == "PENDING"
        })
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    const Card = ({ list }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("salesOrderDetail", { itemId: list.id })}
            >
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Text style={{ fontWeight: '500' }}>Sales Order No:<Text style={{ color: '#00a7e5' }}>{list.salesOrderId}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>Customer Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>SO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                        <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        loading ? <Loader /> : <SafeAreaView style={{ height: height, paddingBottom: 20, flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={pendingSOList}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}
            />
        </SafeAreaView>
    )
}

const DeliveredSO = ({ navigation }) => {
    const { soList, loading } = useSelector(state => state.soList)
    let deliveredSOList = []

    if (soList) {
        deliveredSOList = soList.filter(function (li) {
            return li.invoiceStatus == "COMPLETED"
        })
    }
    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    const DeliveredCard = ({ list }) => {

        return (

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("salesOrderDetail", { itemId: list.id })}
            >
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Text style={{ fontWeight: '500' }}>Sales Order No:<Text style={{ color: '#00a7e5' }}>{list.salesOrderId}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>Customer Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>SO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                        <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
    return (
        loading ? <Loader /> : <SafeAreaView>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={deliveredSOList}
                renderItem={({ item }) => {
                    return <DeliveredCard list={item} />;
                }}
            />
        </SafeAreaView>
    )

}


const PartialSO = ({ navigation }) => {
    const { soList, loading } = useSelector(state => state.soList)
    let partialSOList = []

    if (soList) {
        partialSOList = soList.filter(function (li) {
            return li.deliveryStatus == "NOT_DELIVERED"
        })
    }
    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    const PartialCard = ({ list }) => {

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("salesOrderDetail", { itemId: list.id })}
            >
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Text style={{ fontWeight: '500' }}>Sales Order No:<Text style={{ color: '#00a7e5' }}>{list.salesOrderId}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>Customer Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>SO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: '500', color: 'green' }}>Total Value</Text>
                        <Text style={{ textAlign: 'center', color: 'green' }}>{inrFormat(list.totalValue)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        loading ? <Loader /> : <SafeAreaView>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={partialSOList}
                renderItem={({ item }) => {
                    return <PartialCard list={item} />;
                }}
            />
        </SafeAreaView>
    )
}


const MySalesOrder = ({ navigation }) => {
    const dispatch = useDispatch()
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <Button title="Create SO" color='#00a7e5' onPress={() => navigation.navigate("createSO")} />
                </View>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (user) {
            let searchCriteriaArr = [];
            if (user.subRole == "RH" || user.subRole == "KAM" || user.subRole == "KAE") {
                searchCriteriaArr = [
                    {
                        key: "buyerSubRegion",
                        operation: "EQUAL",
                        value: user.assignedGeolocation[0],
                    },
                    {
                        key: "buyerHierarchyType",
                        operation: "EQUAL",
                        value: user.assignedHierarchyType,
                    },
                ];
            } else if (user && user.subRole == "ASM") {
                searchCriteriaArr = [
                    {
                        key: "buyerTerritory",
                        operation: "EQUAL",
                        value: user.assignedGeolocation[0],
                    },
                ];
            } else if (user && user.role == "COMPANY" && user.subRole == "ADMIN") {
                searchCriteriaArr = [];
            } else {
                searchCriteriaArr = [
                    {
                        key: "sellerUserId",
                        value: user.employerUserId,
                        operation: "EQUAL",
                    },
                ];
            }

            let bodyData = {
                "pageNumber": 0,
                "pageSize": 9999,
                "sortArray": [],
                "searchCriteria": searchCriteriaArr
            }
            dispatch(getSOList(bodyData))
        }

    }, [dispatch, loading])
    const { user } = useSelector(state => state.auth)
    const { loading, soList } = useSelector(state => state.soList)

    return (
        loading ? <Loader /> : <Tab.Navigator
            initialRouteName='pendingSO'
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "#555",
                // tabBarLabelStyle: {
                //     fontSize: 12,
                // },
                // tabBarItemStyle: {
                //     width: 'auto',
                //     alignItems: 'flex-start',
                // },
                // tabBarScrollEnabled: true
            })}
        >
            <Tab.Screen
                name='pendingSO'
                component={PendingSO}
                options={{
                    title: "Pending"
                }}
            />
            <Tab.Screen
                name='deliveredSO'
                component={DeliveredSO}
                options={{
                    title: "Delivered"
                }}
            />
            <Tab.Screen
                name='partialSO'
                component={PartialSO}
                options={{
                    title: "Partial"
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: "#fff",
        padding: 10,
        margin: 1,
        elevation: 8,
        borderRadius: 10,
        flexDirection: 'row'
    },
    item: {
        width: '80%' // is 50% of container width
    }
});

export default MySalesOrder