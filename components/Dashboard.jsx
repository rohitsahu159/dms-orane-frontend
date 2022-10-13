import { View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView , Pressable} from 'react-native';
import React, { useEffect,useState } from 'react';
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
import { Card, Button, Title, Paragraph,Checkbox } from 'react-native-paper';
import { getDashboardList,getdashboardDetail,getdashboardInventoryData,getSSList,getdashboardFillRateData } from '../redux/actions/dashboardAction'
import { } from '@react-navigation/native';
import SelectList from 'react-native-dropdown-select-list';
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
            let str = user.assignedGeolocation.toString();
            let kpiBodyData = {
                "role": user.role,
                "subRole": user.subRole,
                "userId": user.employerUserId,
                "assignedHierarchyType": user.assignedHierarchyType,
                "assignedGeoLocation": str,
              };
            dispatch(getDashboardList(kpiBodyData))
        }

    }, [dispatch])

    const { user } = useSelector(state => state.auth)
    const { dashboardList } = useSelector(state => state.dashboardList)

    
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
                            <Text style={{ width: '90%' }}>All Sales Orders </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>{dashboardList?.soTotalValueCurrentMonth}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}>{dashboardList?.soCurrentMonthPerc}%</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>All Purchase Orders </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>{dashboardList?.poTotalValueCurrentMonth}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}>{dashboardList?.poCurrentMonthPerc}%</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>All Sales Invoices </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>{dashboardList?.siTotalValueCurrentMonth}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}>{dashboardList?.siCurrentMonthPerc} %</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Pending Orders for Invoicing  </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>{dashboardList?.pendingOrdersCurrentMonth}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}>{dashboardList?.pendingOrdersPercDiff} %</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Collected Amount </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>{dashboardList?.collectionTotalValueCurrentMonth}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}>{dashboardList?.collectionCurrentMonthPerc}%</Text>
                        </View>
                    </View>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>Outstanding Amount </Text><Text style={{ position: 'absolute', right: 0, margin: 10, fontWeight: 'bold' }}>{dashboardList?.outStandingTotalValueCurrentMonth}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}></Text>
                            <Text style={{ width: '90%' }}> {dashboardList?.outstandingPercDiff}%</Text>
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
            const URL = user.role == "COMPANY" ? 'company' : 'partner?userId='+ user.employerUserId;
          
            dispatch(getdashboardDetail(URL))
        }

    }, [dispatch])

    const { user } = useSelector(state => state.auth)
    const { dashboardDetails } = useSelector(state => state.dashboardDetails)
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
                            <Text style={{ width: '90%' }}>TOTAL CUSTOMER </Text><Text style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>100</Text>
                          
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
                            <Text style={{ width: '90%' }}>TOTAL SKUs  </Text><Text style={{ position: 'absolute', right: 0,  fontWeight: 'bold' }}>{dashboardDetails?.numberOfProducts}</Text>
                        </View>
                        
                    </View>
                    </>}
                    {(user.role == "DISTRIBUTOR" || user.role == "SUPER_DISTRIBUTOR") && <>
                    <View style={styles.chartView1}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '10%' }}>
                                <Icon name="th-list" size={18} color="#900" />
                            </Text>
                            <Text style={{ width: '90%' }}>TOTAL PO COUNT </Text><Text style={{ position: 'absolute', right: 0,  fontWeight: 'bold' }}>{dashboardDetails?.nubmerOfPurchaseOrders}</Text>
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
            const param = {
                "role": user?.role ,
                "subRole": user?.subRole,
                "assignedHierarchyType": user?.assignedHierarchyType ,
                "userId": user?.employerUserId 
              };
              const requestPayload={
                pageNumber: 0,
                pageSize: 1000,
                sortArray: [],
                searchCriteria: [],
              };

            dispatch(getdashboardInventoryData(param))
            dispatch(getSSList(requestPayload))
 
        }

    }, [dispatch])

    const { user } = useSelector(state => state?.auth)
    const { ssData } = useSelector(state => state?.ssData)
    const { dashboardInventoryData } = useSelector(state => state?.dashboardInventoryData)

    const [sellerFirmName, setSellerData] = useState(null);
