import { Text, View } from 'react-native'
import { PasswordGeneratorScreen } from './presentation/screens/PasswordGeneratorScreen'
import { globalStyles } from './theme/theme'


export const App = () => {
  return (
    <View style={globalStyles.container}>
      <PasswordGeneratorScreen />
    </View>
  )
}