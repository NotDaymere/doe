export const shortFileName = (name: string, maxLength: number) => {
  const parts = name.split('.');

  if (parts.length < 2) {
    return name;
  }

  const ext = parts.pop();
  const baseName = parts.join('.');

  if (baseName.length > maxLength) {
    return `${baseName.substring(0, maxLength)}...${ext}`;
  }

  return name;
};