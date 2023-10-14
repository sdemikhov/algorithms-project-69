const search = (docs, target) => {
  const termResult = target.match(/\w+/g);
  if (termResult == null) {
    return [];
  }
  const [term] = termResult;
  return docs
    .reduce((acc, doc) => {
      const targetResult = doc.text.matchAll(new RegExp(`\\b(${term})\\b`, 'g'));
      const match = [...targetResult];
      if (match.length === 0) {
        return acc;
      }
      return [...acc, { ...doc, matchLength: match.length }];
    }, [])
    .sort((doc1, doc2) => doc2.matchLength - doc1.matchLength)
    .map(({ id }) => id);
};

export default search;
