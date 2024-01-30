import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import Toast from 'react-native-toast-message';
import store from './store';
import { Provider } from 'react-redux';

export default function App() {


  const toastConfig = {
    success: ({ text1, props, ...rest }) => (
      <View style={{
        height: 40,
        width: '80%',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#eafcea',
        borderWidth: 1.5,
        borderColor: "#11ff11",
      }}>
        <Text style={{
              fontWeight: "700",
              fontSize: 14,
              color: "#007000",
        }}>{text1}</Text>
      </View>
    ),
    error: ({ text1, props, ...rest }) => (
      <View style={{
        height: 40,
        width: '80%',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffeded',
        borderWidth: 1.5,
        borderColor: "#ff4d4d",
      }}>
        <Text style={{
              fontWeight: "700",
              fontSize: 14,
              color: "#a30000",
        }}>{text1}</Text>
      </View>
    )
  };

  return (
    <Provider store={store}>
      <>
        <StackNavigator />
        <Toast config={toastConfig} />
      </>
    </Provider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
