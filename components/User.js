import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const User = ({item}) => {
  return (
    <Pressable style={{flexDirection: "row", alignItems: "center", marginVertical: 10}}>
      <View>
        <Image style={{height: 50, width: 50, resizeMode: "cover", borderRadius: 50}} source={{uri: item?.image}} />
      </View>

      <View style={{marginLeft: 10}}>
        <Text>{item?.name}</Text>
        <Text>{item?.email}</Text>
      </View>
    </Pressable>
  )
}

export default User

const styles = StyleSheet.create({})