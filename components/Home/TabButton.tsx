import { StyleProp, TouchableOpacity, ViewStyle, Text } from "react-native";

interface TabButtonProps {
  style?: StyleProp<ViewStyle>; 
  isSelected: boolean;              
  label: string;                    
  onPress?: () => void;            
}

const TabButton: React.FC<TabButtonProps> = ({ style, isSelected, label, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        style, 
        { 
          backgroundColor: isSelected ? 'rgba(235, 168, 74, 0.55)' : '#fff',
          padding: 5,
          borderRadius: 50,
          minWidth: 80,

        }
      ]}
      onPress={onPress}
    >
        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
            {label}
        </Text>
    </TouchableOpacity>
  );
};

export default TabButton