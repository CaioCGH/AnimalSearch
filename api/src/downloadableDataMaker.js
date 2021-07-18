const ExcelJS = require('exceljs');

exports.makeSheet =  async (response, params, animalRows) =>{
  const selectedArray = params.selectedArray;
  const localities = params.localities;
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("inventário");
    var fileName = 'relatorio.xls';

    console.log(localities, selectedArray);
    columns = [];
    for(var i = 0; i < selectedArray.length; i++){
      columns.push(
        { header: selectedArray[i], key: selectedArray[i], width: (selectedArray[i].length + 5 )})
    }
    worksheet.columns = columns;
    var headerRow = worksheet.getRow(1);
    headerRow.fill = {
      type: 'pattern',
      pattern:'darkTrellis',
      fgColor:{argb:'FFFFFF00'},
      bgColor:{argb:'FF0000FF'}
    };
    for(var i = 0; i < animalRows.length; i++){
      worksheet.addRow(animalRows[i])
    }

    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    await workbook.xlsx.write(response);
    response.end();
}