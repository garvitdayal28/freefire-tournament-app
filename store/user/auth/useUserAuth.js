import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../../../config/firebaseConfig";

export const useUserAuth = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  // Register a new user
  registerWithEmail: async (name, username, email, phone, password) => {
    set({ isLoading: true, error: null });
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        username,
        email,
        phone,
        createdAt: new Date(),
        walletBalance: 0,
        profileImageUrl: null,
      });

      set({
        isAuthenticated: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name,
          username,
          phone,
          walletBalance: 0,
        },
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = handleAuthError(error);
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Login with email and password
  loginWithEmail: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      console.log("User Document:", userDoc.exists(), userDoc.data());

      if (userDoc.exists()) {
        console.log("User data found in Firestore");
        const userData = userDoc.data();
        set({
          isAuthenticated: true,
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            name: userData.name,
            username: userData.username,
            phone: userData.phone,
            walletBalance: userData.walletBalance || 0,
            profileImageUrl: userData.profileImageUrl,
          },
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: true,
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            name: userCredential.user.displayName,
          },
          isLoading: false,
        });
      }

      return { success: true };
    } catch (error) {
      const errorMessage = handleAuthError(error);
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Sign in with Google
  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (!userDoc.exists()) {
        // Create user document if this is first login
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: userCredential.user.displayName,
          username: userCredential.user.email.split("@")[0],
          email: userCredential.user.email,
          phone: userCredential.user.phoneNumber || "",
          createdAt: new Date(),
          walletBalance: 0,
          profileImageUrl: userCredential.user.photoURL,
        });
      }

      const userData = userDoc.exists()
        ? userDoc.data()
        : {
            name: userCredential.user.displayName,
            username: userCredential.user.email.split("@")[0],
            phone: userCredential.user.phoneNumber || "",
            walletBalance: 0,
            profileImageUrl: userCredential.user.photoURL,
          };

      set({
        isAuthenticated: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          ...userData,
        },
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = handleAuthError(error);
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Send password reset email
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await sendPasswordResetEmail(auth, email);
      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = handleAuthError(error);
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Logout user
  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut(auth);
      set({ isAuthenticated: false, user: null, isLoading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = handleAuthError(error);
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Initialize auth state listener
  init: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          set({
            isAuthenticated: true,
            user: {
              uid: user.uid,
              email: user.email,
              ...userData,
            },
            isLoading: false,
          });
        } else {
          set({
            isAuthenticated: true,
            user: {
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              profileImageUrl: user.photoURL,
            },
            isLoading: false,
          });
        }
      } else {
        // User is signed out
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    });

    // Return unsubscribe function to clean up
    return unsubscribe;
  },

  // Reset error state
  clearError: () => set({ error: null }),
}));

// Helper function to handle Firebase auth errors with user-friendly messages
const handleAuthError = (error) => {
  const errorCode = error.code;

  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/weak-password":
      return "Password is too weak";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-credential":
      return "Invalid email or password";
    case "auth/too-many-requests":
      return "Too many failed attempts. Try again later";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email address but different sign-in credentials";
    default:
      return error.message || "An unexpected error occurred";
  }
};
