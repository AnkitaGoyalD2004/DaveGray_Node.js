const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));
console.log(uuid());
console.log();