const [selectedSellerData, setSelectedSellerData] = useState({});
let billingAddressList = []
if (ssData?.sellerFirmName != undefined) {
    let tempAddr = ssData.businessPartners.rhInfo.sellerFirmName.map(e => {
        return {
            ...e,
            key: e.sellerFirmName,
            value: e.sellerFirmName,
        }
    });

    billingAddressList = tempAddr
}
const onSelectSS = (sellerFirmName) => {
    let obj = ssData.find(o => o.id === sellerFirmName);
    setSelectedSellerData(obj)
    setSellerData(sellerFirmName)
}



    return (
        <SafeAreaView>

            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
            <View>
                    <Text style={{ paddingLeft: 5, color: 'black' }}>Select</Text>
                    <SelectList  data={billingAddressList || []} setSelected={setSellerData} onSelect={() => onSelectSS(sellerFirmName)} />
                </View>
                <View>
                <LineChart
    data={{
      labels: ["Current Stock", "Delivery Pending", "Damaged Stock", "Expired Stock"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
          </View>
                
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
            } else if (
              user.role === "COMPANY" &&
              (user.subRole === "RH" || user.subRole === "KAM")
            ) {
              param = `buyerHierarchyType=${user.assignedHierarchyType}&buyerSubRegion=${user.assignedGeolocation.toString()}`;
            } else {
              param = `buyerHierarchyType=${user.assignedHierarchyType}&sellerId=${user.employerUserId}`;
            }          
            dispatch(getdashboardFillRateData(param))
        }

    }, [dispatch])

    const { user } = useSelector(state => state.auth)
    const { fillRateStats } = useSelector(state => state?.fillRateStats)
    console.log(fillRateStats)
    let month =[]
    if (fillRateStats != undefined) {
        let tempAddr = fillRateStats.map(e => {
            return {
                ...e,
                key: e.month,
                value: e.month,
            }
        });
    
        month = tempAddr
    }
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
      };
    return (
        <SafeAreaView>
            <View >
            <Pressable  >
                                    <Checkbox
                                        status={'checked'}
                                    />
                                </Pressable>
            <Text style={{top:"-50%",left:"10%"}}>GT</Text>
            </View>
            <View style={{top:"-16%",left:"20%"}}>
            <Pressable  >
                                    <Checkbox
                                        status={'checked'}
                                    />
                                </Pressable>
            <Text style={{top:"-50%",left:"10%"}}>MT</Text>
            </View>
            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
            <BarChart
//   style={graphStyle}
  data={data}
  width={screenWidth}
  height={220}
  yAxisSuffix='%'
  chartConfig={chartConfig}
  verticalLabelRotation={30}
/>
            </View>       
        </SafeAreaView>
    )
}

const PurchaseValue = () => {
    const data = [
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
          color: "#ffffff",
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
    return (
        <SafeAreaView>
            <View>
            <Pressable  >
                                    <Checkbox
                                        status={'checked'}
                                    />
                                </Pressable>
                <Text style={{top:"-50%",left:"10%"}}>Year</Text>
            </View>
            <View style={{top:"-12%",left:"30%"}}>
            <Pressable  >
                                    <Checkbox
                                        status={'checked'}
                                    />
                                </Pressable>
                <Text style={{top:"-50%",left:"10%"}}>Month</Text>
            </View>
            <View style={{top:"-24%",left:"70%"}}>
            <Pressable  >
                                    <Checkbox
                                        status={'checked'}
                                    />
                                </Pressable>
                <Text style={{top:"-50%",left:"10%"}}>Day</Text>
            </View>
            <View style={{top:"-20%"}}>
               <SelectList  data={""} setSelected={""}  />
                </View>
            <View style={{ flex: 0, width: '100%', marginBottom: 20 }} >
                
            <PieChart
  data={data}
  width={screenWidth}
  height={250}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
  center={[10, 50]}
  absolute
/>

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