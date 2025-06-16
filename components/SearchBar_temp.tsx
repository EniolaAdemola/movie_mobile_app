import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  onPress?: () => void;
  className?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

const SearchBar = ({
  placeholder,
  onPress,
  className,
  value,
  onChangeText,
}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-100 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-6 mr-3"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        // onPress={onPress}
        placeholder={placeholder}
        className={className}
        placeholderTextColor="#ab8bff"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
