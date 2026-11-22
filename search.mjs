const stopWords = new Set([
  'der',
  'die',
  'das',
  'den',
  'dem',
  'des',
  'ein',
  'eine',
  'einer',
  'eines',
  'einem',
  'einen',
  'wer',
  'was',
  'wie',
  'wann',
  'wo',
  'welche',
  'welcher',
  'welches',
  'ist',
  'sind',
  'wird',
  'werden',
  'hat',
  'haben',
  'für',
  'von',
  'im',
  'in',
  'am',
  'an',
  'zum',
  'zur',
  'und',
  'oder',
  'bitte',
]);

function tokenize(text) {
  return text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
}

export function searchChunks(question, chunks, limit = 3) {
  const queryWords = [
    ...new Set(tokenize(question).filter((word) => !stopWords.has(word))),
  ];

  return chunks
    .map((chunk) => {
      const chunkWords = new Set(tokenize(chunk.text));

      const matchedWords = queryWords.filter((word) => chunkWords.has(word));

      return {
        ...chunk,
        score: matchedWords.length,
        matchedWords,
      };
    })
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);
}
