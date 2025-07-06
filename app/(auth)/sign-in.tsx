import { View, Text, Button, Alert } from "react-native";
import * as Sentry from "@sentry/react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;
    if (!form.email || !form.password)
      Alert.alert("Error", "Please enter a valid email and password ");
    
    setIsSubmitting(true);

    try {
      await signIn({email, password})
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        keyboardType="email-address"
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />
      <View className="flex justify-center mt-5 flex-row gap-3">
        <Text className="base-regular txext-gray-100">
          Dont't have an account?{" "}
        </Text>
        <Link href="/sign-up" className="text-primary base-bold">
          {" "}
          Sign Up{" "}
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
