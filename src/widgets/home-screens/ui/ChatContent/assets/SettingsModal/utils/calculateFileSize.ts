export const calculateSize = (size: number) => {
    const bitesInKB = 1024;
    const bitesInMB = bitesInKB * 1024;
    const mb = size / bitesInMB;
    if (mb < 1) return mb.toFixed(2);
    return Math.round(mb);
};
