import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import cn from "clsx"
import { CustomButtonProps } from '@/type'

const CustomButton = ({ onPress, title="Click Me", style, leftIcon, textStyle, isLoading =false }: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={cn("custom-btn", style)}>
      {leftIcon}
      <View className='flex-center flex-row'>
        {isLoading ? (
            <ActivityIndicator size='small' color='white' />
        ):(
            <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default CustomButton