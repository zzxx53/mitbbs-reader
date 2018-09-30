import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const windowDimentions = Dimensions.get('window');
export default {
    windowHeight: windowDimentions.height,
    windowWidth: windowDimentions.width,
    statusBarHeight: getStatusBarHeight()
}