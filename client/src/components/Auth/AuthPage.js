import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Button } from '@material-ui/core';
import Icon from './Icon';
import useStyles from './Styles';

function AuthPage() {  
    const classes=useStyles();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:"653087626307-gng3oocg58u6v0a8aippc4ulmkltj2dn.apps.googleusercontent.com",
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);



  const onSuccess = res => {
    console.log('SUCCESS', res);
    const result=res?.profileObj;
    const token=res?.tokenId;
    console.log(result)
    console.log(token)
  };
  const onFailure = response => {
    console.log('FAILED', response);
  };
  const onLogoutSuccess = () => {
    console.log('SUCESS LOG OUT');
  };

  return (
    <div>
      <GoogleLogin
        clientId={"653087626307-gng3oocg58u6v0a8aippc4ulmkltj2dn.apps.googleusercontent.com"}
        render={(renderProps) => (
            <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'>
                Google Sign In
            </Button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <GoogleLogout
        clientId={"653087626307-gng3oocg58u6v0a8aippc4ulmkltj2dn.apps.googleusercontent.com"}
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export default AuthPage;