'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { Button, Form, Input, Alert } from 'antd';

type FieldType = {
  email: string;
  password: string;
};

type ErrorResponseType = {
  message: string;
};

const LoginForm = () => {
  const router = useRouter();
  const [form] = Form.useForm<FieldType>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onFinishHandler = async (values: FieldType) => {
    setErrorMessage('');
    try {
      await axios.post('/api/auth/v1/login', values);
      router.push('/');
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          const resPayload = err.response.data as ErrorResponseType;
          const errorMsg = resPayload.message;
          setErrorMessage(errorMsg);
        }
      }
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinishHandler}
      onFinishFailed={(a) => {
        const errorMsg = a.errorFields.at(0)?.errors[0];
        setErrorMessage(errorMsg || '');
      }}
      requiredMark={false}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email address is required.' },
          {
            type: 'email',
            message: 'Please enter a valid email address',
          },
        ]}
        help=""
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Password is required.' }]}
        help=""
      >
        <Input.Password visibilityToggle />
      </Form.Item>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          style={{
            color: '#F5222D',
            marginBottom: 24,
          }}
        />
      )}
      <Form.Item label={null} style={{ marginBottom: 0 }}>
        <Button block type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
