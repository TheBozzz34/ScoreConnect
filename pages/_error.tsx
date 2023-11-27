import Head from 'next/head';
import React from 'react';
import '../styles/yorha.module.css';
import Script from 'next/script';
import NavBar from 'components/Navbar/Navbar';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-G3GH38QDFZ" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-G3GH38QDFZ');
        `}
      </Script>
      <div className="error-container">
        <NavBar />
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Looks like the information you seek is lost in the depths of the system.</p>
        <p>
          Return <a href="/">home</a> and try again?
        </p>
      </div>
    </>
  );
};

export default Custom404;
