import { createStackNavigator } from 'react-navigation';

import Urgent from './components/Urgent';
import HomeScreen from './components/HomeScreen';

export default createStackNavigator({
  Home: { screen: HomeScreen },
  Urgent: { screen: Urgent }
});




