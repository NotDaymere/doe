
import { useSearchParams } from "react-router-dom"
import { ContentHeader } from "../../components/ContentHeader/ContentHeader"
import { PersonalizationModel } from "../../components/PersonalizationModel/PersonalizationModel"
import { OptionType, PopupSelect } from "../../components/PopupSelect/PopupSelect"
import styles from "./ModelSettingsTab.module.less"
import { CreatePersona } from "./views/CreatePersona/CreatePersona"
import { useState } from "react"
import { FileWithId } from "../../components/UploadButton"

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
type PersonaType = {
	name: string
	id: string
	text: string
	files: FileWithId[]
}

export const ModelSettingsTab = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [personasList, setPersonasList] = useState<PersonaType[]>([
		{ files: [], id: crypto.randomUUID(), name: 'Persona 1', text: 'Persona 1 text' },
		{ files: [], id: crypto.randomUUID(), name: 'Persona 2', text: 'Persona 2 text' },
		{ files: [], id: crypto.randomUUID(), name: 'Persona 3', text: 'Persona 3 text' },
	])
	const handleNavigate = (action: 'edit' | 'create', type: 'persona' | 'style') => {
		searchParams.set('view', type)
		searchParams.set('action', action)
		setSearchParams(searchParams)
	}
	const handleSavePersona = (data: PersonaType) => setPersonasList(prev => ([...prev, data]))
	if (searchParams.has('view') && searchParams.has('action') && searchParams.get('view') === 'persona' && searchParams.get('action') === 'create') return <CreatePersona onSave={handleSavePersona} />
	// if (searchParams.has('view') && searchParams.has('action') && searchParams.get('view') === 'style' && searchParams.get('action') === 'create') return <CreatePersona />
	const deletePerson = (id: string) => setPersonasList(prev => prev.filter(persona => persona.id !== id))
	const getPersonasList = personasList.map(({ id, name }) => ({ value: id, label: name }))
	return (
		<div className={styles.modelSettings}>
			<ContentHeader>Model settings</ContentHeader>
			<div className={styles.modelSettings__container}>
				<div className={styles.modelSettings__content}>
					<div className={styles.modelSettings__content__item}>
						<p className={styles.modelSettings__content__item__text}>A written persona set for the model</p>
						<PopupSelect options={getPersonasList} value={PERSONA_OPTIONS[0].value} />
					</div>
					<div className={styles.modelSettings__content__item}>
						<p className={styles.modelSettings__content__item__text}>Writing style</p>
						<PopupSelect options={STYLE_OPTIONS} value={STYLE_OPTIONS[0].value} />
					</div>
					<div className={styles.personalization__wrapper}>
						<PersonalizationModel type="persona" list={getPersonasList} onDelete={deletePerson} onCreate={() => handleNavigate("create", "persona")} />
						<PersonalizationModel type="writing-style" list={STYLE_OPTIONS} onDelete={id => undefined} onCreate={() => handleNavigate("create", "style")} />
					</div>
				</div>
			</div>
		</div>
	)
}