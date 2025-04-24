import { ContentHeader } from "../../components/ContentHeader/ContentHeader"
import { OptionType, PopupSelect } from "../../components/PopupSelect/PopupSelect"
import styles from "./ModelSettingsTab.module.less"
const PERSONA_OPTIONS: OptionType[] = [
	{
		label: "Persona 1",
		value: crypto.randomUUID(),
	},
	{
		label: "Persona 2",
		value: crypto.randomUUID(),
	},
	{
		label: "Persona 3",
		value: crypto.randomUUID(),
	},
]
const STYLE_OPTIONS: OptionType[] = [
	{
		label: "Style 1",
		value: crypto.randomUUID(),
	},
	{
		label: "Style 2",
		value: crypto.randomUUID(),
	},
	{
		label: "Style 3",
		value: crypto.randomUUID(),
	},
]

export const ModelSettingsTab = () => {
	return (
		<div className={styles.modelSettings}>
			<ContentHeader>Model settings</ContentHeader>
			<div className={styles.modelSettings__container}>
				<div className={styles.modelSettings__content}>
					<div className={styles.modelSettings__content__item}>
						<p className={styles.modelSettings__content__item__text}>A written persona set for the model</p>
						<PopupSelect options={PERSONA_OPTIONS} value={PERSONA_OPTIONS[0].value} />
					</div>
					<div className={styles.modelSettings__content__item}>
						<p className={styles.modelSettings__content__item__text}>Writing style</p>
						<PopupSelect options={STYLE_OPTIONS} value={STYLE_OPTIONS[0].value} />
					</div>
				</div>
			</div>
		</div>
	)
}