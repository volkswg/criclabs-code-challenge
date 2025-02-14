'use client';
import { Button, Form, Input, Alert } from 'antd';
import React, { useState } from 'react';

type FieldType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [form] = Form.useForm<FieldType>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onFinishHandler = (values: FieldType) => {
    console.log(values);
    setErrorMessage('');
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
