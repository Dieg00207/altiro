import { auth, googleAuthProvider, signInWithPopup } from '../firebase';

export const AuthService = {
  signInWithGoogle: async () => {
    try {
      const provider = new googleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      return { user: res.user };
    } catch (err) {
      return { err };
    }
  },
};
