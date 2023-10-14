const search = (docs, target) => {
  const term = target.match(/\w+/g);
  if (term == null) {
    return [];
  }

  return docs
    .filter(({ text }) => {
      const m = text.match(new RegExp(`\\b(${term[0]})\\b`));
      if (m == null) {
        return false;
      }
      return true;
    })
    .map(({ id }) => id);
};

export default search;
