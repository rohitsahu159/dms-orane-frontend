import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
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
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.chartView} >
                    <Text>KPI Analysis</Text>
                    <ProgressChart
                        data={progressData}
                        width={325}
                        height={200}
                        // strokeWidth={16}
                        // radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                </View>
                <View style={{flex: 1,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="dot-circle-o" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>All Sales Orders </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>100</Text>
                </View>
                <View style={{flex: 1,top:-10,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="file-o" size={18} color="#900" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>All Purchase Orders </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20000</Text>
                </View>
                <View style={{flex: 1, top:-20,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="copy" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }} >All Sales Invoices </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>76876</Text>
                </View>
                <View style={{flex: 1, top:-30,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="th-list" size={18} color="#900" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Pending Orders for Invoicing </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>1313</Text>
                </View>
                <View style={{flex: 1, top:-40,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="comments" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Collected Amount </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>12398</Text>
                </View>
                <View style={{flex: 1, top:-50,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="money" size={18} color="#900" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Outstanding Amount </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>2137</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const OverView = () => {
    return (
        <SafeAreaView>
            <ScrollView>

                <View style={styles.chartView}>
                    <Text>OverView</Text>
                    {/* Overview graph */}
                    <ContributionGraph
                        values={commitsData}
                        endDate={new Date("2017-04-01")}
                        numDays={105}
                        width={325}
                        height={220}
                        chartConfig={chartConfig}
                    />
                    {/* <LineChart
                data={data}
                width={screenWidth}
                height={256}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
                /> */}
                </View>
                <View style={{flex: 1,top:-10,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="dot-circle-o" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Total Customer </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>123</Text>
                </View>
                <View style={{flex: 1,top:-20,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="file-o" size={18} color="#900" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Total PO Value </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>239871</Text>
                </View>
                <View style={{flex: 1,top:-30,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="copy" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }} >Total SI Count </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>21312798</Text>
                </View>
                <View style={{flex: 1,top:-40,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="th-list" size={18} color="#900" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Total SI Value </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>29183</Text>
                </View>
                <View style={{flex: 1,top:-50,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="comments" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Total PO Counts </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>9823</Text>
                </View>
                <View style={{flex: 1,top:-60,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="money" size={18} color="#900" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Total SKUs </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>298137</Text>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const Inventory = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.chartView}>
                    <Text>HI, This is Kpi Analysis Page</Text>
                    <LineChart
                        data={data}
                        width={323}
                        height={235}
                        verticalLabelRotation={30}
                        chartConfig={chartConfig}
                        bezier
                    />
                </View>
                <View style={{flex: 1,top:-10,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="dot-circle-o" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Current Stock </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>10%</Text>
                </View>
                <View style={{flex: 1,top:-20,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="file-o" size={18} color="#900" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Delivery Pending </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>12%</Text>
                </View>
                <View style={{flex: 1,top:-30,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="copy" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }} >Damage Stock </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>29%</Text>
                </View>
                <View style={{flex: 1,top:-40,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="th-list" size={18} color="#900" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 25 }}>Expired stock </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>45%</Text>
                </View>



            </ScrollView>
        </SafeAreaView>
    )
}

const FillRate = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.chartView}>
                    <Text>HI, This is KPI Analysis</Text>
                    <LineChart
                        data={data}
                        width={325}
                        height={220}
                        chartConfig={chartConfig}
                    />

                </View>
                <View style={{flex: 1,top:-10,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> January </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-20,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> February  </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-30,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> March </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-40,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> April </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-50,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}>May </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-60,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> June </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-70,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> July </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-80,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> August </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-90,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> September </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-100,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> October </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-110,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> November </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>
                <View style={{flex: 1,top:-120,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}> December </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20%</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const PurchaseValue = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.chartView}>
                    <Text>HI, This is KPI Analysis</Text>
                    <LineChart
                        data={data}
                        width={325}
                        height={220}
                        chartConfig={chartConfig}
                    />

                </View>
                <View style={{flex: 1,top:-10,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text style={{ top: -19, marginLeft: 22 }}>2011 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>3500000</Text>
                </View>
                <View style={{flex: 1,top:-20,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}>2012 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>20000</Text>
                </View>
                <View style={{flex: 1,top:-30,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}>2013 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>4500</Text>
                </View>
                <View style={{flex: 1,top:-40,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}>2014 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>212123</Text>
                </View>
                <View style={{flex: 1,top:-50,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}>2015 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>21312</Text>
                </View>
                <View style={{flex: 1,top:-60,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}>2016 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>21213</Text>
                </View>
                <View style={{flex: 1,top:-70,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}> 2017 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>21</Text>
                </View>
                <View style={{flex: 1,top:-80,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}> 2018 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>2323234</Text>
                </View>
                <View style={{flex: 1,top:-90,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}> 2019 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>21434324</Text>
                </View>
                <View style={{flex: 1,top:-100,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}> 2020 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>243324</Text>
                </View>
                <View style={{flex: 1,top:-110,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}> 2021 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>2421</Text>
                </View>
                <View style={{flex: 1,top:-120,elevation: 8,backgroundColor: 'white',padding: 10,borderRadius: 10,margin: 10,width: '96%',height: 40,}}>
                    <View>
                        <Icon name="calendar" size={18} color="#090fd6" />
                    </View>
                    <Text  style={{ top: -19, marginLeft: 22 }}> 2022 </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>213</Text>
                </View>

            </ScrollView>
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
        padding: 10,
        borderRadius: 10,
        width: '96%'

    },
  
    // flexDirection: 'row',
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 6,
    // shadowOpacity: 0.26,
    // chartView1: {
    //     flex: 1,
    //     elevation: 8,
    //     backgroundColor: 'white',
    //     padding: 10,
    //     borderRadius: 10,
    //     margin: 10,
    //     width: '96%',
    //     height: 40,
        


    // },
});

export default Dashboard