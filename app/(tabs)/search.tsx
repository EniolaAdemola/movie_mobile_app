import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar_temp";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const {
    data: movies,
    loading,
    error,
    refetch: refetchMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchTerm }), false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim()) {
        await refetchMovies();
      } else {
        reset();
      }
    }, 500); // 500ms wait time

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" />

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            {...item}
            // onPress={() => router.push(`/movie/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-centermt-20 items-center">
              <Image
                source={icons.logo}
                className="w-12 h-10 mt-20 mb-5 mx-auto"
              />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for movies, titles and more..."
                onChangeText={(text: string) => setSearchTerm(text)}
                value={searchTerm}
                className="text-accent rounded-full"
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 text-center mt-10">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchTerm.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for{" "}
                <Text className="text-accent">{searchTerm}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-gray-500 text-center">
                {searchTerm.trim()
                  ? `No results found found`
                  : "Start typing to search for movies, titles and more..."}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;
