import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, StyleSheet, RefreshControl, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Swipeable } from 'react-native-gesture-handler';
import { inrDateFormatNoTime, inrFormat } from '../../redux/constants';
import { getSIList } from '../../redux/actions/salesAction';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable, Searchbar, ActivityIndicator } from 'react-native-paper';

const { height, width } = Dimensions.get('window')
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const MySalesInvoice = ({ navigation }) => {
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(0)
    const [salesInvoiceList, setSalesInvoiceList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [onScrollBegin, setOnScrollBegin] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        setIsLoading(true)
        getSalesInvoiceList(pageNumber);
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        getSalesInvoiceList(0)
        setPageNumber(0)
    }, []);

    async function getSalesInvoiceList(pageNum) {
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
                }
            ];
        } else if (user && user.subRole == "ASM") {
            searchCriteriaArr = [
                {
                    key: "buyerTerritory",
                    operation: "EQUAL",
                    value: user.assignedGeolocation[0],
                }
            ];
        } else if (user && user.role == "COMPANY" && user.subRole == "ADMIN") {
            searchCriteriaArr = [];
        } else {
            searchCriteriaArr = [
                {
                    key: "sellerUserId",
                    value: user.employerUserId,
                    operation: "EQUAL",
                }
            ];
        }

        let bodyData = {
            "pageNumber": pageNum,
            "pageSize": 15,
            "sortArray": [],
            "searchCriteria": searchCriteriaArr
        }
        let temp = await dispatch(getSIList(bodyData))
        if (temp.status == 'success') {
            setSalesInvoiceList(salesInvoiceList.concat(temp.data.SalesInvoice))
        }

        setIsLoading(false)
    }

    const Card = ({ list }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("salesInvoiceDetail", { itemId: list.id })}
            >
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Text style={{ fontWeight: '500' }}>Invoice No:<Text style={{ color: '#00a7e5' }}>{list.invoiceId}</Text></Text>
                        <Text style={{ fontWeight: '500' }}>Sales Order Number:<Text style={{ color: '#00a7e5' }}>{list.soId}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>Customers Name:</Text><Text>{list.buyerFirmName}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>Sales Order Date:</Text><Text>{inrDateFormatNoTime(list.soDate)}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>Invoice Date:</Text><Text>{inrDateFormatNoTime(list.invoiceDate)}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>Sales Order Amount:</Text><Text>{inrFormat(list.salesOrderTotalValue)}</Text></Text>
                        <Text><Text style={{ fontWeight: '500' }}>Invoice Amount:</Text><Text>{inrFormat(list.totalValue)}</Text></Text>
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
        getSalesInvoiceList(pageNumber + 1)
    }

    return (
        <SafeAreaView style={{ height: height, flex: 1 }}>
            {salesInvoiceList.length != 0 ? <FlatList
                data={salesInvoiceList}
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
    },

    deleteBox: {
        justifyContent: 'center',
        margin: 20
    }
});

export default MySalesInvoice