import React, { useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, View, Image, TouchableOpacity, Text, Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const clientId = '943881662621-48esuigroqddarn37q94u7jvqujsf6jh.apps.googleusercontent.com';
const EXPO_IP = process.env.EXPO_PUBLIC_BACKEND_URL || "localhost";

export default function GoogleLoginButton() {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      scopes: ['profile', 'email'],
      responseType: 'token',
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const accessToken = response.authentication.accessToken;

      fetch(`${EXPO_IP}/users/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.result) {
            Alert.alert('Connecté', `Token: ${data.token}`);
          } else {
            Alert.alert('Erreur', data.error || 'Connexion échouée');
          }
        })
        .catch(err => {
          console.error('Erreur réseau :', err);
          Alert.alert('Erreur', 'Problème de connexion au serveur');
        });
    }
  }, [response]);

  return (
    <TouchableOpacity style={styles.button} onPress={()=>promptAsync()} disabled={!request}>
      <View style={styles.content}>
        <Image source={require('../assets/google.png')} style={styles.icon} />
        <Text style={styles.text}>Se connecter avec Google</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: '#DDD',
    borderWidth: 1,
    shadowColor: '#2B3033',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 14,
  },
  text: {
    color: '#7E7E7E',
    fontSize: 16,
    fontWeight: '500',
  },
});