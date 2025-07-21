import React from 'react';
import Link from 'next/link';
import styles from '@/styles/TimeMachine.module.css';

const portals = [
  {
    version: 'v1',
    url: 'https://v1.achrafkhamri.com',
    label: 'v1',
  },
  {
    version: 'v2',
    url: 'https://v2.achrafkhamri.com',
    label: 'v2',
  },
];

const TimeMachineModal = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <button className={styles.close_button} onClick={onClose} aria-label="Close modal">
        &times;
      </button>
      <div className={styles.container}>
        <main className={styles.portal_main}>
          <div className={styles.portal_div}></div>
          <div className={styles.portal_div}></div>
          <div className={styles.portal_div}></div>
          <div className={styles.portal_div}></div>
          <div className={styles.portal_div}></div>
        </main>

        <div className={styles.perspective}>
          <div className={styles.skew}>
            <h3 className={styles.perspective_heading}>Step into the portal</h3>
            <h3 className={styles.perspective_subheading}>For previous iterations of this website</h3>
            <div className={styles.portals}>
              {portals.map(({ version, url, label }) => (
                <Link href={url} key={version} legacyBehavior>
                  <a className={styles.portal} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`/${version}.jpg`}
                      alt={label}
                      className={styles.portal_img}
                    />
                    <div className={styles.portal_overlay}>
                      <span className={styles.portal_label}>{label}</span>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <a
        href="https://codepen.io/jasesmith/pen/qqgvZe"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.credit_link}
      >
        A Portal to Tomorrow by @ jasesmith
      </a>
    </div>
  );
};

export default TimeMachineModal; 