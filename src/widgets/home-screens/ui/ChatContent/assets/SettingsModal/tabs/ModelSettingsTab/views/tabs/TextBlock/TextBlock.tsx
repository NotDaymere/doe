import { ChangeEvent, useState } from "react";
import styles from "./TextBlock.module.less";
type TextBlockProps = {
    value?: string;
    onChange: (text: string) => void;
};
export const TextBlock = ({ onChange, value }: TextBlockProps) => {
    const [inputValue, setInputValue] = useState(value ?? "");
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setInputValue(text);
        onChange(text);
    };
    return (
        <div className={styles.textarea__wrapper}>
            <textarea
                className={styles.tabTextarea}
                value={inputValue}
                onChange={handleChange}
                placeholder="To create a compelling persona, consider several steps, like defining purpose and target audience, choose name, voice and tone etc."
            />
        </div>
    );
};
