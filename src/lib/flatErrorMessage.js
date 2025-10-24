export const flatErrorMessage = (data) => {
  let topMessage = '';

  if (typeof data.message === 'string') {
    topMessage = data.message;
  }

  function recurse(current) {
    for (const val of Object.values(current)) {
      if (val && typeof val === 'object') {
        if ('message' in val && typeof val.message === 'string') {
          topMessage = val.message;
        }
        recurse(val);
      }
    }
  }

  recurse(data);
  return { message: topMessage };
};
