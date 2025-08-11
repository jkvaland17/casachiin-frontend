const convertBase64ToFile = (base64: string, filename: string): File => {
  const [metadata, base64String] = base64.split(",");

  const mimeType = metadata.match(/:(.*?);/)?.[1];
  if (!mimeType) {
    throw new Error("Invalid base64 string");
  }

  const byteCharacters = atob(base64String);

  const byteArrays: Uint8Array[] = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  const file = new Blob(byteArrays, { type: mimeType });
  return new File([file], filename, { type: mimeType });
};

export default convertBase64ToFile;
