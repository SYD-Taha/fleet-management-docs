import React from 'react';
import Layout from '@theme/Layout';
import VideoEmbed from '@site/src/components/VideoEmbed';
import styles from './demo.module.css';

// TODO: replace with actual YouTube video ID once uploaded as Unlisted.
// E.g. for https://youtube.com/watch?v=dQw4w9WgXcQ → 'dQw4w9WgXcQ'
const YOUTUBE_ID: string | undefined = undefined;

export default function Demo() {
  return (
    <Layout title="Demo" description="Demonstration video for the AI Powered Fleet Management System">
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>System Demo</h1>
          <p>End-to-end walkthrough of the fleet management platform: real-time tracking, AI dispatch, and IoT integration.</p>
        </header>
        <VideoEmbed youtubeId={YOUTUBE_ID} title="Fleet Management Demo" />
      </main>
    </Layout>
  );
}
