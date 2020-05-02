# Connect to Firebase

## Web Setup

- On the Firebase console, add a new web application and enter your projects details.

- Got to Firebase Projects settings and select your web app.
- From the Firebase SDK snippet, select `Config` options.
- Copy the Firebase config and add it to following location `/src/api/firebase/config/index.js`

```JavaScript
  const firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx",
    measurementId: "xxx"
  };
```

## iOS Setup

- On the Firebase console, add a new iOS application and enter your projects details.

- Download the `GoogleService-Info.plist` file and place it inside of your project at the following location: `/src/api/firebase/config/GoogleService-Info.plist`.

## Android Setup

- On the Firebase console, add a new Android application and enter your projects details.

To generate Debug signing certificate SHA-1 (optional) use the command below or [follow the following instruction](https://developers.google.com/android/guides/client-auth). This step is not required unless you want to distribute your app using Firebase App Distribution.

```shell
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

On the Firebase console, add a new Android application and enter your projects details.

- Download the `google-services.json` file and place it inside of your project at the following location: `/src/api/firebase/config/google-services.json`.

# Run development server

- Install dependencies

```
yarn install
```

- Start app in a specific platform, platform could be `web`, `ios` or `android`

```
yarn <platform> 
```