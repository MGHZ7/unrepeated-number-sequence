const ExcelJS = require("exceljs");
const fs = require("fs");

module.exports = class ExcelHandler {
    static createWorkbook = () => {
        return new ExcelJS.Workbook();
    };

    static counter = 0;

    workbook = null;

    fileStream = null;

    counter = 0;

    constructor() {
        this.workbook = ExcelHandler.createWorkbook();
        this.counter = ExcelHandler.counter++;
        this.fileStream = fs.createWriteStream(
            `${__dirname}/excel/file-of-${this.length}-${this.counter}.xlsx`
        );
    }

    addWorksheet = (name) => {
        this.workbook.addWorksheet(name);
    };

    getWorksheet = (name) => {
        return this.workbook.getWorksheet(name);
    };

    addRow = (row, workSheetName) => {
        this.getWorksheet(workSheetName).addRow(row);
    };

    addRows = (rows, workSheetName) => {
        this.getWorksheet(workSheetName).addRows(rows);
    };

    getRows = (worksheetName) => {
        this.getWorksheet(worksheetName).getRows();
    };

    saveFile = async(filename) => {
        await this.workbook.csv.writeFile(`${__dirname}/excel/file.xlsx`);
    };

    writeToFileStream = async() => {
        await this.workbook.xlsx.write(this.fileStream);
    };

    writeToNewFileStream = async() => {
        await this.workbook.xlsx.write(
            fs.createWriteStream(`${__dirname}/excel/file-of-4-${this.counter}.xlsx`)
        );
    };
};