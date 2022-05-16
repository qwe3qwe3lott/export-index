import React from 'react';

import styles from './AuthorsPage.module.scss';
import kelvinWilloughby from '../../assets/KelvinWilloughby.webp';
import nadezhdaMullina from '../../assets/NadezhdaMullina.webp';

const AuthorsPage: React.FC = () => {
	return (<section>
		<h2 className={styles.title}>Authors of the theory</h2>
		<div className={styles.cards}>
			<div className={styles.card}>
				<img className={styles.cardImage} alt="Kelvin Willoughby" src={kelvinWilloughby}/>
				<h3 className={styles.cardTitle}>Professor Dr. Kelvin Willoughby</h3>
				<ul className={styles.cardList}>
					<li className={styles.cardListItem}>
						Holder of the Chair of Innovation Management und Entrepreneurship, HHL Leipzig Graduate School of Management, Leipzig, Germany
					</li>
					<li className={styles.cardListItem}>
						Doctor of Philosophy (Ph.D.) in Strategic Management and Technology Management, The University of Western Australia, Perth, Australia
					</li>
					<li className={styles.cardListItem}>Doctor of Philosophy (Ph.D.) in Technology Studies, Murdoch University, Perth, Australia</li>
				</ul>
				<p className={styles.cardText}>Prof. Kelvin Willoughby is an expert on the management of intellectual property, technology-based entrepreneurship, and
								strategic planning for technology-based industry development. He holds doctorates in both strategic management and technology studies, and a masters
								degree in intellectual property law. Professor Willoughby has extensive experience as a university professor, researcher and industry consultant in
								the United States, Europe, Asia, Australia and Russia.</p>
				<p>
					More information
					on <a className={styles.cardLink} href="https://kelvinwilloughby1.academia.edu" target="_blank" rel="noreferrer">https://kelvinwilloughby1.academia.edu</a>
				</p>
			</div>
			<div className={styles.card}>
				<img className={styles.cardImage} alt="Kelvin Willoughby" src={nadezhdaMullina}/>
				<h3 className={styles.cardTitle}>Doctorate candidate Nadezhda Mullina</h3>
				<ul className={styles.cardList}>
					<li className={styles.cardListItem}>PhD student at HHL Leipzig Graduate School of Management, Leipzig, Germany</li>
					<li className={styles.cardListItem}>
						Dissertation topic: Intellectual Property and International Pathways for Appropriating Value from Endogenous Technological Innovation
					</li>
					<li className={styles.cardListItem}>Master of Science in Organization of high-tech production and logistics systems</li>
					<li className={styles.cardListItem}>Bachelor in Innovations</li>
				</ul>
				<p>Contact by <span className={styles.cardLink}>nadezhda.mullina@hhl.de</span></p>
			</div>
		</div>
	</section>);
};

export default AuthorsPage;
