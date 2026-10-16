import React from 'react';
import styles from './Hosts.module.css';
function Hosts() {
  return (
    <section className={styles.hostsSection} id="hosts">
      <h2 className={styles.title}>THE HOSTS</h2>
      <div className={styles.portraits}>
        <div className={styles.portrait}> <img src="/assets/9e7dbaa4-f976-4bac-b54e-cf1a4f835c7a_2.jpg" alt="Bride Sanya" className={styles.img} /> <p className={styles.name}>Sanya Aggarwal <br/> D/o Aggarwal Family</p> </div>
        <div className={styles.portrait}> <img src="/assets/8cf98440-c309-4a53-afce-775c6019bc88_2.jpg" alt="Groom Shobhit" className={styles.img} /> <p className={styles.name}>Shobhit Garg <br/> S/o Garg Family</p> </div>
      </div>
    </section>
  );
}
export default Hosts;
