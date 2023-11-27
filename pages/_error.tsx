import Head from 'next/head';
import React from 'react';
import '../styles/yorha.module.css';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="error-container">
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
