import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Details: {
    id: number;
    title: string;
    description: string;
    location: string;
    date: string;
    category: string;
    speaker: string;
  };
  ApiPosts: undefined;
  ApiPostDetails: {
    id: number;
  };
  Users: undefined;
  UserDetails: {
    id: number;
  };
  Todos: undefined;
  FavouritePosts: undefined;
};

export type ApiPostsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ApiPosts">;
};