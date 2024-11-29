function getFileLinksFromFolder() {
    // Customize these variables
    var folderId = "1F9j2HnHI1tOhcGBT-uzbRahwXLUxRgw9"; // Replace with your folder ID
    var sourceColumn = 1; // The column index (1 = A, 2 = B, etc.) where file names are stored
    var targetColumn = 2; // The column index (1 = A, 2 = B, etc.) where links will be pasted
  
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    
    var fileMap = {}; // Store file names and their URLs
    while (files.hasNext()) {
      var file = files.next();
      fileMap[file.getName()] = file.getUrl(); // Map file names to their URLs
    }
  
    var lastRow = sheet.getLastRow();
    for (var i = 2; i <= lastRow; i++) { // Start from row 2 (assuming row 1 has headers)
      var fileName = sheet.getRange(i, sourceColumn).getValue();
      if (fileName && fileMap[fileName]) {
        sheet.getRange(i, targetColumn).setValue(fileMap[fileName]); // Paste the link in the target column
      } else {
        sheet.getRange(i, targetColumn).setValue("File not found"); // Handle missing files
      }
    }
  }
  