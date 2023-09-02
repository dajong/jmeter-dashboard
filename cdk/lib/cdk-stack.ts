import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Define the S3 bucket
    const bucket = s3.Bucket.fromBucketName(this, 'jmeter-bucket', 'jmeter-test-015141923080');

    // Lambda function to list reports
    const listReportsFunction = new lambda.Function(this, 'ListReportsFunction', {
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset('./lambda/listReports'),
      handler: 'app.handler',
      environment: {
        BUCKET_NAME: bucket.bucketName
      },
    });
    console.log('bucketName: ' + bucket.bucketName)

    bucket.grantRead(listReportsFunction);

    // Lambda function to display report content
    const displayReportFunction = new lambda.Function(this, 'DisplayReportFunction', {
     runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset('./lambda/displayReport'),
      handler: 'app.handler',
      environment: {
        BUCKET_NAME: bucket.bucketName
      },
    });

    bucket.grantRead(displayReportFunction);

    // Define the API Gateway with Lambda integrations
    const api = new apigateway.RestApi(this, 'JMeterReportApi', {
      restApiName: 'JMeter Report Service',
      description: 'Service to list and display JMeter reports.',
    });

    const listReportsIntegration = new apigateway.LambdaIntegration(listReportsFunction);
    api.root.addMethod('GET', listReportsIntegration);  // e.g., GET /

    const displayReportIntegration = new apigateway.LambdaIntegration(displayReportFunction);
    const reportResource = api.root.addResource('{reportKey}');
    reportResource.addMethod('GET', displayReportIntegration);  // e.g., GET /{reportKey}
  }
}
