# aws-mobile-vidshare-app

A **React Native** mobile app that enables seamless uploading and sharing of large, high-quality videos through a cloud-based system. It uses **AWS S3** for storage and generates **presigned URLs** for easy streaming. With **Firebase authentication**, users can securely manage and share their videos from any device.

## Overview
The app solves the challenge of sharing large video files directly from mobile devices, which often struggle with storage limitations and throughput issues. This app fully delegates the uploading and streaming process to **AWS S3**, ensuring video quality is maintained and enabling efficient sharing through presigned URLs.

## Key Features
- **Video Uploading:** Seamlessly upload large video files from mobile devices to **AWS S3**.
- **Presigned URLs:** Enables video playback directly from the cloud without downloading, ensuring quality is preserved.
- **Firebase Authentication:** Secure user login and video management.
- **Cloud-Based System:** Offloads storage and video streaming to **AWS**, overcoming mobile device limitations.

## Tech Stack
- **Frontend:** React Native
- **Backend:** Python
- **Cloud Storage:** AWS S3
- **Authentication:** Firebase
- **AWS SDK:** Boto3 for interaction with AWS services

## Purpose
This app is designed to address the difficulty of sharing large videos on mobile devices due to storage and bandwidth constraints. By leveraging **AWS S3**, the app enables full cloud delegation of both uploading and streaming, ensuring video quality is maintained during the process.

## Usage Instructions

### Prerequisites
1. **Node.js and npm** installed.
2. **React Native CLI** installed.
3. An **AWS account** with an S3 bucket set up.
4. **Firebase account** for authentication.
5. **Python** and **Boto3** installed on the backend.

## Getting Started

Follow the steps below to start the Flask server and the React Native Expo app.

### Prerequisites

Make sure you have the following installed:

1. **Node.js and npm**: Install from [here](https://nodejs.org/).
2. **React Native CLI**: Install globally by running:
   ```bash
   npm install -g expo-cli
3. **AWS S3**: Ensure you have an AWS account and an S3 bucket set up. [AWS S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
4. **Firebase**: Create a Firebase account for authentication. [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
5. **Python**: Ensure Python is installed. You can download it [here](https://www.python.org/downloads/).
6. **Boto3**: Install the AWS SDK for Python by running the following command:
   ```bash
   pip install boto3

Backend Setup (Flask)
Clone the repository and navigate to the backend folder:

bash
Copy code
git clone <your-repo-url>
cd backend
Create a virtual environment:

bash
Copy code
python -m venv venv
Activate the virtual environment:

On macOS/Linux:
bash
Copy code
source venv/bin/activate
On Windows:
bash
Copy code
venv\Scripts\activate
Install the required dependencies:

bash
Copy code
pip install -r requirements.txt
Start the Flask server:

bash
Copy code
flask run
The Flask server should now be running at http://127.0.0.1:5000.

Frontend Setup (React Native)
Navigate to the React Native app folder:

bash
Copy code
cd react-native-app
Install the required npm packages:

bash
Copy code
npm install
Start the Expo development server:

bash
Copy code
expo start
Use the Expo Go app to scan the QR code or run the app on an emulator to launch the app.

AWS S3 Setup
Ensure your AWS credentials are set up properly. You can configure the credentials using the AWS CLI:

bash
Copy code
aws configure
Alternatively, you can set up credentials directly in your Flask app using environment variables.

Ensure your Flask app is configured to upload files to your S3 bucket. The following libraries are used for AWS integration:

Boto3: AWS SDK for Python.
Flask-S3: For handling uploads to S3.
Firebase Authentication Setup
Go to Firebase Console and create a new project.

Enable Authentication and choose the Email/Password provider.

Set up Firebase in your React Native app by following the Firebase Auth integration guide here.

Add Firebase SDK and initialize it in your project:

bash
Copy code
npm install --save @react-native-firebase/app @react-native-firebase/auth
In your code, initialize Firebase:

javascript
Copy code
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
Now, you should have Firebase authentication set up in your React Native app.

Running the Application
To run both the frontend and backend:

Start the Flask backend server by navigating to the backend folder and running:

bash
Copy code
flask run
Start the React Native app by navigating to the react-native-app folder and running:

bash
Copy code
expo start
Open the Expo Go app on your device or use the emulator to scan the QR code and run the app.