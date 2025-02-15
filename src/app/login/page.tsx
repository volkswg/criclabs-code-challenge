import React from 'react';
import style from './login-page.module.css';
import Image from 'next/image';
import { Metadata } from 'next';
import LoginForm from './login-form/login-form';
import LayoutWithFooter from '@/components/layout/layout-with-footer';

export const metadata: Metadata = {
  title: 'Criclabs - Login',
};

const LoginPage = () => {
  return (
    <LayoutWithFooter footerAlignment="center">
      <div className={style.PageContainer}>
        <div className={style.LoginPanel}>
          <div className={style.Logo}>
            <Image
              src="/static/logo/criclabs-challenge-logo.svg"
              alt="criclabs challenge logo"
              width={40}
              height={40}
            />
          </div>
          <div className={style.PanelTitle}>Sign in</div>
          <LoginForm />
        </div>
      </div>
    </LayoutWithFooter>
  );
};

export default LoginPage;
