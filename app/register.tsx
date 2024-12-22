import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from 'expo-router';
import {app} from '../config/firebaseConfig'

const auth = getAuth(app);

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Use Expo Router's navigation

    const signupUser = async (user: { email: any; password: any; }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const userData = {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
            };

            Alert.alert('Success', 'Signup successful!');
            router.push('/about'); // Navigate to About page after signup
        } catch (error) {
            console.error("Error signing up", error);
            Alert.alert("Signup failed", "Please try again.");
        }
    };

    const onSubmit = async () => {
        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters.');
            return;
        }

        const newUser = { email, password };
        await signupUser(newUser);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <View style={styles.formControl}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
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
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                />
            </View>
            <TouchableOpacity
                style={[styles.button, password.length < 8 && styles.disabledButton]}
                onPress={onSubmit}
                disabled={password.length < 8}
            >
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <View style={styles.nav}>
                <Text>
                    Already a user?{' '}
                    <Text
                        style={styles.link}
                        onPress={() => router.push('/login')} // Navigate to login screen
                    >
                        Login
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formControl: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    warning: {
        fontSize: 12,
        color: 'red',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nav: {
        marginTop: 20,
        alignItems: 'center',
    },
    link: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
});
