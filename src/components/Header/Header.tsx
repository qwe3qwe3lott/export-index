import React, {useCallback} from 'react';
import styles from './Header.module.scss';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../assets/logo.webp';

type NavButton = {
	label: string,
	path: string
}

const Header: React.FC = () => {
	const navButtons: NavButton[] = [
		{label: 'About', path: '/'},
		{label: 'Authors', path: '/authors'},
		{label: 'Tables', path: '/tables'}
	];

	const getNavLinkClass = useCallback(({isActive}: { isActive: boolean }) => {
		return isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink;
	}, []);

	return (<header className={styles.header}>
		<Link to={'/'} className={styles.logo}>
			<img alt="logo" src={logo} className={styles.logoImage}/>
			<h1 className={styles.logoTitle}>International Technological Specialization Index</h1>
		</Link>
		<nav className={styles.nav}>
			{navButtons.map((navButton) => (
				<NavLink key={navButton.label} className={getNavLinkClass} to={navButton.path}>
					<span className={styles.navLabel}>{navButton.label}</span>
					<span className={styles.navSpan}/>
				</NavLink>
			))}
		</nav>
	</header>);
};

export default Header;
