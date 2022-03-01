export function parseArrObj(obj: any, id: number) {
  let parseObj = JSON.parse(JSON.stringify(obj));

  parseObj.forEach((object) => {
    object.postId = Number(id);
  });

  return parseObj;
}
