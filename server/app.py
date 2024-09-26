from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from dotenv import load_dotenv
from awsUtils import upload_to_s3, get_videos_from_s3, delete_from_s3
import boto3
load_dotenv()

app = Flask(__name__)

CORS(app)

# route to upload video file to s3 in multipart and return presigned s3 url
@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    video_file = data['video']
    if not video_file:
        return jsonify({'error': 'No video file found'}), 400

    # Retrieve the user_id from request.form
    user_id = data['user_id']
    if not user_id:
        return jsonify({'error': 'No user ID provided'}), 400
    
    # decode video file from base64
    video_binary = base64.b64decode(video_file)
    file_name = data['file_name']
    upload_to_s3(video_binary, user_id, file_name)

    print(f'video_file: {video_file[:40]}, user_id: {user_id}')
    return jsonify({'message': 'upload successful'}), 200

# route to delete video file from s3
@app.route('/delete', methods=['POST'])
def delete():
    # get video file name and user id from request and handle errors
    data = request.get_json()
    video_name = data['video_name']
    if not video_name:
        return jsonify({'error': 'No video name found'})
    user_id = data['user_id']
    if not user_id:
        return jsonify({'error': 'No user id found'})
    
    # delete video file from s3
    delete_from_s3(video_name, user_id)

    return jsonify({'message': f'Video {video_name} deleted'})

# route to get all videos for a certain user
@app.route('/videos', methods=['POST'])
def get_videos():
    data = request.get_json()
    user_id = data['user_id']
    if not user_id:
        return jsonify({'error': 'No user id found'})

    # get all videos for a certain user from dynamodb
    videos = get_videos_from_s3(user_id)

    return jsonify({'videos': videos})

if __name__ == '__main__':
    app.run()