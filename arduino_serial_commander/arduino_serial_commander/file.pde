/*
  Modul File
  part of Arduino Serial Commander
  part of Arduino Mega Server project
*/

void loadLines() {
  lines = loadStrings(currentFile);  
}

void loadBinarys() {
  binarys = loadBytes(currentFile);
}

void reInit() {
  for (int i = 0; i < lines.length; i++) {
    lines[i] = "";
  }
  currentLine = 0;
  lines = loadStrings(currentFile);
  DONE = false;
}

void clearLines() {
  for (int i = 0; i < lines.length; i++) {
    lines[i] = "";
  }
  currentLine = 0;
}

void dialogOpenFile() {
  String loadPath = selectInput("Open file to upload");
  if (loadPath != null) {
    currentFile = loadPath;
    int lenPath = currentFile.length();
    if (lenPath > 12) {
      filePath = currentFile.substring(lenPath - 12, lenPath);
    } else {
        filePath = currentFile;
      }
    lenPath = filePath.length();
    int lenFile = filePath.indexOf("\\");
    filePath = filePath.substring(lenFile + 1, lenPath);     
    currentFile = filePath;
    reInit();
    loadBinarys();
  }
}  

