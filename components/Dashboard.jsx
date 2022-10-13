import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { getDashboardList, getdashboardDetail, getdashboardInventoryData, getdashboardFillRateData } from '../redux/actions/dashboardAction'
import { } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(224, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days"] // optional
};

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 3,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(223, 200, 90, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

// OverView graph 
const commitsData = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 }
];

const pieChartData = [
    {
        name: "Seoul",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "New York",
        population: 8538000,
        color: "#228B22",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

const progressData = {
    // labels: ["Sales Order", "Purchase Orders", "Sales Invoices", "Collected Amount"], // optional
    data: [0.42, -0.98, -1.00, 1.44, 0.00, 1.00]
};

const KpiAnalysis = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            let str = user?.assignedGeolocation.toString();
            let kpiBodyData = {
                "role": user?.role,
                "subRole": user?.subRole,
                "userId": user?.employerUserId,
                "assignedHierarchyType": user?.assignedHierarchyType,
                "assignedGeoLocation": str,
            };
            dispatch(getDashboardList(kpiBodyData))
        }

    }, [dispatch])

    const { user } = useSelector(state => state.auth)
    const { dashboardList } = useSelector(state => state.dashboardList)

    console.log(user)

    return (
        <SafeAreaView>
            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
                <Image source={require("../assets/img/chart1.jpg")} />
                <View >
                    <Text style={{ width: '90%', top: "-800%", left: "63%" }}>All Sales Orders </Text><Text style={{ width: '90%', top: "-800%", left: "65%" }}>{dashboardList?.soCurrentMonthPerc}%</Text>
                </View>
                <View >
                    <Text style={{ width: '90%', top: "-780%", left: "65%" }}>All Purchase Orders </Text><Text style={{ width: '90%', top: "-770%", left: "75%" }}>{dashboardList?.poCurrentMonthPerc}%</Text>
                </View>
                <View >
                    <Text style={{ width: '90%', top: "-740%", left: "70%" }}>All Sales Invoices </Text><Text style={{ width: '90%', top: "-750%", left: "77%" }}>{dashboardList?.siCurrentMonthPerc}%</Text>
                </View>
                <View >
                    <Text style={{ width: '90%', top: "-670%", left: "50%" }}>Pending Orders for Invoicing </Text><Text style={{ width: '90%', top: "-670%", left: "77%" }}>{dashboardList?.pendingOrdersPercDiff}%</Text>
                </View>
                <View >
                    <Text style={{ width: '90%', top: "-630%", left: "70%" }}>Collected Amount </Text><Text style={{ width: '90%', top: "-640%", left: "77%" }}>{dashboardList?.collectionCurrentMonthPerc}%</Text>
                </View>
                <View >
                    <Text style={{ width: '90%', top: "-610%", left: "61%" }}>Outstanding Amount </Text><Text style={{ width: '90%', top: "-600%", left: "77%" }}>{dashboardList?.outstandingPercDiff}%</Text>
                </View>

            </View>
            <View style={{ maxHeight: screenHeight - 250, paddingBottom: 30, }}>
                <ScrollView>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>All Sales Orders </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardList?.soTotalValueCurrentMonth}</Text>
                        </View>

                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>All Purchase Orders </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardList?.poTotalValueCurrentMonth}</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>All Sales Invoices </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardList?.siTotalValueCurrentMonth}</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Pending Orders for Invoicing  </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardList?.pendingOrdersCurrentMonth}</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Collected Amount </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardList?.collectionTotalValueCurrentMonth}</Text>
                        </View>

                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Outstanding Amount </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>{dashboardList?.outStandingTotalValueCurrentMonth}</Text>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const OverView = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            const URL = user.role == "COMPANY" ? 'company' : 'partner?userId=' + user.employerUserId;

            dispatch(getdashboardDetail(URL))
        }

    }, [dispatch])

    const { user } = useSelector(state => state.auth)
    const { dashboardDetails } = useSelector(state => state.dashboardDetails)
    return (
        <SafeAreaView>
            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
                <Image
                    style={{ marginLeft: 70 }}
                    source={require("../assets/img/chart2.png")}
                />
                {(user.role == "COMPANY") &&
                    <View>
                        <Text style={{ width: '90%', top: "-650%" }}>TOTAL SUPER STOCKISTS </Text><Text style={{ top: "-650%",left:"10%" }}>{dashboardDetails?.totalSuperDistributorGT}</Text>
                    </View>}
                {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") &&
                    <View>
                        <Text style={{ width: '90%', top: "-650%" }}>TOTAL CUSTOMER </Text><Text style={{ top: "-650%", left: "20%" }}>{dashboardDetails?.numberOfBuyers}</Text>
                    </View>}
                {(user.role == "COMPANY") &&
                    <View>
                        <Text style={{ width: '90%', top: "-450%" }}>TOTAL DISTRIBUTOR </Text><Text style={{ top: "-450%", left: "10%" }}>{dashboardDetails?.totalDistributorGT}</Text>
                    </View>}
                {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") &&
                    <View>
                        <Text style={{ width: '90%', top: "-460%" }}>TOTAL SKUs </Text><Text style={{ top: "-450%", left: "10%" }}>{dashboardDetails?.numberOfProducts}</Text>
                    </View>}
                    {(user.role == "COMPANY") &&
                    <View>
                    <Text style={{ width: '90%', top: "-250%",left:"10%" }}>TOTAL RETAILERS </Text><Text style={{ top: "-250%", left: "20%" }}>{dashboardDetails?.totalRetailerGT}</Text>
                </View>}
                {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") &&
                 <View>
                 <Text style={{ width: '90%', top: "-250%",left:"10%" }}>TOTAL PO COUNT </Text><Text style={{ top: "-240%", left: "20%" }}>{dashboardDetails?.nubmerOfPurchaseOrders}</Text>
             </View>}
             {(user.role == "COMPANY") &&
             <View>
             <Text style={{ width: '90%', top: "-350%",left:"50%" }}>TOTAL SUPPLY POINTS (DC) </Text><Text style={{ top: "-340%", left: "70%" }}>{dashboardDetails?.toatalSupplyPoints}</Text>
         </View>}
         {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") &&
             <View>
             <Text style={{ width: '90%', top: "-960%",left:"70%" }}>TOTAL PO VALUE </Text><Text style={{ top: "-950%", left: "75%" }}>{dashboardDetails?.poTotalValue}</Text>
         </View>}
         {(user.role == "COMPANY") && 
         <View>
             <Text style={{ width: '90%', top: "-1050%",left:"60%" }}>TOTAL DSDS </Text><Text style={{ top: "-1040%", left: "75%" }}>{dashboardDetails?.numberOfOutletMt}</Text>
         </View>}
         {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") && 
         <View>
         <Text style={{ width: '90%', top: "-800%",left:"75%" }}>TOTAL SI COUNT</Text><Text style={{ top: "-800%", left: "85%" }}>{dashboardDetails?.numberOfSalesInvoice}</Text>
     </View>}
     {(user.role == "COMPANY") &&
     <View>
     <Text style={{ width: '90%', top: "-850%",left:"75%" }}>TOTAL SKUs</Text><Text style={{ top: "-850%", left: "85%" }}>{dashboardDetails?.totalProducts}</Text>
 </View>}
 {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") &&
 <View>
 <Text style={{ width: '90%', top: "-550%",left:"70%" }}>TOTAL SI VALUE</Text><Text style={{ top: "-550%", left: "75%" }}>{dashboardDetails?.salesInvoiceTotalValue}</Text>
</View>}
            </View>
            <View style={{ maxHeight: screenHeight - 250, paddingBottom: 30, }}>
                <ScrollView>
                    {(user.role == "COMPANY") && <>
                        <View style={styles.chartView1}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '10%' }}>
                                    <Icon name="th-list" size={18} color="#900" />
                                </Text>
                                <Text style={{ width: '90%' }}>TOTAL SUPER STOCKISTS </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardDetails?.totalSuperDistributorGT}</Text>

                            </View>
                        </View>
                    </>}
                    {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") && <>
                        <View style={styles.chartView1}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '10%' }}>
                                    <Icon name="th-list" size={18} color="#900" />
                                </Text>
                                <Text style={{ width: '90%' }}>TOTAL CUSTOMER </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardDetails?.numberOfBuyers}</Text>

                            </View>
                        </View>
                    </>}
                    {(user.role == "COMPANY") && <>

                        <View style={styles.chartView1}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '10%' }}>
                                    <Icon name="th-list" size={18} color="#900" />
                                </Text>
                                <Text style={{ width: '90%' }}>TOTAL DISTRIBUTOR </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardDetails?.totalDistributorGT}</Text>
                            </View>

                        </View>
                    </>}
                    {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") && <>
                        <View style={styles.chartView1}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '10%' }}>
                                    <Icon name="th-list" size={18} color="#900" />
                                </Text>
                                <Text style={{ width: '90%' }}>TOTAL SKUs  </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardDetails?.totalProducts}</Text>
                            </View>

                        </View>
                    </>}
                    {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") && <>
                        <View style={styles.chartView1}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '10%' }}>
                                    <Icon name="th-list" size={18} color="#900" />
                                </Text>
                                <Text style={{ width: '90%' }}>TOTAL PO COUNT </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardDetails?.nubmerOfPurchaseOrders}</Text>
                            </View>
                        </View>
                    </>}
                    {(user.role == "COMPANY") && <>
                        <View style={styles.chartView1}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: '10%' }}>
                                    <Icon name="th-list" size={18} color="#900" />
                                </Text>
                                <Text style={{ width: '90%' }}>TOTAL RETAILERS</Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardDetails?.totalRetailerGT}</Text>
                            </View>
                        </View>
                    </>}

                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

