// Canonical game key mapping to unify different naming styles across UI, tests, analytics.

export const GAME_KEY_MAP = {
  rsvp: ['rsvp'],
  schulte: ['schulte', 'schulte_table'],
  twinwords: ['twin_words', 'twinwords'],
  parimpar: ['par_impar', 'parimpar'],
  memorydigits: ['memory_digits', 'memorydigits'],
  runningwords: ['running_words', 'runningwords'],
  lettersgrid: ['letters_grid', 'lettersgrid'],
  wordsearch: ['word_search', 'wordsearch'],
  anagrams: ['anagrams'],
};

const aliasToCanonical = Object.entries(GAME_KEY_MAP).reduce((acc, [canon, aliases]) => {
  aliases.forEach(a => acc[a] = canon);
  return acc;
}, {});

export function canonicalGameKey(key) {
  if (!key) return key;
  return aliasToCanonical[key] || key;
}
