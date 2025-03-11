export function convertToSerializeableObject(leanDocument) {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString)
      leanDocument[key] = leanDocument[key].toString();
  }
  return leanDocument;
  // return JSON.parse(JSON.stringify(leanDocument));
}
