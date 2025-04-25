import { SmileIcon } from "src/shared/icons/SmileIcon"
import { PenIcon } from "src/shared/icons/PenIcon"
import TrashIcon from "src/shared/icons/Trash.icon"
import { MagicIcon } from "src/shared/icons/MagicIcon"
import { CrossIcon } from "src/shared/icons/CrossIcon"
import styles from './PersonalizationModel.module.less'
import clsx from "clsx"
import { WritingStyleIcon } from "src/shared/icons/WrittingStyleIcon"

type DataItemType = {
	label: string
	value: string
}

type PersonalizationModelProps = {
	type: 'persona' | 'writing-style'
	list: DataItemType[]
	onDelete: (id: string) => void
	onCreate: () => void
}

export const PersonalizationModel = ({ type, list, onCreate, onDelete }: PersonalizationModelProps) => {
	const isPersona = type === 'persona'
	return (
		<div className={styles.personalization__container}>
			<div className={styles.personalization__header}>
				<h3 className={styles.personalization__header__title}>{isPersona ? 'Persona' : 'Writing Style'}</h3>
				<div className={styles.personalization__header__icon}>{isPersona ? <SmileIcon /> : <WritingStyleIcon />}</div>
			</div>
			<div className={styles.personalization__content}>
				{!!list.length && <div>
					<h3 className={styles.personalization__content__title}>Your {isPersona ? 'Personas' : 'Writing Styles'}
					</h3>
					<div className={styles.personalization__list__wrapper}>
						<div className={styles.personalization__list__container}>
							{list.map(item => <button key={item.value} className={styles.personalization__list__item}>
								<p className={styles.personalization__list__item__name}>{item.label}</p>
								<div className={styles.personalization__list__item__controls}>
									<button className={styles.personalization__list__item__controlBtn}><PenIcon /></button>
									<button className={styles.personalization__list__item__controlBtn} onClick={() => onDelete(item.value)}><TrashIcon /></button>
								</div>
							</button>)}
						</div>
					</div>
				</div>}
				<button
					className={clsx(styles.personalization__createBtn,
						isPersona ?
							styles['personalization__createBtn--persona'] :
							styles['personalization__createBtn--style'])}
					onClick={onCreate}
				>
					<MagicIcon />Create {isPersona ? 'Persona' : 'Writing Style'}
					<div className={styles.personalization__createBtn__plusIconContainer}><CrossIcon /></div>
				</button>
			</div>
		</div>
	)
}