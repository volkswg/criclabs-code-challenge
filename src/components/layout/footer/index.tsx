'use client';
import React from 'react';
import style from './footer.module.css';

interface FooterProps {
  footerAlignment?: 'center' | 'left' | 'right';
}

const Footer = ({ footerAlignment = 'center' }: FooterProps) => {
  const alignmentStyle =
    footerAlignment === 'center'
      ? style.Center
      : footerAlignment === 'right'
      ? style.Right
      : style.Left;
  return (
    <div className={[style.Footer, alignmentStyle].join(' ')}>© Criclabs</div>
  );
};

export default Footer;
