import { Amplify, Auth } from 'aws-amplify';

const awsConfig = {
  Auth: {
    // Amazon Cognito User Pool ID
    userPoolId: 'ap-south-1_p3Ax4AAf4', // Replace with your Cognito User Pool ID
    // Amazon Cognito Web Client ID
    userPoolWebClientId: '763kbchi8hhj014b65lafqj4ra', // Replace with your App Client ID
    region: 'ap-south-1', // Replace with your region
    // Optional: OAuth configuration
    oauth: {
      domain: 'https://ap-south-1p3ax4aaf4.auth.ap-south-1.amazoncognito.com', // Replace with your Cognito domain
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'https://your-app-url.com/', // Replace with your app URL
      redirectSignOut: 'https://your-app-url.com/', // Replace with your app URL
      responseType: 'code'
    }
  }
};

Amplify.configure(awsConfig);

export default awsConfig;