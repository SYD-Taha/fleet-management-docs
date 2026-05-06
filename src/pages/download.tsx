import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './download.module.css';

export default function Download() {
  const pdfUrl = useBaseUrl('/pdf/fleet-management-thesis.pdf');
  return (
    <Layout title="Download" description="Download the thesis PDF">
      <main className={styles.main}>
        <h1>Download</h1>
        <p>The full thesis is available as a PDF for offline reading.</p>
        <div className={styles.card}>
          <div>
            <strong>AI Powered Fleet Management and Visibility System</strong>
            <p className={styles.meta}>Final Year Project · University of Karachi · December 2025</p>
          </div>
          <a className={styles.btn} href={pdfUrl} download>Download PDF</a>
        </div>
      </main>
    </Layout>
  );
}
