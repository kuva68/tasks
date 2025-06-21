import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { EnScreens } from '../types/enums';
import { TaskListScreen } from '../screens/TaskListScreen';
import { EditTaskScreen } from '../screens/EditTaskScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { signInAnonymously } from '../services/Auth';
import auth from '@react-native-firebase/auth';
export type RootStackParamList = {
  [EnScreens.TASK_LIST]: undefined;
  [EnScreens.TASK_EDIT]: undefined;
  [EnScreens.SEARCH]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        signInAnonymously(); // auto sign-in if not already
      } else {
        console.log('User already signed in:', user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name={EnScreens.TASK_LIST} component={TaskListScreen} />
      <Stack.Screen
        options={{
          animation: 'slide_from_bottom',
          gestureDirection: 'vertical',
        }}
        name={EnScreens.TASK_EDIT}
        component={EditTaskScreen}
      />
      <Stack.Screen
        options={{
          animation: 'slide_from_bottom',
          gestureDirection: 'vertical',
        }}
        name={EnScreens.SEARCH}
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
