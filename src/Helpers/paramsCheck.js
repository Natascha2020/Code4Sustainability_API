// Checking input value of client request

const paramsCheck = ([arrayOfParams]) => {
  let param = true;
  for (let param of arrayOfParams) {
    if (!param || param === "") {
      param = false;
      console.log("Params");
      break;
    }
  }
  return param;
};

module.exports = paramsCheck;
