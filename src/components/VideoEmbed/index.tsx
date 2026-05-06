import React from 'react';

interface Props {
  youtubeId?: string;
  title?: string;
}

export default function VideoEmbed({ youtubeId, title = 'Demo video' }: Props) {
  if (!youtubeId) {
    return (
      <div
        style={{
          aspectRatio: '16 / 9',
          display: 'grid',
          placeItems: 'center',
          background: 'var(--ifm-background-surface-color)',
          border: '1px dashed var(--ifm-color-emphasis-300)',
          borderRadius: '0.85rem',
          color: 'var(--ifm-color-emphasis-700)',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div>
          <strong>Demo video coming soon.</strong>
          <p style={{ margin: '0.5rem 0 0' }}>The video will be embedded here once published to YouTube.</p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '0.85rem', overflow: 'hidden' }}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
