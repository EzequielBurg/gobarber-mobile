import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';

import getValidationError from '../../utils/getValidationError';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToLogon, BackToLogonText } from './styles';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputref = useRef<TextInput>(null);
  const passwordInputref = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado!',
          'Você já pode fazer seu logon no GoBarber!',
        );

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationError(error);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro. Tente novamente',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logo} />
          <Title>Criar sua conta</Title>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => emailInputref.current?.focus()}
            />
            <Input
              ref={emailInputref}
              name="email"
              icon="mail"
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputref.current?.focus()}
            />
            <Input
              ref={passwordInputref}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>
        </Container>
      </ScrollView>

      <BackToLogon onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToLogonText>Voltar para logon</BackToLogonText>
      </BackToLogon>
    </>
  );
};

export default SignUp;
