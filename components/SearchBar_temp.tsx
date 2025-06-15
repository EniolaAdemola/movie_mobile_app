import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  onPress?: () => void;
  className?: string;
};

const SearchBar = ({ placeholder, onPress, className }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-100 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-6 mr-3"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        className={className}
      />
    </View>
  );
};

export default SearchBar;
