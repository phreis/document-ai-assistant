const embeddingModel = 'embeddinggemma';

export async function embedTexts(texts) {
  if (texts.length === 0) {
    return [];
  }

  const response = await fetch('http://localhost:11434/api/embed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: embeddingModel,
      input: texts,
      truncate: false,
    }),
    signal: AbortSignal.timeout(180_000),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Embedding-Anfrage fehlgeschlagen (${response.status}): ${errorText}`,
    );
  }

  const result = await response.json();

  if (
    !Array.isArray(result.embeddings) ||
    result.embeddings.length !== texts.length
  ) {
    throw new Error('Unerwartete Anzahl von Embeddings erhalten.');
  }

  return result.embeddings;
}
