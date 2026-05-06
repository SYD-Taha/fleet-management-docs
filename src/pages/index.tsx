import React from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import ChapterCard from '@site/src/components/ChapterCard';
import styles from './index.module.css';

const chapters = [
  { n: 1, title: 'Introduction',         desc: 'Problem context, motivation, project objectives.',           to: '/docs/intro' },
  { n: 2, title: 'Literature Review',    desc: 'Prior work in fleet dispatch and routing.',                  to: '/docs/literature-review' },
  { n: 3, title: 'System Description',   desc: 'Microservices architecture and data flow.',                  to: '/docs/system-description' },
  { n: 4, title: 'Hardware',             desc: 'ESP32/Arduino IoT devices and MQTT integration.',            to: '/docs/hardware' },
  { n: 5, title: 'Backend',              desc: 'Node.js/Express API, MongoDB, JWT auth.',                    to: '/docs/backend' },
  { n: 6, title: 'Frontend',             desc: 'React real-time dashboard with WebSocket updates.',          to: '/docs/frontend' },
  { n: 7, title: 'AI Engine',            desc: 'RandomForest model + weighted-scoring dispatch.',            to: '/docs/ai' },
  { n: 8, title: 'Vehicle Simulator',    desc: 'Hardware emulator for MQTT testing.',                        to: '/docs/vehicle-simulator' },
  { n: 9, title: 'Conclusions',          desc: 'Outcomes, limitations, and future work.',                    to: '/docs/conclusions' },
];

const team = [
  { name: 'Syed Taha Jameel', id: 'B20102169' },
  { name: 'Rimsha Masood',    id: 'B23110004008' },
  { name: 'Saman Aslam',      id: 'B23110004009' },
  { name: 'Zoya Ali',         id: 'B21110006168' },
];

export default function Home() {
  return (
    <Layout
      title="AI Powered Fleet Management"
      description="Final Year Project — Distributed microservices platform with intelligent dispatch, real-time GPS tracking, and IoT integration."
    >
      <Hero />

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.h2}>Documentation</h2>
          <p className={styles.sectionLead}>Nine chapters covering architecture, hardware, software, AI, and evaluation.</p>
          <div className={styles.grid}>
            {chapters.map((c) => (
              <ChapterCard key={c.n} number={c.n} title={c.title} description={c.desc} to={c.to} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Team</h2>
          <p className={styles.sectionLead}>
            Department of Computer Science, University of Karachi · Supervisor: Dr. Humera Tariq
          </p>
          <div className={styles.team}>
            {team.map((m) => (
              <div key={m.id} className={styles.teamCard}>
                <strong>{m.name}</strong>
                <span>{m.id}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
