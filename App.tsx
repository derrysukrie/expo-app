import { StatusBar } from "expo-status-bar";
import { Fragment, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchData, fetchNextPage } from "./src/api/fetcher";
import dayjs from "dayjs";
import { Daum } from "./src/api/response";
import { FlashList } from "@shopify/flash-list";
import Modal from "./src/components/Modal";

export default function App() {
  const [data, setData] = useState<Daum[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFetchingNextPage, setFetchingNextPage] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string>("");

  const [modalVisible, setModalVisible] = useState<{
    isVisible: boolean;
    image?: string;
    name?: string;
  }>({
    isVisible: false,
    image: "",
    name: "",
  });

  // better using React Query tho
  useEffect(() => {
    setLoading(true);
    fetchData().then((res) => {
      setLoading(false);
      setData(res.data.data);
      setNextCursor(res.data.pagination.cursors.after);
    });
  }, []);

  const fetchMore = async () => {
    if (!nextCursor) return;

    setFetchingNextPage(true);
    try {
      const response = await fetchNextPage(nextCursor);
      setNextCursor(response.data.pagination.cursors.after);

      setData((prev) => [...prev, ...response.data.data]);
      setFetchingNextPage(false);
    } catch (error) {
      Alert.alert(error);
    }
  };

  /**
   * Using Flashlist because served better performance,
   * like re-render component after seeing on viewport instead
   * of destroying it like Flatlist do
   */
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <FlashList
          data={data}
          onEndReachedThreshold={0.5}
          onEndReached={fetchMore}
          keyExtractor={(data) => data.id.toString()}
          estimatedItemSize={40}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
          contentContainerStyle={{ padding: 20 }}
          ListEmptyComponent={
            <View>{!isLoading && <ActivityIndicator />}</View>
          }
          ListFooterComponent={() => (
            <View>{isFetchingNextPage && <ActivityIndicator />}</View>
          )}
          renderItem={({ item }) => (
            <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Pressable
                onPress={() =>
                  setModalVisible({
                    isVisible: true,
                    name: item.title,
                    image: item.image,
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 10,
                    borderWidth: 0.5,
                  }}
                />
              </Pressable>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <Text style={{ fontSize: 12, color: "#9d9d9d" }}>
                  {dayjs(item.createdAt).format("DD MMM YYYY")}
                </Text>
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
