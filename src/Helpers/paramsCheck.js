// Checking input value of client request

const paramsCheck = ([arrayOfParams]) => {
  let params = true;
  for (let param of arrayOfParams) {
    if (!param || param === "") {
      params = false;
      console.log(param);
      break;
    }
  }
  return params;
};
module.exports = paramsCheck;
