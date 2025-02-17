'use client';
import React, { ReactNode } from 'react';
import Footer from '../footer';
import style from './login-layout.module.css';

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className={style.LayoutContainer}>
      {children}
      <Footer footerAlignment="center" />
    </div>
  );
};

export default LoginLayout;
