import React from 'react';
import styles from './OffLinePage.module.scss';

const OffLinePage: React.FC = () => {
	return (<section className={styles.container}>
		<h2 className={styles.title}>You are not available to use this feature</h2>
		<p className={styles.message}>Make sure you are connected to the Internet</p>
	</section>);
};

export default OffLinePage;