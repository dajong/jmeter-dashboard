import json
import boto3
import os

s3 = boto3.client('s3')
BUCKET_NAME = os.environ['BUCKET_NAME']

def handler(event, context):
    try:
        prefix = 'jmeter-reports/'
        # response = s3.list_objects_v2(Bucket=BUCKET_NAME, Prefix=prefix)

        # List the objects in the bucket
        response = s3.list_objects_v2(Bucket=BUCKET_NAME, Prefix=prefix, Delimiter='/')
        
        # Extract the keys from the list
        folder_names = [folder['Prefix'].split('/')[-2] for folder in response.get('CommonPrefixes', [])]

        return {
            'statusCode': 200,
            'body': json.dumps(folder_names),
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
        }