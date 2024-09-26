import boto3
from io import BytesIO

def upload_to_s3(video_file, user_id, file_name, bucket_name='videosharingapp'):
    try:
        # error handling
        if not video_file:
            print('no video file')
            return False
        if not user_id:
            return False

        s3 = boto3.client('s3')

        video_file_obj = BytesIO(video_file)

        # upload video file to s3 with multipart upload
        # s3.upload_fileobj(video_file_obj, bucket_name, f'{user_id}/{file_name}', ExtraArgs={'ContentType': 'video/mp4', 'ACL': 'public-read'})
        s3.put_object(Bucket=bucket_name, Key=f'{user_id}/{file_name}', Body=video_file_obj, ContentType='video/mp4', ACL='public-read')

        # get presigned s3 url
        # try:
        #     s3_url = s3.generate_presigned_url('get_object', Params={'Bucket': bucket_name, 'Key': f'{user_id}/{file_name}'}, ExpiresIn=3600)
        #     return s3_url
        # except Exception as e:
        #     return None
        return True

    except Exception as e:
        return None

def delete_from_s3(video_name, user_id, bucket_name='videosharingapp'):
    try:
        s3 = boto3.client('s3')

        # delete video file from s3
        s3.delete_object(Bucket=bucket_name, Key=f'{user_id}/{video_name}')

    except Exception as e:
        return None
    
def get_videos_from_s3(user_id, bucket_name='videosharingapp'):
    try:
        s3 = boto3.client('s3')
        # get all videos for a certain user from s3
        videos = []
        
        # Get the list of objects for the user
        for video in s3.list_objects(Bucket=bucket_name, Prefix=f'{user_id}/', Delimiter='/')['Contents']:
            key = video['Key']

            # Generate presigned URL for each video
            try:
                video_url = s3.generate_presigned_url('get_object', Params={'Bucket': bucket_name, 'Key': key}, ExpiresIn=3600)
                videos.append((key.split('/')[-1], video_url))
            except Exception as e:
                continue

        return videos

    except Exception as e:
        return []