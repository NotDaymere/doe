import { ReactNode } from 'react';
import styles from './ContentHeader.module.less';

export const ContentHeader = ({ children }: { children: ReactNode }) => {
	return <div className={styles.contentHeader__container}>
		<h2 className={styles.contentHeader__title}>{children}</h2>
	</div >
}