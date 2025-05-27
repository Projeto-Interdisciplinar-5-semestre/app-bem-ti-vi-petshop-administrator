import React from 'react';
import { View } from 'react-native';
import { Button } from '../Button';
import { styles } from './style';

type Props = {
  pageIndex: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
};

export const PaginationControls = ({ pageIndex, totalPages, onNext, onPrev }: Props) => {
  return (
    <View style={styles.paginationContainer}>
      <Button
        icon={require('../../assets/images/seta-voltar.png')}
        text=""
        color={pageIndex > 0 ? '#256489' : '#aaa'}
        action={() => {
          if (pageIndex > 0) onPrev();
        }}
      />

      <Button
        icon={require('../../assets/images/seta-avancar.png')}
        text=""
        color={pageIndex < totalPages - 1 ? '#256489' : '#aaa'}
        action={() => {
          if (pageIndex < totalPages - 1) onNext();
        }}
      />
    </View>
  );
};
