export const getLaunchApi = `https://api.spacexdata.com/v3/launches`;
export const getWikiPost = (title) =>
  `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=2&format=json&exintro=&titles=${title}`;
