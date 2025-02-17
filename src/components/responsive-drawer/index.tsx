'use client';
import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Drawer } from 'antd';
import style from './responsive-drawer.module.css';

interface ResponsiveDrawerPropsType {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
  title?: ReactNode;
  noPadding?: boolean;
}

const ResponsiveDrawer = ({
  open,
  onClose = () => {},
  children,
  title,
  noPadding = false,
}: ResponsiveDrawerPropsType) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  return (
    <Drawer
      open={open}
      className={style.DrawerContainer}
      closeIcon={null}
      placement={isMobile ? 'bottom' : 'right'}
      height={'calc(100% - var(--navBarHeight))'}
      onClose={onClose}
      title={title}
    >
      <div
        className={[
          style.ContentContainer,
          noPadding ? style.NoPadding : null,
        ].join(' ')}
      >
        {children}
      </div>
    </Drawer>
  );
};

export default ResponsiveDrawer;
