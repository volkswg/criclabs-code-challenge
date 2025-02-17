'use client';
import React, { ReactNode } from 'react';

import LoginLayout from './login-layout';
import PageLayout from './page-layout';

interface LayoutProps {
  layoutType?: 'login' | 'other';
  children: ReactNode;
}

const CustomLayout = ({ layoutType = 'other', children }: LayoutProps) => {
  const SelectedLayout = layoutType === 'login' ? LoginLayout : PageLayout;
  return <SelectedLayout>{children}</SelectedLayout>;
};

export default CustomLayout;
