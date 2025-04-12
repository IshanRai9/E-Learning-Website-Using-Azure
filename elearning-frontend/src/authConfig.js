import { Amplify } from 'aws-amplify';

const awsConfig = {
  Auth: {
    // Amazon Cognito User Pool ID
    userPoolId: 'ap-south-1_p3Ax4AAf4', // Replace with your Cognito User Pool ID
    // Amazon Cognito Web Client ID
    userPoolWebClientId: '763kbchi8hhj014b65lafqj4ra', // Replace with your App Client ID
    region: 'ap-south-1', // Replace with your region
    // Optional: OAuth configuration
    oauth: {
      domain: 'ap-south-1p3ax4aaf4.auth.ap-south-1.amazoncognito.com', // Remove the https:// prefix
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'https://ap-south-1p3ax4aaf4.auth.ap-south-1.amazoncognito.com/login?client_id=763kbchi8hhj014b65lafqj4ra&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd84l1y8p4kdic.cloudfront.net',
      redirectSignOut: 'http://elearning-cclab.s3-website.ap-south-1.amazonaws.com/',
      responseType: 'code'
    }
  }
};

Amplify.configure(awsConfig);

export default awsConfig;