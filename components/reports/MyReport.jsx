import { ScrollView, StyleSheet, Text, View, Dimensions, Image, } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Linking } from 'react-native';
const { height, width } = Dimensions.get('window');

const MyReport = () => {
    const [customerPOReport, setCustomerPOReport] = useState('')
    const [claimPOReport, setClaimPOReport] = useState('')
    const [inventoryReport, setInventoryPOReport] = useState('')
    const [mtPOReport, setMTPOReport] = useState('')
    const [salesorderReport, setSalesorderReport] = useState('')
    const [salesinvoiceReport, setSalesinvoiceReport] = useState('')
    const [collectionReport, setCollectionPOReport] = useState('')
    const [ledgerReport, setLedgerReport] = useState('')
    const [schemeReport, setSchemeReport] = useState('')
    const [productlistReport, setProductlistReport] = useState('')
    const [pricelistReport, setPricelistReport] = useState('')
    const [supplierinvoiceReport, setSupplierinvoiceReport] = useState('')

    const { user } = useSelector(state => state.auth)

    const downloadExcel = () => {
        console.log("https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing")

        // .then(resp => resp.blob())
        //           .then(blob => {
        //             dispatch(showSuccessSnackbar("Report download successfully", "success"));
        //             const url = window.URL.createObjectURL(blob);
        //             const a = document.createElement('a');
        //             a.style.display = 'none';
        //             a.href = url;
        //             a.download = `Report.xlsx`;
        //             document.body.appendChild(a);
        //             a.click();
        //             window.URL.revokeObjectURL(url);
        //           

    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>My Purchase Order</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150, }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}

                                />
                                </Text>

                            </View>
                            <SelectList
                                setSelected={setCustomerPOReport}
                                data={[{ key: 'myPurchaseOrderReport', value: 'My Purchase Order Report' }]}
                                onSelect={() => setCustomerPOReport(customerPOReport)} />

                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>My Claim</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150, }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}
                                />
                                </Text>
                            </View>

                            <SelectList
                                setSelected={setClaimPOReport}
                                data={[{ key: 'claimReport', value: 'Claim Report' }]}
                                onSelect={() => setClaimPOReport(claimPOReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Inventory</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}
                                />
                                </Text>
                            </View>
                            <SelectList
                                setSelected={setInventoryPOReport}
                                data={[{ key: 'inventoryDBReport', value: 'Inventory Report' }, { key: 'inventoryTrackingReport', value: 'Tracking Report' }]}
                                onSelect={() => setInventoryPOReport(inventoryReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>MT Purchase Order</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')} />
                                </Text>

                            </View>
                            <SelectList
                                setSelected={setMTPOReport}
                                data={[{ key: 'mtDBPurchaseOrderReport', value: 'MT Purchase Order Report' }]}
                                onSelect={() => setMTPOReport(mtPOReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>My Sales Order</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')} />
                                </Text>
                            </View>
                            <SelectList
                                setSelected={setSalesorderReport}
                                data={[{ key: 'salesOrderDBFillRate', value: 'Sales Order Fill Rate Report' }]}
                                onSelect={() => setSalesorderReport(salesorderReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>My Sales Invoice</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}
                                />
                                </Text>
                            </View>
                            <SelectList
                                setSelected={setSalesinvoiceReport}
                                data={[{ key: 'invoiceDBReport', value: 'Invoice Report' }, { key: 'gst1SalesInvoiceReport', value: 'GSTR-1 Sales Invoice Report' }, { key: 'gst1CreditNoteReport', value: 'GSTR-1 Credit Note Report' }, { key: 'gst1HsnReport', value: 'GSTR-1 HSN Report' }, { key: 'gst1HsnInvoiceWiseReport', value: 'GSTR-1 HSN Report Invoice Wise' }]}
                                onSelect={() => setSalesinvoiceReport(salesinvoiceReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Collection</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}
                                />
                                </Text>
                            </View>
                            <SelectList
                                setSelected={setCollectionPOReport}
                                data={[{ key: 'collectionReport', value: 'Collection Report' }]}
                                onSelect={() => setCollectionPOReport(collectionReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Ledger</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}
                                />
                                </Text>
                            </View>
                            <SelectList
                                setSelected={setLedgerReport}
                                data={[{ key: 'ledgerReport', value: 'Ledger Report' }]}
                                onSelect={() => setLedgerReport(ledgerReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Scheme</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}
                                />
                                </Text>
                            </View>
                            <SelectList
                                setSelected={setSchemeReport}
                                data={[{ key: 'schemeReport', value: 'Scheme Report' }]}
                                onSelect={() => setSchemeReport(schemeReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Product List</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}
                                />
                                </Text>
                            </View>
                            <SelectList
                                setSelected={setProductlistReport}
                                data={[{ key: 'productListReport', value: 'Product List Report' }]}
                                onSelect={() => setProductlistReport(productlistReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Price List</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}
                                />
                                </Text>
                            </View>
                            <SelectList
                                setSelected={setPricelistReport}
                                data={[{ key: 'priceListReport', value: 'Price List Report' }]}
                                onSelect={() => setPricelistReport(pricelistReport)} />
                        </View>
                    </View>
                </View>
                <View style={styles.reportContainer}>
                    <Text style={{ fontSize: 20, margin: 10, padding: 5 }}>Supplier Invoicer</Text>
                    <View style={{ backgroundColor: 'white', width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, }}>
                        <View style={[styles.containerD, { width: '99%' }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, margin: 2 }}>Report </Text>
                                <Icon style={{ margin: 18, alignItems: 'flex-end', marginTop: 7, right: 60, justifyContent: 'flex-end', right: 0, marginLeft: 280 }} name="eye" size={20} />
                                <Text style={{ marginTop: 7, right: 60, }}><Icon style={{ margin: 15, alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 150 }} name="download" size={20}
                                    onPress={() => Linking.openURL('https://docs.google.com/spreadsheets/d/1LFIwtLQ4gPzhOWbmXWvQuOtw6laC41IMeeDtAC5Hqww/edit?usp=sharing')}
                                />
                                </Text>
                            </View>
                            <SelectList
                                setSelected={setSupplierinvoiceReport}
                                data={[{ key: 'supplierInvoiceReport', value: 'Supplier Invoice Report' }]}
                                onSelect={() => setSupplierinvoiceReport(supplierinvoiceReport)} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default MyReport

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        // borderTopRightRadius: 20,
        height: height,
        paddingBottom: 90
    },
    icons: {
        flexDirection: 'row',
        padding: 5,
        marginLeft: 100,
        bottom: 40,
        marginright: 90


    },
    containerD: {
        padding: 10,
    },
    reportContainer: {
        backgroundColor: '#A5D5E8',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRadius: 20,
        marginVertical: 10,
    },
    contain: {
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        width: '25%',
        height: 28,
        margin: 10,
        right: 50,
        left: 10,
        bottom: 2,

    },
})