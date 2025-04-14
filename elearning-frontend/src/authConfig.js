import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    // Amazon Cognito User Pool ID
    userPoolId: 'ap-south-1_p3Ax4AAf4', // Replace with your Cognito User Pool ID
    // Amazon Cognito Web Client ID
    userPoolWebClientId: '763kbchi8hhj014b65lafqj4ra', // Replace with your App Client ID
    region: 'ap-south-1', // Replace with your region
    // Configure Hosted UI
    oauth: {
      domain: 'ap-south-1p3ax4aaf4.auth.ap-south-1.amazoncognito.com',
      scope: ['email', 'openid', 'phone'],
      redirectSignIn: 'https://d9tn5d9nagzbs.cloudfront.net/',
      redirectSignOut: 'https://d9tn5d9nagzbs.cloudfront.net/',
      responseType: 'code'
    }
  }
};

Amplify.configure(awsConfig);

export default awsConfig;