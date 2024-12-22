import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../config/firebaseConfig'; 

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const loginUser = async (email:any, password:any) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'Logged in successfully!');
            router.push('/about'); // Navigate to the Home screen after login
        } catch (error:any) {
            console.error("Error logging in", error.message);
            Alert.alert('Login Error', error.message);
        }
    };

    const onSubmit = () => {
        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long.');
            return;
        }

        loginUser(email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.formControl}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.formControl}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Password</Text>
                    <Text style={styles.warning}>(min 8 characters)</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>
            <Button
                title="Login"
                onPress={onSubmit}
                color="#6200ee"
                disabled={password.length < 8}
            />
            <View style={styles.flexContainer}>
                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.linkText}>
                        Not a user? <Text style={styles.link}>Signup</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    formControl: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    warning: {
        fontSize: 12,
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    flexContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        fontSize: 14,
        color: '#000',
    },
    link: {
        color: '#6200ee',
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: 10,
    },
});

export default LoginScreen;
