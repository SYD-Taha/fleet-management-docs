import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.gradient} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Final Year Project · University of Karachi · 2025</p>
        <h1 className={styles.title}>
          AI Powered Fleet Management <br />
          <span className={styles.accent}>and Visibility System</span>
        </h1>
        <p className={styles.lead}>
          A distributed microservices platform combining rule-based and machine-learning dispatch,
          real-time GPS tracking, and IoT integration for intelligent vehicle assignment.
        </p>
        <div className={styles.cta}>
          <Link className={styles.btnPrimary} to="/docs/intro">Read the documentation</Link>
          <Link className={styles.btnSecondary} to="/demo">Watch demo</Link>
          <Link className={styles.btnGhost} to="/download">Download PDF</Link>
        </div>
      </div>
    </header>
  );
}
