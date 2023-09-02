import json
import boto3
import os

s3 = boto3.client('s3')
BUCKET_NAME = os.environ['BUCKET_NAME']

def handler(event, context):
    try:
        report_key = event['pathParameters']['reportKey']

        file_obj = s3.get_object(Bucket=BUCKET_NAME, Key=report_key)
        file_content = file_obj['Body'].read().decode('utf-8')

        content_type = 'text/html'  # Default for .html files. Adjust based on file extensions (e.g., .js, .css, etc.)

        return {
            'statusCode': 200,
            'body': file_content,
            'headers': {
                'Content-Type': content_type,
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
        }