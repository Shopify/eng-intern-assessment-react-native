import { 
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { 
  createRestyleComponent,
  createVariant,
  VariantProps,
  textRestyleFunctions
} from '@shopify/restyle';
import { Theme } from './theme';
import Box from './Box';
import Text from './Text';

type Props = VariantProps<Theme, "buttonVariants"> & {
  label: string;
  onPress?: () => void;
};

const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, "buttonVariants"> & React.ComponentProps<typeof Box> & React.ComponentProps<typeof Text>,
  Theme
>([createVariant({ themeKey: "buttonVariants" })], Box);


export default function StopWatchButton({label, variant, onPress, ...rest}: Props) {
  
  return (
      <TouchableOpacity onPress={onPress}>
        <ButtonContainer variant={variant} {...rest}>
          <Text variant={variant}>{label}</Text>
        </ButtonContainer>
      </TouchableOpacity>
  );
}
