import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { DataTable, Searchbar, ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { getSOList } from '../../../redux/actions/salesAction';
import { inrFormat } from '../../../redux/constants';

const { height, width } = Dimensions.get('window')

const ClosedSO = ({ navigation }) => {
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(0)
    const [closedSoList, setClosedSoList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [onScrollBegin, setOnScrollBegin] = useState(false)

    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        setIsLoading(true)
        getSalesOrderList(pageNumber);
    }, [])

    async function getSalesOrderList(pageNum) {
        setIsLoading(true)
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
                {
                    key: "status",
                    operation: "ORDER_STATUS",
                    value: 'CLOSED',
                },
            ];
        } else if (user && user.subRole == "ASM") {
            searchCriteriaArr = [
                {
                    key: "buyerTerritory",
                    operation: "EQUAL",
                    value: user.assignedGeolocation[0],
                },
                {
                    key: "status",
                    operation: "ORDER_STATUS",
                    value: 'CLOSED',
                },
            ];
        } else if (user && user.role == "COMPANY" && user.subRole == "ADMIN") {
            searchCriteriaArr = [
                {
                    key: "status",
                    operation: "ORDER_STATUS",
                    value: 'CLOSED',
                },
            ];
        } else {
            searchCriteriaArr = [
                {
                    key: "sellerUserId",
                    value: user.employerUserId,
                    operation: "EQUAL",
                },
                {
                    key: "status",
                    operation: "ORDER_STATUS",
                    value: 'CLOSED',
                },
            ];
        }

        let bodyData = {
            "pageNumber": pageNum,
            "pageSize": 15,
            "sortArray": [],
            "searchCriteria": searchCriteriaArr
        }
        let temp = await dispatch(getSOList(bodyData))
        if (temp.status == 'success') {
            setClosedSoList(closedSoList.concat(temp.data.salesOrder))
        }
        setIsLoading(false)
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

    const renderFooter = () => {
        return isLoading ? <View style={styles.loader}>
            <Text>Hold on, Loading Products..</Text>
            <ActivityIndicator animating={true} size="large" />
        </View> : null
    }

    const handelLoadMore = () => {
        setPageNumber(pageNumber + 1)
        getSalesOrderList(pageNumber + 1)
    }

    return (
        <SafeAreaView style={{ height: height, flex: 1 }}>
            {closedSoList.length != 0 ? <FlatList
                showsVerticalScrollIndicator={false}
                data={closedSoList}
                renderItem={({ item }) => {
                    return <Card list={item} />;
                }}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => renderFooter()}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => { setOnScrollBegin(true) }}
                onEndReached={() => {
                    if (onScrollBegin) {
                        handelLoadMore()
                        setOnScrollBegin(false)
                    }

                }}
            /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: 'red' }}>No Products Found...</Text>
            </View>}
            <Toast />
        </SafeAreaView>
    )
}

export default ClosedSO

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