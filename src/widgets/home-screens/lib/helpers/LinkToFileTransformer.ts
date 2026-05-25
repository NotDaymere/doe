export interface FileWithId extends File {
    id: string;
}

export async function extractFilesFromLinks(
    dataTransferItems: DataTransferItemList
): Promise<FileWithId[]> {
    const filesWithId: FileWithId[] = [];

    const linkItems = Array.from(dataTransferItems).filter(
        (item) => item.kind === "string" && item.type === "text/uri-list"
    );

    for (const item of linkItems) {

        const url = await new Promise<string>((resolve) =>
            item.getAsString(resolve)
        );

        if (/^https?:\/\//i.test(url)) {
            let fileName = "unknown";
            try {
                const urlObj = new URL(url);

                fileName = urlObj.href || fileName;
            } catch {

            }

            let blob: Blob;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Non-200 status: ${response.status}`);
                }
                blob = await response.blob();
            } catch (error) {
                console.error(
                    "Failed to fetch content from the link (possibly a CORS issue).",
                    error
                );

                blob = new Blob(
                    [`Failed to fetch actual content from the link:\n${url}`],
                    { type: "text/plain" }
                );
            }

            const fileWithId = Object.assign(
                new File([blob], fileName, { type: blob.type }),
                { id: `${Date.now()}-${Math.random()}` }
            ) as FileWithId;

            filesWithId.push(fileWithId);
        } else {
            console.log("Dropped a link that is not http/https:", url);
        }
    }

    return filesWithId;
}
