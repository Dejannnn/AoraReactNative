//Constants
import { PICKER_TYPE } from "@/constants";
//Types
import { FormCreateContentProps } from "@/types/index";

import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
  ImageGravity,
  ImageFormat,
} from "react-native-appwrite/src";

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  platform: process.env.EXPO_PUBLIC_PLATFORM,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
  userColectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
  videoColectionId: process.env.EXPO_PUBLIC_VIDEO_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_STORAGE_ID,
};
const client = new Client();
client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userColectionId,
      ID.unique(),
      {
        username,
        email,
        avatar: avatarUrl,
        account_id: newAccount.$id,
      }
    );
    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userColectionId,
      [Query.equal("account_id", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(">>>error>>>", error);
  }
};

export const getAllPost = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoColectionId
    );
    if (!posts) throw Error;

    return posts.documents;
  } catch (error: any) {
    console.log("Error fetch all posts", error);
    throw new Error(error);
  }
};

export const getLatestsPost = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoColectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    if (!posts) throw Error;

    return posts.documents;
  } catch (error: any) {
    console.log("Error fetch all posts", error);
    throw new Error(error);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoColectionId,
      [Query.search("title", query)]
    );
    if (!posts) throw Error;

    return posts.documents;
  } catch (error: any) {
    console.log("Error fetch  by search props", error);
    throw new Error(error);
  }
};

export const searchUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoColectionId,
      [Query.equal("creator", userId)]
    );
    if (!posts) throw Error;

    return posts.documents;
  } catch (error: any) {
    console.log("Error fetch  by search props", error);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    console.log("Error logout", error);
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId: string, fileType: string) => {
  let fileUrl;
  try {
    if (fileType === PICKER_TYPE.VIDEO) {
      fileUrl = storage.getFileView(appWriteConfig.storageId, fileId);
    } else if (fileType === PICKER_TYPE.IMAGE) {
      fileUrl = storage.getFilePreview(
        appWriteConfig.storageId,
        fileId,
        800, // Resize the width to 800px
        0, // Keep the original height (aspect ratio preserved)
        ImageGravity.Center, // Crop the image centered if cropping is needed
        80, // Set image quality to 80%
        undefined, // No border
        undefined, // No border color
        undefined, // No border radius
        1, // Full opacity
        0, // No rotation
        undefined, // No background color
        ImageFormat.Webp
      );
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) {
      throw new Error();
    }
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const uploadFile = async (file: any, mediaType: string) => {
  if (!file) return;
  console.log("Soruce file", file);
  const { mimeType, fileName, fileSize, uri } = file;
  const asset = {
    type: mimeType,
    name: fileName,
    size: fileSize,
    uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      appWriteConfig.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, mediaType);
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const createVideo = async (form: FormCreateContentProps) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, PICKER_TYPE.IMAGE),
      uploadFile(form.video, PICKER_TYPE.VIDEO),
    ]);

    const newPost = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videoColectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.propt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
};
