import { embedTexts } from './embeddings.mjs';

function cosineSimilarity(a, b) {
  if (a.length === 0 || a.length !== b.length) {
    throw new Error('Die Embeddings haben ungültige Dimensionen.');
  }

  let dotProduct = 0;
  let lengthA = 0;
  let lengthB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    lengthA += a[i] * a[i];
    lengthB += b[i] * b[i];
  }

  const denominator = Math.sqrt(lengthA) * Math.sqrt(lengthB);

  return denominator === 0 ? 0 : dotProduct / denominator;
}

export async function createIndex(chunks) {
  const vectors = await embedTexts(chunks.map((chunk) => chunk.text));

  return chunks.map((chunk, index) => ({
    ...chunk,
    embedding: vectors[index],
  }));
}

export async function searchSemantic(question, index, limit = 3) {
  if (index.length === 0) {
    return [];
  }

  const [questionVector] = await embedTexts([question]);

  return index
    .map((chunk) => ({
      id: chunk.id,
      source: chunk.source,
      text: chunk.text,
      score: cosineSimilarity(questionVector, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);
}
