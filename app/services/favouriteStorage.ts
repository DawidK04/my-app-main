import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../constants/storageKeys";

export async function getFavouritePosts(): Promise<number[]> {
    const storedValue = await AsyncStorage.getItem(STORAGE_KEYS.FAVOURITE_POSTS);
    if (!storedValue) {
        return [];
    }

    return JSON.parse(storedValue) as number[];
}

export async function saveFavouritePosts(ids: number[]): Promise<void> {
    await AsyncStorage.setItem(
        STORAGE_KEYS.FAVOURITE_POSTS,
        JSON.stringify(ids)
    );
}

export async function addFavouritePostId(id: number): Promise<number[]> {
    const currentIds = await getFavouritePosts();
    if (currentIds.includes(id)) {
        return currentIds;
    }
    const updatedIds = [...currentIds, id];
    await saveFavouritePosts(updatedIds);
    return updatedIds;
}

export async function removeFavouritePostId(id: number): Promise<number[]> {
    const currentIds = await getFavouritePosts();
    const updatedIds = currentIds.filter((item) => item !== id);
    await saveFavouritePosts(updatedIds);
    return updatedIds;
}

export async function isFavouritePostId(id: number): Promise<boolean> {
    const currentIds = await getFavouritePosts();
    return currentIds.includes(id);
}

