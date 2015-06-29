/*
  Modul Strings
  part of Arduino Mega Server project
*/

/* ----------------------------------------------
  Function StrClear(str, length)
    sets every element of str to 0 (clears array)
------------------------------------------------- */

void StrClear(char *str, char length) {
  for (int i = 0; i < length; i++) {
    str[i] = 0;
  }
}

/* ------------------------------------------------
  Function StrContains(str, sfind)
    searches for the string sfind in the string str
    returns 1 if string found
    returns 0 if string not found
--------------------------------------------------- */  

char StrContains(char *str, char *sfind) {
  char found = 0;
  char index = 0;
  char len;

  len = strlen(str);
  if (strlen(sfind) > len) {return 0;}
  
  while (index < len) {
    if (str[index] == sfind[found]) {
      found++;
      if (strlen(sfind) == found) {return 1;}
    } else {
        found = 0;
      }
    index++;
  }
  return 0;
}

