import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Criclabs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                fontWeight: 500,
                lineHeight: 22,
                fontSize: 14,
              },
            },
            token: {
              colorPrimary: '#009540',
              controlOutline: 'none',
              colorErrorBg: '#F5222D14',
              colorErrorBorder: '#F5222D29',
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
