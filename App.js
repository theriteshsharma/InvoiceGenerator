import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { CreateBill } from './Screen/CreateBill';
import { HomeScreen } from './Screen/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    
    
      <NavigationContainer initialRouteName="CreateBill">
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateBill" component={CreateBill} />
        </Stack.Navigator>
      </NavigationContainer>  

      
   

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
