import { RouteProp } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useFetch } from "../../hooks/useFetch";
import { Comment } from "../../types/Comment";
import { RootStackParamList } from "../../types/Navigation";
import { Post } from "../../types/Post";

type ApiPostDetailsRouteProp = RouteProp<
  RootStackParamList,
  "ApiPostDetails"
>;

type ApiPostDetailsScreenProps = {
  route: ApiPostDetailsRouteProp;
};

export default function ApiPostDetailsScreen({
  route,
}: ApiPostDetailsScreenProps) {
  const { id } = route.params;

  const {
    data: post,
    isLoading,
    error,
  } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const {
    data: comments,
    isLoading: areCommentsLoading,
    error: commentsError,
  } = useFetch<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );

  if (isLoading || areCommentsLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.infoText}>Ładowanie danych...</Text>
      </View>
    );
  }

  if (error || commentsError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || commentsError}</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>Nie znaleziono posta.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.meta}>ID posta: {id}</Text>
      <Text style={styles.comments}>
        Liczba komentarzy: {comments?.length ?? 0}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  meta: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 20,
  },
  comments: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2ecc71",
    marginTop: 10,
  },
});
