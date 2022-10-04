import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
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
    data: [0.91, 2.02, 0.53, 1.00, 2.00, 0.79]
};

const KpiAnalysis = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            let kpiBodyData = {
                "role": userRole,
                "subRole": userSubRole,
                "userId": employerUserId,
                "assignedHierarchyType": assignedHierarchyType,
                "assignedGeoLocation": str,
              };
            dispatch(getDashboardList(kpiBodyData))
        }

    }, [dispatch])

    const { user } = useSelector(state => state.auth)
    console.log(user)

    return (
        <SafeAreaView>
            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
                <ProgressChart
                    data={progressData}
                    width={screenWidth}
                    height={250}
                    chartConfig={chartConfig}
                    hideLegend={false}
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

const OverView = () => {
    return (
        <SafeAreaView>
            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
                <ContributionGraph
                    values={commitsData}
                    endDate={new Date("2017-04-01")}
                    numDays={105}
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

const Inventory = () => {
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

const FillRate = () => {
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