import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({ onLogout }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setUser(token);
            } else {
                onLogout(); // Chama a função para voltar para a tela de login
            }
        };
        getUser();
    }, [onLogout]);

    return (
        <View style={styles.container}>
            {user ? (
                <Text style={styles.welcome}>Bem-vindo, {user}!</Text>
            ) : (
                <Text style={styles.error}>Usuário não autenticado.</Text>
            )}
            <Button title="Sair" onPress={onLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 24,
        marginBottom: 20,
    },
    error: {
        color: 'red',
    },
});

export default Welcome;
