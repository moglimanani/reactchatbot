import { SetStateAction } from "react";

export interface Options {
    id?: number;
    message?: string;
}

export interface Metadata {
    question?: string;
    answer?: string;
    value: string;
    type?: string;
    options: Options[];
}

export interface ChatBubbleConstrutionProps {
    questions: Metadata[];
    step: number;
    showLoader: boolean;
    setShowLoader: React.Dispatch<SetStateAction<boolean>>;
    state: Metadata[];
}

export interface ChatBubbleProps {
    rightBubble?: boolean,
    question?: string
}