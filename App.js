import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import IntroductionScreen from './src/Screen/introduction/IntroductionScreen';
import LoginScreen from './src/Screen/Login/LoginScreen';
import SignUpScreen from './src/Screen/Login/SignUpScreen';
import HomeScreen from './src/Screen/Login/HomeScreen';
import GoalSettingScreen from './src/GoalSettingScreen';
import CustomTabBar from './src/Customtabbar/CustomTabBar';
import AddGoalScreen from './src/Screen/AddGoalScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Upcoming from './src/Screen/Upcoming';
import Completed from './src/Screen/Completed';
import CompletedScreen from './src/Screen/Completed';
import OngoingGoalsScreen from './src/Screen/OnGoingGoalScreen';

const Stack = createStackNavigator();
const BTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function HomeScreen1() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="TotalView" component={HomeScreen} />
      <TopTab.Screen name="onGoing" component={Upcoming} />
      <TopTab.Screen name="Complete" component={CompletedScreen} />
      {/* <Tab.Screen name="Total View" component={HomeScreen} /> */}
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </TopTab.Navigator>
  );
}





const AuthStack = () => (
  <Stack.Navigator initialRouteName="Introduction">
    <Stack.Screen name="Introduction" component={IntroductionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <BTab.Navigator tabBar={(props) => <CustomTabBar {...props} />} initialRouteName="Home" screenOptions={{
    animationEnabled: true,
    tabBarShowLabel: false,
  }}>
    <BTab.Screen name="Home" component={HomeScreen1} />
    <BTab.Screen name="AddGoal" component={AddGoalScreen} options={{ headerShown: false }} />
    <BTab.Screen name="GoalSetting" component={GoalSettingScreen} />
  </BTab.Navigator>
);



const App = () => {
  const isAuthenticated = false;
  const initialRoute = isAuthenticated ? "AppTabs" : "AuthStack";
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName="AppTabs" screenOptions={{
            animationEnabled: true,
            tabBarShowLabel: false,
          }}>
            <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
          </Stack.Navigator> */}

          <Stack.Navigator initialRouteName="initialRoute" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
            <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
            <Stack.Screen name="OngoingGoals" component={OngoingGoalsScreen} options={{ title: 'Ongoing Goals' }} />

          </Stack.Navigator>
          {/* {isAuthenticated ? (
            <Stack.Navigator initialRouteName="AppTabs">
              <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
              <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
            </Stack.Navigator>
          ) : (
            <AuthStack />
          )} */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default App;
