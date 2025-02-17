'use client';
import React from 'react';
import style from './header.module.css';
import Image from 'next/image';

const Header = () => {
  return (
    <div className={style.HeaderContainer}>
      <Image
        src="/static/logo/criclabs-challenge-logo.svg"
        alt="criclabs challenge logo"
        width={40}
        height={40}
      />

      {/* <Dropdown menu={{ items: [] }} trigger={['click']}>
        <a
          onClick={(e) => e.preventDefault()}
          style={{
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '24px',
            margin: 'auto 0',
            color: '#000000D9',
          }}
        >
          <Space>
            PDPA / International School
            <DownOutlined />
          </Space>
        </a>
      </Dropdown> */}

      <div
        style={{
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '24px',
          margin: 'auto 0',
          color: '#000000D9',
        }}
      >
        <span>PDPA / International School </span>
        <span style={{ marginLeft: 8 }}>
          <Image
            width={10}
            height={10}
            src="/static/chevron-down.svg"
            alt="chevron down"
          />
        </span>
      </div>
      <div
        style={{
          width: 32,
          height: 32,
          backgroundColor: 'lightblue',
          margin: 'auto 0 auto auto',
          borderRadius: '50%',
          border: '1px solid #0000000F',
        }}
      ></div>
    </div>
  );
};

export default Header;
