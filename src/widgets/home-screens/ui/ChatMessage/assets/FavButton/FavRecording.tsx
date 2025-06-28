import React from "react";
import { useChatStore } from "../../../../../../shared/providers";
import Favorite from "./Favorite";
import { IRecording } from "../../../../../../shared/types/Recording";

interface FavButtonProps {
    recording: IRecording;
    className?: string;
}

export const FavRecording = ({recording, className}: FavButtonProps) => {
    const { savedRecordings, addRecording, deleteRecording } = useChatStore();

    const isLiked = savedRecordings.some(b => b.id === recording.id);
    const handleLike = () => {
        if (isLiked) {
            deleteRecording(recording.id)
        } else {
            addRecording(recording)
        }
    };

    return (
        <Favorite onClick={handleLike} isLiked={isLiked} className={className} />
    );
}