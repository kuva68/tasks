import auth from '@react-native-firebase/auth';

export const signInAnonymously = async () => {
  try {
    const userCredential = await auth().signInAnonymously();
    console.log('Signed in anonymously:', userCredential.user.uid);
  } catch (error) {
    console.error('Anonymous sign-in error:', error);
  }
};
