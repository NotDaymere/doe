export interface Profile {
    id: number;
    username: string;
    email: string;
    imgSrc: string | null;
    isCurrent: boolean;
    lang: string;
}
