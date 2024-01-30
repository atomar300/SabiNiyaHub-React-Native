import { Pressable, StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login, loadUser } from '../components/redux/userActions'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { error, isAuthenticated } = useSelector((state) => state.user);


    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };
        dispatch(login(user));
    };


    useEffect(() => {
        if (error) {
            Toast.show({ type: 'error', text1: error })
            dispatch(clearErrors());
        }

        const isLoggedIn = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    dispatch(loadUser(token));
                } else {

                }
            } catch (error) {
                console.log("error", error);
            }
        };

        isLoggedIn();

        if (isAuthenticated) {
            navigation.replace("Home");
        }
    }, [dispatch, error, isAuthenticated]);


    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", padding: 10 }}>
            <KeyboardAvoidingView>

                <View style={{ marginTop: 80, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "800" }}>Maligayang pagdating sa SabiNiyaHub!</Text>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, fontWeight: "300" }}>Dito, masigla ang kwentuhan at mga karanasan.</Text>
                </View>

                <View style={{ marginTop: 50, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "700" }}>Sign In</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View>
                        <Text style={{ fontSize: 17 }}>Email</Text>
                        <TextInput
                            style={{ borderWidth: 1, borderRadius: 10, padding: 5, width: 300, }}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 17 }}>Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={{ borderWidth: 1, borderRadius: 10, padding: 5, width: 300, }}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    <Pressable onPress={handleLogin} style={{ width: 200, padding: 15, backgroundColor: "black", marginTop: 50, borderRadius: 10, marginLeft: "auto", marginRight: "auto", width: 200 }}>
                        <Text style={{ color: "white", textAlign: "center", fontSize: 19, fontWeight: "500" }}>Login</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate("Register")}
                        style={{ marginTop: 15 }}
                    >
                        <Text style={{ textAlign: "center", fontSize: 16 }}>
                            New to SabiNiyaHub? Sign up
                        </Text>
                    </Pressable>

                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
