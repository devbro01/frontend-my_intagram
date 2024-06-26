/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, addDoc, collection } from "firebase/firestore";
export const createUser = createAsyncThunk(
  "user/createUserAndProfile",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const usersData = {
        userPhoto: data.photo,
        userName: data.name,
        userEmail: data.email,
      };
      const usersRef = collection(firestore, "Users");
      await addDoc(usersRef, usersData);
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: data.photo,
        phoneNumber: data.phone,
      });

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const UserLogin = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return user;
  } catch (error) {
    console.log(error);
  }
});

export const publishPosts = createAsyncThunk(
  "posts/publish",
  async (data, thunkAPI) => {
    const { title, imageUpload, user, description } = data;
    try {
      const storageRef = ref(
        storage,
        `/images/${Date.now()}${imageUpload?.name}`
      );

      const uploadImage = uploadBytesResumable(storageRef, imageUpload);
      await uploadImage;

      const url = await getDownloadURL(uploadImage.snapshot.ref);

      const articleData = {
        title: title,
        description: description,
        imageUrl: url,
        createdAt: Timestamp.now().toDate(),
        createdUserPhoto: user?.photoURL,
        createdBy: user?.displayName,
        userId: user?.uid,
        likes: [],
        comments: [],
      };

      const articleRef = collection(firestore, "Articles");
      await addDoc(articleRef, articleData);

      return {}; // You can return data if needed
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDisplayNameAsync = createAsyncThunk(
  "user/updateDisplayName",
  async (newDisplayName, { rejectWithValue }) => {
    try {
      await auth.currentUser.updateProfile({
        displayName: newDisplayName,
      });

      return newDisplayName;
    } catch (error) {
      return rejectWithValue("Failed update displayName");
    }
  }
);
