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

## Steps to Start the Flask Server and React Native Expo App

Follow the steps below to set up and start both the Flask backend and React Native frontend:

### Backend (Flask)

1. **Clone the Repository:**
   - Navigate to the folder where you'd like to clone the repository and run:
     ```bash
     git clone <your-repo-url>
     cd backend
     ```

2. **Set Up Virtual Environment:**
   - Create a virtual environment:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - macOS/Linux:
       ```bash
       source venv/bin/activate
       ```
     - Windows:
       ```bash
       venv\Scripts\activate
       ```

3. **Install Dependencies:**
   - Install the required dependencies listed in the `requirements.txt` file:
     ```bash
     pip install -r requirements.txt
     ```

4. **Start the Flask Server:**
   - Run the Flask development server:
     ```bash
     flask run
     ```

   The Flask server will be running at `http://127.0.0.1:5000`.

### Frontend (React Native with Expo)

1. **Install Node.js and npm:**
   - Ensure Node.js and npm are installed. You can download them from [Node.js Official Website](https://nodejs.org/).

2. **Install React Native CLI and Expo:**
   - Install Expo CLI globally by running:
     ```bash
     npm install -g expo-cli
     ```

3. **Navigate to the React Native App Folder:**
   - From the root directory, navigate to the `react-native-app` folder:
     ```bash
     cd react-native-app
     ```

4. **Install Node Dependencies:**
   - Install all the required npm dependencies:
     ```bash
     npm install
     ```

5. **Start the Expo Development Server:**
   - Start the Expo server:
     ```bash
     expo start
     ```

6. **Run the App on Your Device or Emulator:**
   - Use the Expo Go app to scan the QR code from your terminal or browser.
   - Alternatively, you can run the app on an iOS/Android emulator.

### AWS and Firebase Setup

1. **AWS S3 Setup:**
   - Ensure your AWS credentials are set up by running:
     ```bash
     aws configure
     ```
   - Confirm your Flask app is configured to handle S3 uploads.

2. **Firebase Authentication Setup:**
   - Set up Firebase authentication by following the [Firebase setup guide](https://firebase.google.com/docs/auth).
   - Ensure you have installed Firebase in the React Native app with:
     ```bash
     npm install --save @react-native-firebase/app @react-native-firebase/auth
     ```

Now you should have the backend Flask server running and the frontend React Native Expo app available for use.