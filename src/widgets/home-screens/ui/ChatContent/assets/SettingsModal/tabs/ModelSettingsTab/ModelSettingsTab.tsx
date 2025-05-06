import { useSearchParams } from "react-router-dom";
import { ContentHeader } from "../../components/ContentHeader/ContentHeader";
import { PersonalizationModel } from "../../components/PersonalizationModel/PersonalizationModel";
import { OptionType, PopupSelect } from "../../components/PopupSelect/PopupSelect";
import styles from "./ModelSettingsTab.module.less";
import { CreatePersona } from "./views/CreatePersona/CreatePersona";
import { useState } from "react";
import { FileWithId } from "../../components/UploadButton";
import { CreateStyle } from "./views/CreateStyle/CreateStyle";
import { EditPersona } from "./views/EditPersona/EditPersona";
import { EditStyle } from "./views/EditStyle/EditStyle";
import { PazzleIcon } from "src/shared/icons/PazzleIcon";
import { SensOfSelf } from "./views/SensOfSelf/SensOfSelf";

type PersonaType = {
    name: string;
    id: string;
    text: string;
    files: FileWithId[];
};

export const ModelSettingsTab = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [personasList, setPersonasList] = useState<PersonaType[]>([
        { files: [], id: crypto.randomUUID(), name: "Persona 1", text: "Persona 1 text" },
        { files: [], id: crypto.randomUUID(), name: "Persona 2", text: "Persona 2 text" },
        { files: [], id: crypto.randomUUID(), name: "Persona 3", text: "Persona 3 text" },
    ]);
    const [stylesList, setStylesList] = useState<PersonaType[]>([
        { files: [], id: crypto.randomUUID(), name: "Style 1", text: "Style 1 text" },
        { files: [], id: crypto.randomUUID(), name: "Style 2", text: "Style 2 text" },
        { files: [], id: crypto.randomUUID(), name: "Style 3", text: "Style 3 text" },
    ]);
    const handleNavigate = (action: "edit" | "create", type: "persona" | "style", id?: string) => {
        searchParams.set("view", type);
        searchParams.set("action", action);
        if (action === "edit" && id) {
            searchParams.set(`${type}Id`, id);
        }
        setSearchParams(searchParams);
    };

    const handleNavigationToSenseOfSelf = () => {
        searchParams.set("view", "sensOfSelf");
        setSearchParams(searchParams);
    };

    const handleSavePersona = (data: PersonaType) => setPersonasList((prev) => [...prev, data]);
    const handleEditPersona = (data: PersonaType) =>
        setPersonasList((prev) => prev.map((pers) => (pers.id === data.id ? data : pers)));
    const deletePerson = (id: string) =>
        setPersonasList((prev) => prev.filter((persona) => persona.id !== id));
    const getPersonasList = personasList.map(({ id, name }) => ({ value: id, label: name }));
    const currentPersonaOpen = personasList.find(
        (persona) => persona.id === searchParams.get("personaId")
    );

    const handleSaveStyle = (data: PersonaType) => setStylesList((prev) => [...prev, data]);
    const handleEditStyle = (data: PersonaType) =>
        setStylesList((prev) => prev.map((style) => (style.id === data.id ? data : style)));
    const deleteStyle = (id: string) =>
        setStylesList((prev) => prev.filter((style) => style.id !== id));
    const getStylesList = stylesList.map(({ id, name }) => ({ value: id, label: name }));
    const currentStyleOpen = stylesList.find((style) => style.id === searchParams.get("styleId"));
    if (searchParams.get("view") === "persona" && searchParams.get("action") === "create")
        return <CreatePersona onSave={handleSavePersona} />;
    if (
        searchParams.get("view") === "persona" &&
        searchParams.get("action") === "edit" &&
        currentPersonaOpen
    ) {
        return <EditPersona onSave={handleEditPersona} persona={currentPersonaOpen} />;
    }
    if (searchParams.get("view") === "style" && searchParams.get("action") === "create")
        return <CreateStyle onSave={handleSaveStyle} />;
    if (
        searchParams.get("view") === "style" &&
        searchParams.get("action") === "edit" &&
        currentStyleOpen
    ) {
        return <EditStyle onSave={handleEditStyle} style={currentStyleOpen} />;
    }
    if (searchParams.get("view") === "sensOfSelf") {
        return <SensOfSelf />;
    }

    return (
        <div className={styles.modelSettings}>
            <ContentHeader>Model settings</ContentHeader>
            <div className={styles.modelSettings__container}>
                <div className={styles.modelSettings__content}>
                    <div className={styles.modelSettings__content__item}>
                        <p className={styles.modelSettings__content__item__text}>
                            A written persona set for the model
                        </p>
                        <PopupSelect options={getPersonasList} value={getPersonasList[0]?.value} />
                    </div>
                    <div className={styles.modelSettings__content__item}>
                        <p className={styles.modelSettings__content__item__text}>Writing style</p>
                        <PopupSelect options={getStylesList} value={getStylesList[0]?.value} />
                    </div>
                    <div className={styles.personalization__wrapper}>
                        <PersonalizationModel
                            type="persona"
                            list={getPersonasList}
                            onEdit={(id) => {
                                handleNavigate("edit", "persona", id);
                            }}
                            onDelete={deletePerson}
                            onCreate={() => handleNavigate("create", "persona")}
                        />
                        <PersonalizationModel
                            type="writing-style"
                            list={getStylesList}
                            onEdit={(id) => handleNavigate("edit", "style", id)}
                            onDelete={deleteStyle}
                            onCreate={() => handleNavigate("create", "style")}
                        />
                    </div>
                    <button
                        className={styles.modelSettings__content__SenseOfSelf}
                        onClick={() => handleNavigationToSenseOfSelf()}
                    >
                        <PazzleIcon />
                        <span>Sense of Self</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
