import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface Props {
  title: string;
  description: string;
  to: string;
  number: number;
}

export default function ChapterCard({ title, description, to, number }: Props) {
  return (
    <Link to={to} className={styles.card}>
      <span className={styles.number}>{number.toString().padStart(2, '0')}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      <span className={styles.arrow}>→</span>
    </Link>
  );
}