const Inventory = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            let bodyData = {
                "role": user?.role || "",
                "subRole": user?.subRole,
                "assignedHierarchyType": user?.assignedHierarchyType || "",
                "userId": user?.employerUserId || ""
            }
            dispatch(getdashboardInventoryData(bodyData))
        }
    }, [dispatch])
    const { user } = useSelector(state => state.auth)
    const { dashboardInventoryData } = useSelector(state => state?.dashboardInventoryData)
    return (
        <SafeAreaView>

            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    bezier
                />
            </View>
            <View style={{ maxHeight: screenHeight - 250, paddingBottom: 30, }}>
                <ScrollView>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Current Stock </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardInventoryData?.currentStock}</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Delivery Pending </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardInventoryData?.inTransit}</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Damage Stock </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardInventoryData?.damagedStock}</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Expired Stock  </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardInventoryData?.expiredStock}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const FillRate = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            let param = "";

            if (user.role === "COMPANY" && user.subRole === "ADMIN") {
                param = `buyerHierarchyType=GT`;
            } else if (user.role === "COMPANY" && (user.subRole === "RH" || user.subRole === "KAM")) {
                param = `buyerHierarchyType=${user?.assignedHierarchyType}&buyerSubRegion=${user?.assignedGeolocation.toString()}`;
            } else {
                param = `buyerHierarchyType=${user?.assignedHierarchyType}&sellerId=${user?.employerUserId}`;
            }
            dispatch(getdashboardFillRateData(param))
        }
    }, [dispatch])
    const { user } = useSelector(state => state.auth)
    const { dashboardFillRate } = useSelector(state => state?.dashboardFillRate)

    return (
        <SafeAreaView>
            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    chartConfig={chartConfig}
                />
            </View>
            <View style={{ maxHeight: screenHeight - 250, paddingBottom: 30, }}>
                <ScrollView>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>{dashboardFillRate?.month} </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{dashboardFillRate?.orderPerMonth}</Text>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const PurchaseValue = () => {

    return (
        <SafeAreaView>
            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    chartConfig={chartConfig}
                />

            </View>
            <View style={{ maxHeight: screenHeight - 250, paddingBottom: 30, }}>
                <ScrollView>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>All Sales Orders </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>100</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}> 19 %</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>All Purchase Orders </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>100</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}> 19 %</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>All Sales Invoices </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>100</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}> 19 %</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Pending Orders for Invoicing  </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>100</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}> 19 %</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Collected Amount </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>100</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}> 19 %</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Outstanding Amount </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>100</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}> 19 %</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const Dashboard = () => {

    useEffect(() => {
        const storage = async () => {
            let items = await AsyncStorage.getItem('user');
        }
        storage()
    }, []);

    return (
        <Tab.Navigator
            initialRouteName='kpiAnalysis'
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "#555",
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarItemStyle: {
                    width: 'auto',
                    alignItems: 'flex-start',
                },
                tabBarScrollEnabled: true
            })}
        >
            <Tab.Screen
                name='kpiAnalysis'
                component={KpiAnalysis}
                options={{
                    title: "Kpi Analysis"
                }}
            />
            <Tab.Screen
                name='overView'
                component={OverView}
                options={{
                    title: "Over View"
                }}
            />
            <Tab.Screen
                name='inventory'
                component={Inventory}
                options={{
                    title: "Inventory"
                }}
            />
            <Tab.Screen
                name='fillRate'
                component={FillRate}
                options={{
                    title: "Fill Rate Report"
                }}
            />
            <Tab.Screen
                name='purchaseValue'
                component={PurchaseValue}
                options={{
                    title: "Purchase Value"
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    chartView: {
        elevation: 8,
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        width: '96%'

    },

    chartView1: {
        flex: 1,
        elevation: 8,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        width: '96%'
    },

});

export default Dashboard