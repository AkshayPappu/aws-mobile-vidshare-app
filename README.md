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