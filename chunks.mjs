export function createChunks(documents) {
  const chunks = [];

  for (const document of documents) {
    // Windows-Zeilenumbrüche vereinheitlichen.
    const normalizedText = document.text.replace(/\r\n/g, '\n');

    // An Leerzeilen in Absätze aufteilen.
    const paragraphs = normalizedText
      .split(/\n[ \t]*\n+/)
      .map((paragraph) => paragraph.trim())
      .filter((paragraph) => paragraph.length > 0);

    for (const [index, paragraph] of paragraphs.entries()) {
      chunks.push({
        id: `${document.name}#${index + 1}`,
        source: document.name,
        text: paragraph,
      });
    }
  }

  return chunks;
}
