import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, RefreshControl, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { DataTable, Searchbar, ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { inrFormat } from '../../../redux/constants';
import { getPOList } from '../../../redux/actions/purchaseAction';

const { height, width } = Dimensions.get('window')
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const RejectedPO = ({ navigation }) => {
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(0)
    const [rejectedPoList, setRejectedPoList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [onScrollBegin, setOnScrollBegin] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        setIsLoading(true)
        getPurchaseOrderList(pageNumber);
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        getPurchaseOrderList(0)
        setPageNumber(0)
    }, []);

    async function getPurchaseOrderList(pageNum) {
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
                    key: "status",
                    operation: "ORDER_STATUS",
                    value: 'REJECTED',
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
                    value: 'REJECTED',
                },
            ];
        } else {
            searchCriteriaArr = [
                {
                    key: "buyerUserId",
                    value: user.employerUserId,
                    operation: "EQUAL",
                },
                {
                    key: "status",
                    operation: "ORDER_STATUS",
                    value: 'REJECTED',
                },
            ];
        }

        let bodyData = {
            "pageNumber": pageNum,
            "pageSize": 15,
            "sortArray": [],
            "searchCriteria": searchCriteriaArr
        }
        let temp = await dispatch(getPOList(bodyData))
        if (temp.status == 'success') {
            setRejectedPoList(rejectedPoList.concat(temp.data.purchaseOrder))
        }
        setIsLoading(false)
    }

    const inrDateFormatNoTime = (date) =>
        new Date(date).toLocaleString("en-IN");

    const Card = ({ list }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("purchaseDetail", { itemId: list.id })}
            >
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Text style={{ fontWeight: '500' }}>Purchase Order No:<Text style={{ color: '#00a7e5' }}>{list.purchaseOrderId}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>Supplier Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>PO Date:</Text><Text>{inrDateFormatNoTime(list.orderDateTime)}</Text></Text>
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
        getPurchaseOrderList(pageNumber + 1)
    }

    return (
        <SafeAreaView style={{ height: height, flex: 1 }}>
            {rejectedPoList.length != 0 ? <FlatList
                showsVerticalScrollIndicator={false}
                data={rejectedPoList}
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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: 'red' }}>No Products Found...</Text>
            </View>}
            <Toast />
        </SafeAreaView>
    )
}

export default RejectedPO

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