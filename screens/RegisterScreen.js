import { Pressable, StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from '../components/redux/userActions';
import { base64image } from '../base64image';



const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { error, isRegistered } = useSelector((state) => state.user);

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: base64image,
    };
    dispatch(register(user));
  };


  useEffect(() => {
    if (error) {
      Toast.show({ type: 'error', text1: error })
      dispatch(clearErrors());
    }

    if (isRegistered){
      Toast.show({ type: 'success', text1: 'Registration successful. You can now log in!' });
    }

  }, [dispatch, error, isRegistered])


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "700" }}>
            Register
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 17 }}>Name</Text>
            <TextInput
              style={{ borderWidth: 1, borderRadius: 10, padding: 5, width: 300, }}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View>
            <Text style={{ fontSize: 17, marginTop: 10 }}>Email</Text>
            <TextInput
              style={{ borderWidth: 1, borderRadius: 10, padding: 5, width: 300, }}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View>
            <Text style={{ fontSize: 17, marginTop: 10 }}>Password</Text>
            <TextInput
              style={{ borderWidth: 1, borderRadius: 10, padding: 5, width: 300, }}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View>
            <Text style={{ fontSize: 17, marginTop: 10 }}>Image</Text>
            <TextInput
              style={{ borderWidth: 1, borderRadius: 10, padding: 5, width: 300, }}
              placeholder="Select image"
              value={image}
              onChangeText={(text) => setImage(text)}
            />
          </View>

          <Pressable onPress={() => handleRegister()} style={{ width: 200, padding: 15, backgroundColor: "black", marginTop: 50, borderRadius: 10, marginLeft: "auto", marginRight: "auto", width: 200 }}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 19, fontWeight: "500" }}>Register</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});