import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, Platform, StatusBar } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/userAction/action";

const CustomDrawer = (props) => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)


    // const [imageUrl, setImageUrl] = useState(user.avatar.url)
    // const [name, setName] = useState(user.name)

    const logoutHandler = async () => {
        await dispatch(logout())
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>


            <DrawerContentScrollView {...props}
                contentContainerStyle={{ backgroundColor: '#fff', paddingTop: 0 }}
            >
                <ImageBackground
                    source={require('../assets/img/h.png')}
                    style={{ paddingTop: 50 }}
                >
                    {/* <Image
                        source={{ uri: imageUrl }}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    /> */}
                    <Text style={{ color: 'black', fontSize: 12, paddingTop: 10, paddingLeft: 10,fontWeight:'500' }}>{user.userName}</Text>
                    <Text style={{ color: 'black', fontSize: 10, paddingTop: 10, paddingLeft: 10,fontWeight:'500' }}>Email: <Text style={{ color: 'blue' }}>{user.email}</Text></Text>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>


            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text style={{ fontSize: 15, marginLeft: 5 }}>Tell a Friend</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={logoutHandler} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={{ fontSize: 15, marginLeft: 5 }}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default CustomDrawer