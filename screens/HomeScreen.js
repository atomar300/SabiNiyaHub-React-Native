import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "../apiClient";
import User from "../components/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar } from "react-native-paper";


const HomeScreen = () => {

    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const { error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const searchHandler = async (text) => {
        setSearch(text);
        if (text.trim()) {
            try {
                const token = await AsyncStorage.getItem("token");
                const config = { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
                const { data } = await apiClient.get(`/api/v1/users?search=${text}`, config);
                setUsers(data.users);
            } catch (error) {
                console.log(error)
                Toast.show({ type: 'error', text1: error });
            }
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>SabiNiyaHub</Text>
            ),
            headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
                    <MaterialIcons
                        onPress={() => navigation.navigate("Friends")}
                        name="people-outline"
                        size={24}
                        color="black"
                    />
                </View>
            ),
        });
    }, []);

    useEffect(() => {
        if (error) {
            Toast.show({ type: 'error', text1: error })
            dispatch(clearErrors());
        }

    }, [dispatch, error]);


    return (
        <View>
            <View style={{padding: 15}}>
                <Searchbar
                    placeholder="Search..."
                    onChangeText={(text) => searchHandler(text)}
                    style={{backgroundColor: "#D8D6D6"}}
                    value={search}
                />
            </View>

            <View style={{ padding: 10 }}>
                {users.map((item, index) => (
                    <User key={index} item={item} />
                ))}
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});