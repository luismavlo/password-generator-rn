import { Pressable, Text, View } from 'react-native'
import { colors, globalStyles } from '../../theme/theme';

interface Props {
  label: string,
  color?: string,
  disabled: boolean,

  onPress: () => void;
  onLongPress: () => void;
}

export const Button = ({
  label,
  color = colors.colorText,
  disabled,
  onPress,
  onLongPress
}: Props) => {
  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        ...globalStyles.button,
        backgroundColor: color,
        opacity: (pressed) ? 0.8 : 1
      })}
    >
      <Text style={globalStyles.buttonText}>{label}</Text>
    </Pressable>
  )
}