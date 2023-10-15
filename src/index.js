const getMatchStats = (match) =>
  match.reduce(
    (acc, m) => {
      const stored = acc.items[m];
      if (stored) {
        return acc;
      }
      return {
        items: { ...acc.items, [m]: true },
        count: acc.count + 1,
      };
    },
    { count: 0, items: {} },
  );

const search = (docs, target) => {
  const terms = target.match(/\w+/g);
  if (terms == null) {
    return [];
  }

  return docs
    .reduce((acc, doc) => {
      const match = doc.text.match(new RegExp(`\\b(${terms.join('|')})\\b`, 'g'));
      if (match == null) {
        return acc;
      }
      const uniqueMatch = getMatchStats(match);
      return [...acc, { ...doc, allMatchCount: match.length, uniqueMatchCount: uniqueMatch.count }];
    }, [])
    .sort((doc1, doc2) => {
      const uniqueMatchCountDiff = doc2.uniqueMatchCount - doc1.uniqueMatchCount;
      if (uniqueMatchCountDiff === 0) {
        return doc2.allMatchCount - doc1.allMatchCount;
      }
      return uniqueMatchCountDiff;
    })
    .map(({ id }) => id);
};

export default search;
