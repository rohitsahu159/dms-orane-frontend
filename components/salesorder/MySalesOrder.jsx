import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { DataTable, Searchbar, ActivityIndicator } from 'react-native-paper';
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
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(0)
    const [searchCriteriaArray, setSearchCriteriaArray] = useState([])
    const [pendingSoList, setPendingSoList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        setIsLoading(true)
        async function getSalesOrderList() {
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
            setSearchCriteriaArray(searchCriteriaArr)

            let bodyData = {
                "pageNumber": pageNumber,
                "pageSize": 15,
                "sortArray": [],
                "searchCriteria": searchCriteriaArr
            }
            let temp = await dispatch(getSOList(bodyData))
            setPendingSoList(pendingSoList.concat(temp.data.salesOrder))
            setIsLoading(false)
        }

        getSalesOrderList();
    }, [pageNumber])

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

    const renderFooter = () => {
        return isLoading ? <View style={styles.loader}>
            <ActivityIndicator animating={true} size="large" />
        </View> : null
    }

    const handelLoadMore = () => {
        setPageNumber(pageNumber + 1)
        setIsLoading(true)
    }

    return (
        <SafeAreaView style={{ height: height, flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={pendingSoList}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={renderFooter}
                onEndReached={handelLoadMore}
            />
        </SafeAreaView>
    )
}

const DeliveredSO = ({ navigation }) => {
    let deliveredSOList = []

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
        <SafeAreaView>
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
    let partialSOList = []

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
        <SafeAreaView>
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
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <Button title="Create SO" color='#00a7e5' onPress={() => navigation.navigate("createSO")} />
                </View>
            ),
        });
    }, [navigation]);

    return (
        <Tab.Navigator
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
        backgroundColor: "#fff",
        padding: 10,
        margin: 1,
        elevation: 8,
        borderRadius: 10,
        flexDirection: 'row'
    },
    item: {
        width: '80%' // is 50% of container width
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    }
});

export default MySalesOrder