const search = (docs, target) =>
  docs
    .filter(({ text }) => {
      // try to escapes user input to prevent regex syntax error
      const sanitized = target.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const m = text.match(new RegExp(`\\b(${sanitized})\\b`));
      if (m == null) {
        return false;
      }
      return true;
    })
    .map(({ id }) => id);

export default search;
