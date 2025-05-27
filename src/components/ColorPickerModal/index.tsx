import React, {useState, useEffect} from 'react';
import { Modal, View, Text } from 'react-native';
import { Button } from '../Button';
import Slider from '@react-native-community/slider';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import { styles } from './style';

interface ColorPickerModalProps {
  visible: boolean;
  initialColor: string;
  onClose: () => void;
  onColorSelect: (color: string) => void;
}

export default function ColorPickerModal({
  visible,
  initialColor,
  onClose,
  onColorSelect,
}: ColorPickerModalProps) {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  useEffect(() => {
    setSelectedColor(initialColor);
  }, [visible, initialColor]);


  const handleColorChange = ({ hex }: { hex: string }) => {
    setSelectedColor(hex);
  };

  const handleConfirm = () => {
    onColorSelect(selectedColor);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <ColorPicker
          style={styles.colorPicker}
          value={selectedColor}
          onCompleteJS={handleColorChange}
          // @ts-ignore
          sliderComponent={Slider}
        >
          <Text style={styles.label}>Cor selecionada:</Text>
          <Preview
            hideInitialColor
            hideText
            style={styles.previewBorder}
          />
          <Panel1 style={styles.panel} />
          <HueSlider style={styles.panel} />
        </ColorPicker>

         <Button
            text="Definir cor    "
            color={selectedColor}
            action={handleConfirm}
        />
      </View>
    </Modal>
  );
}
