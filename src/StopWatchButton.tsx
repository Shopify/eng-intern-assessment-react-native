import { 
  TouchableOpacity,
} from 'react-native';
import { 
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import { Theme } from './theme';
import Box from './Box';
import Text from './Text';

type Props = VariantProps<Theme, "buttonVariants"> & {
  label: string;
  onPress?: () => void;
};

// need to create a Restyled component to access the buttonVariants
const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, "buttonVariants"> & React.ComponentProps<typeof Box> & React.ComponentProps<typeof Text>,
  Theme
>([createVariant({ themeKey: "buttonVariants" })], Box);

// StopWatchButton component with varients for different use cases
export default function StopWatchButton({label, variant, onPress, ...rest}: Props) {
  
  return (
      <TouchableOpacity onPress={onPress}>
        <ButtonContainer variant={variant} {...rest}>
          <Text variant={variant}>{label}</Text>
        </ButtonContainer>
      </TouchableOpacity>
  );
}
