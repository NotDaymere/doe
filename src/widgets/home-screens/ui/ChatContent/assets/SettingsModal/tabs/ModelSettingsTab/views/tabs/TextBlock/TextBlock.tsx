import { ChangeEvent, useState } from 'react';
import styles from './TextBlock.module.less'
type TextBlockProps = {
	onChange: (text: string) => void
}
export const TextBlock = ({ onChange }: TextBlockProps) => {
	const [value, setValue] = useState('');
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		setValue(text)
		onChange(text)
	}
	return <div className={styles.textarea__wrapper}><textarea className={styles.tabTextarea} value={value} onChange={handleChange} placeholder='To create a compelling persona, consider several steps, like defining purpose and target audience, choose name, voice and tone etc.' /></div>
}