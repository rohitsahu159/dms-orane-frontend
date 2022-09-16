import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
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
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.chartView} >
                    <Text>KPI Analysis</Text>
                    <ProgressChart
                        data={progressData}
                        width={390}
                        height={200}
                        // strokeWidth={16}
                        // radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                </View>
                <View style={styles.chartView}>
                    <Text>All Sales Orders </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>32278.27</Text>
                </View>
                <View style={styles.chartView}>
                    <Text>All Purchase Orders </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>28306.35</Text>
                </View>
                <View style={styles.chartView}>
                    <Text>All Sales Invoices </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>3682.22</Text>
                </View>
                <View style={styles.chartView}>
                    <Text>Pending Orders for Invoicing </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>28596.05</Text>
                </View>
                <View style={styles.chartView}>
                    <Text>Collected Amount </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>169.93</Text>
                </View>
                <View style={styles.chartView}>
                    <Text>Outstanding Amount </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>3512.29</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const OverView = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HI, This is Over View</Text>
        </View>
    )
}

const Inventory = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HI, This is Kpi Analysis Page</Text>
        </View>
    )
}

const FillRate = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HI, This is Over View</Text>
        </View>
    )
}

const PurchaseValue = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HI, This is Kpi Analysis Page</Text>
        </View>
    )
}

const Dashboard = () => {

    useEffect(() => {
        const storage = async()=>{
          let items = await AsyncStorage.getItem('user');
        }
        storage()
      }, []);

    return (
        <Tab.Navigator
            initialRouteName='kpiAnalysis'
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
    container: {
        // flex: 0,
        justifyContent: 'center',
        backgroundColor: "#fff",
        padding: 10,
    },
    chartView: {
        flex: 1,
        // shadowColor: 'black',
        // shadowOffset: { width: 2, height: 4 },
        // shadowRadius: 6,
        // shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        margin: 10,
        padding: 8,
        borderRadius: 10,
    },
    chartView1: {
        flex: 0.3,
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
});

export default Dashboard