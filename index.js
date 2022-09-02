const SequenceGenerator = require("./src/generate-sequence");
const ExcelHandler = require("./src/excel-handler");

const tasks = [];
const sequenceOf4Generator = new SequenceGenerator(5, 1, 50);

const generation1 = sequenceOf4Generator.generate();
generation1
    .then(() => {
        const sheetName = "5 Numbers";
        const result = sequenceOf4Generator.result;

        console.log(result.length);

        const writeHandler = handleResult(result, sheetName);
        return writeHandler;
    })
    .then((promise) => {
        console.log("After write");
    });

async function handleResult(result, sheetName) {
    const tasks = [];
    while (result.length) {
        const excelHandler = new ExcelHandler();
        excelHandler.addWorksheet(sheetName);
        excelHandler.addRows(result.splice(0, 200000));
        await excelHandler.writeToFileStream();
        console.log("Write file");
    }
}