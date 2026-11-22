import { readFile, readdir } from 'node:fs/promises';
import { createChunks } from './chunks.mjs';

export async function loadDocuments(directoryUrl) {
  const entries = await readdir(directoryUrl, {
    withFileTypes: true,
  });

  const fileNames = entries
    .filter(
      (entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.txt'),
    )
    .map((entry) => entry.name)
    .sort();

  if (fileNames.length === 0) {
    throw new Error('Im Dokumentordner wurden keine Textdateien gefunden.');
  }

  const documents = [];

  for (const fileName of fileNames) {
    const fileUrl = new URL(encodeURIComponent(fileName), directoryUrl);
    const text = await readFile(fileUrl, 'utf8');

    documents.push({
      name: fileName,
      text,
    });
  }
  const chunks = createChunks(documents);

  console.log(`\n${chunks.length} Abschnitte erstellt:`);

  for (const chunk of chunks) {
    console.log(`\n[${chunk.id}]`);
    console.log(chunk.text);
  }
  return documents;
}

export function formatDocuments(documents) {
  return documents
    .map(
      (document) => `DATEI: ${document.name}\n${document.text}\nENDE DER DATEI`,
    )
    .join('\n\n');
}
