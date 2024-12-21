import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import {initializeApp} from "firebase-admin/app";
import * as logger from "firebase-functions/logger";

initializeApp();

export const createUserDocument = functions.auth.user().onCreate((user) => {
	logger.info("createUserDocument.........", {structuredData: true});
  return admin.firestore()
    .collection("users")
    .doc(user.uid)
    .set({
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      hasCompletedOnboarding: false,
    });
});
