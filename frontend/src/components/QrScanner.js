import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner';

const QrScanner = ({ passData }) => {
  const [data, setData] = useState('');

  useEffect(() => {
    console.info(data);
    passData(data);
  }, [data, passData]);

  return (
    <>
      <QrReader
        delay={300}
        style={{ width: '100%' }}
        onError={(err) => {
          // keep previous behavior: log error silently
          // consumers can handle no-data case when `passData` receives empty string
          console.info(err);
        }}
        onScan={(result) => {
          if (result) setData(result);
        }}
      />
    </>
  );
};

export default QrScanner;