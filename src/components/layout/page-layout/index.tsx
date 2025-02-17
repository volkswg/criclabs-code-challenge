'use client';
import React, { ReactNode, useState } from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import Header from '../header/header';
import style from './page-layout.module.css';
import Footer from '../footer';
import HomeIcon from '../../../../public/static/home-icon.svg';
import DataMappingIcon from '../../../../public/static/sub-menu-icon/data-mapping-icon.svg';

import GovernDocIcon from '../../../../public/static/sub-menu-icon/govern-doc-icon.svg';
import EmpAwareIcon from '../../../../public/static/sub-menu-icon/emp-aware-icon.svg';
import DataProcIcon from '../../../../public/static/sub-menu-icon/data-proc-icon.svg';
import SubjAccReqIcon from '../../../../public/static/sub-menu-icon/subj-acc-req-icon.svg';
import DataBreachRegisIcon from '../../../../public/static/sub-menu-icon/data-breach-regis-icon.svg';

const { Header: AntHeader, Content, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: 'data-mapping',
    label: 'Data Mapping',
    icon: <DataMappingIcon />,
  },
  {
    key: 'governance-document',
    label: 'Governance Document',
    icon: <GovernDocIcon />,
    disabled: true,
  },
  {
    key: 'employee-awareness',
    label: 'Employee Awareness',
    icon: <EmpAwareIcon />,
    disabled: true,
  },
  {
    key: 'data-processors',
    label: 'Data Processors',
    icon: <DataProcIcon />,
    disabled: true,
  },
  {
    key: 'subject-access-request',
    label: 'Subject Access Request',
    icon: <SubjAccReqIcon />,
    disabled: true,
  },
  {
    key: 'data-breach-register',
    label: 'Data breach register',
    icon: <DataBreachRegisIcon />,
    disabled: true,
  },
].map(({ label, icon, key, disabled }) => ({
  key,
  icon,
  label,
  style: { fontWeight: 500, display: 'flex', alignItems: 'center' },
  disabled,
}));

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const [selectedMenuKey, setSelectedMenuKey] =
    useState<string>('data-mapping');

  const changeMenuHandler: MenuProps['onSelect'] = (data) => {
    const key = data.key;
    setSelectedMenuKey(key);
  };

  return (
    <Layout className={style.PageLayoutContainer}>
      <Header />
      <AntHeader
        className={style.MobileSubMenu}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Menu
          className={style.MobileSubMenuItems}
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedMenuKey]}
          items={items}
          onSelect={changeMenuHandler}
        />
      </AntHeader>
      <Layout>
        <Sider width={288} className={style.DesktopSubMenu}>
          <Menu
            className={style.DesktopSubMenuItems}
            mode="inline"
            selectedKeys={[selectedMenuKey]}
            items={items}
            onSelect={changeMenuHandler}
          />
        </Sider>
        <Layout className={style.PageContentContainer}>
          <Breadcrumb
            items={[
              {
                title: (
                  <HomeIcon
                    width={16}
                    height={16}
                    style={{ verticalAlign: 'text-bottom' }}
                  />
                ),
              },
              { title: 'Data Mapping' },
            ]}
            style={{ marginBottom: 8 }}
          />
          <Content>{children}</Content>
        </Layout>
      </Layout>
      <div style={{ padding: '0 24px' }}>
        <Footer footerAlignment="left" />
      </div>
    </Layout>
  );
};

export default PageLayout;
