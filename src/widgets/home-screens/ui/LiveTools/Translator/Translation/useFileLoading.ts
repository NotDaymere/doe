import { useEffect, useState } from "react";

const LOADING_FILE_DURATION = 20000;

export const useFileLoading = (
    translateFromImage: boolean,
    onImageLoaded: (value: boolean) => void,
    dragTarget: boolean,
    multipleFilesAllowed = true
) => {
    const [progress, setProgress] = useState(0);
    const [isUploadFiles, setIsUploadFiles] = useState(false);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    useEffect(() => {
        if (dragTarget) {
            setIsUploadFiles(true);
            setIsUploadFiles(true);
            onImageLoaded(false);
        }
    }, [dragTarget]);

    useEffect(() => {
        return () => {
            setIsUploadFiles(false);
            setIsUploadingFile(false);
            onImageLoaded(false);
        };
    }, []);

    useEffect(() => {
        if (translateFromImage) {
            setIsUploadFiles(false);
        }
    }, [translateFromImage]);

    const simulateFileUpload = (duration: number) => {
        return new Promise<void>((resolve) => {
            let currentProgress = 0;
            const updateInterval = 100; // раз в 100 мс
            const totalSteps = duration / updateInterval;
            const step = 100 / totalSteps;

            const interval = setInterval(() => {
                currentProgress += step;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    setProgress(100);
                    clearInterval(interval);
                    resolve();
                } else {
                    setProgress(Math.round(currentProgress));
                }
            }, updateInterval);
        });
    };

    const resetProgress = () => {
        return new Promise<void>((resolve) => {
            setProgress(100);
            setTimeout(() => {
                setProgress(0);
                resolve();
            }, 1);
        });
    };

    const addFilesWithDelay = async (filesArray: File[], delay: number) => {
        setIsUploadingFile(true);
        setIsUploadFiles(true);

        const addNextFile = async () => {
            const currItem = filesArray.shift();
            if (!currItem) return;

            setCurrentFile(currItem);
            setProgress(0);

            await simulateFileUpload(LOADING_FILE_DURATION);

            setFiles((prevFiles) => [...prevFiles, currItem]);

            if (filesArray.length !== 0) {
                await resetProgress();
                await new Promise((resolve) => setTimeout(resolve, delay));
                await addNextFile();
            }
        };

        await addNextFile();
        setIsUploadingFile(false);
    };

    const uploadFiles = () => {
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.multiple = multipleFilesAllowed;
        input.onchange = (event: Event) => {
            const newFiles = Array.from((event.target as any)?.files) as File[];
            addFilesWithDelay(newFiles, 1000);
            input.remove();
        };
        input.click();
    };

    return {
        uploadFiles,
        progress,
        isUploadingFile,
        isUploadFiles,
        addFilesWithDelay,
        files,
        currentFile,
    };
};
