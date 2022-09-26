import { StyleSheet,View, Text,Button,TextInput } from 'react-native'
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';




const Pdf = ({navigation}) => {
    let [name, setName] = useState("");
    const html = `
    <html>
      <body>
   
      <div style="width:100%; display: flex; padding:20px 50px; box-sizing: border-box; justify-content: space-between; "> <span><b>Dms</b></span>  <div style="width: 180px; text-align:left;"><b>Purchase Order</b></div>  </div>
      <div style="width:100%; display: flex; padding: 0 50px; box-sizing: border-box; justify-content: space-between;"> <span>Rohit</span>
         </div>
         <div style="width:100%; display: flex; padding: 0 50px; box-sizing: border-box; justify-content: space-between;"> <b>Noida</b>   </div>
         <div style="width:100%; display: flex; padding: 20px 50px 0 50px; box-sizing: border-box; justify-content: space-between;"> <b>Vendor Address
      
      
      </b> 
      <div style="display: flex; justify-content: space-between; width: 180px;"> <div><b>PO Number</b></div> <div><span>P0-0122003</span></div>  </div>
      </div>
      
      <div style="width:100%; display: flex; padding: 5px 50px; box-sizing: border-box; justify-content: space-between;"> 
      Phase 2,Industrial Area 
        
      
      <div style="display: flex; justify-content: space-between; width: 180px;"> <div><b>Order Date </b></div> <div><span>21 Sep 2022</span></div>  </div>    
      </div>
       
      
      
      <div style="width:100%; display: flex; padding: 5px 50px 50px 50px; box-sizing: border-box; justify-content: space-between;"> 
      Sector62,Idusterial Area
      
      
      <div style="display: flex; justify-content: space-between; width: 180px;"> <div><b>Delivery Date</b></div> <div><span>21 Sep 2022</span></div>  </div>
      </div>
      
      <style>
      
      tr {
      border-bottom: 1pt solid black;
      }
      </style>
      
      <div style="padding:50px;">
      <table width="100%" style="text-align:left; " cellpadding="10">
      
      <tr style="background: grey; color:white;"><th>Item Name</th> <th>QTY</th> <th>RATE</th> <th>Amount</th></tr>
      
      
      <tr style="border-bottom: solid 2px black !important"><td><Red Chill Suace</td> <td>1</td> <td>3413</td> <td>3413</td></tr>
      <tr style="border-bottom: solid 2px black !important"><td></td> <td></td> <td>SUBTOTAL</td> <td><b>3413</b></td></tr>
      
      <tr style="border-bottom: solid 2px black !important"><td></td> <td></td> <td>TOTAL</td> <td><b>₹ 3413</b></td></tr>
      
      </table>
      
      <div style="width:100%;  padding: 0 50px; box-sizing: border-box;"> <b>Notes</b> 
      <p>It was great doing busines with you </p>
      </div>
      
      <div style="width:100%;  padding: 0 50px; box-sizing: border-box;"> <b>Notes</b> 
          <p>Upon accepting this purchase order,you hereby agree to the terms & condition.</p>
          </div>
      
      
      </div>
         
      
      </body>
    </html>
  `;
    let generatePdf = async () => {
        const file = await printToFileAsync({
          html: html,
          base64: false
        });
    
        await shareAsync(file.uri);
      };
      let PdfDownload = async () => {
        const file = await printToFileAsync({
          html: html,
          base64: false
        });

        
    
        await downloadAsync(file.uri);
        

      };
    return (
        <View style={styles.container}>
         
            <Button title="Generate PDF" onPress={generatePdf} />
            <StatusBar style="auto" />
            

            <Button title="Pdf Download" onPress={PdfDownload} />
            <StatusBar style="auto" />

            <View>
            <Button title='Preview' color="red"/>

            <Button title='Pdf Download' color="green"></Button>
            </View>
        </View>
        
                            
            
        
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    textInput: {
      alignSelf: "stretch",
      padding: 8,
      margin: 8
    }
  });

export default Pdf