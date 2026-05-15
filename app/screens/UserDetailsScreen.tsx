import { RouteProp } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useFetch } from "../../hooks/useFetch";
import { RootStackParamList } from "../../types/Navigation";
import { User } from "../../types/User";

type UserDetailsRouteProp = RouteProp<RootStackParamList, "UserDetails">;

type UserDetailsScreenProps = {
  route: UserDetailsRouteProp;
};

export default function UserDetailsScreen({ route }: UserDetailsScreenProps) {
  const { id } = route.params;

  const {
    data: user,
    isLoading,
    error,
  } = useFetch<User>(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.infoText}>Ładowanie danych użytkownika...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>Nie znaleziono użytkownika.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Imię i nazwisko:</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{user.username}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Telefon:</Text>
      <Text style={styles.value}>{user.phone}</Text>

      <Text style={styles.label}>Strona www:</Text>
      <Text style={styles.value}>{user.website}</Text>
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
  label: {
    fontSize: 14,
    color: "#888",
    marginTop: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    color: "#333",
    marginTop: 4,
  },
});
