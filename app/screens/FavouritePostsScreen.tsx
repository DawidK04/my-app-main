import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { getFavouritePosts } from "../services/favouriteStorage";

export default function FavouritePostsScreen() {
    const [favouritePostIds, setFavouritePostIds] = useState<number[]>([]);

    const loadFavourites = async () => {
        const ids = await getFavouritePosts();
        setFavouritePostIds(ids);
    };

    useEffect(() => {
        loadFavourites();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ulubione posty</Text>
            <Button title="Odśwież" onPress={loadFavourites} />
            <FlatList
                data={favouritePostIds}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardText}>Post ID: {item}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Brak ulubionych postów</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        padding: 15,
        backgroundColor: "#f9f9f9",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    cardText: {
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 20,
        color: "#888",
    },
});
