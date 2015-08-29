/*
  Modul Pages Maker
  part of Arduino Mega Server project
*/

File tempFile;

void insertBlock(uint8_t typeOperation, EthernetClient cl) {
  if (typeOperation == TYPE_LINKS) {
    if (modeNetWork == MODE_ONE) {
      switch (currentDesign) {
        case HOME_DESIGN:    tempFile = SD.open("_one_hm.htm"); break;
        case MODERN_DESIGN:  tempFile = SD.open("_one_md.htm"); break;
        case AMPERKA_DESIGN: tempFile = SD.open("_one_am.htm"); break;
        default: tempFile = SD.open("_one.htm");
      }
    }
    else if (modeNetWork == MODE_MAJOR) {
      switch (currentDesign) {
        case HOME_DESIGN:    tempFile = SD.open("_maj_hm.htm"); break;
        case MODERN_DESIGN:  tempFile = SD.open("_maj_md.htm"); break;
        case AMPERKA_DESIGN: tempFile = SD.open("_maj_am.htm"); break;
        default: tempFile = SD.open("_major.htm");
      }
    }
  }
  else if (typeOperation == SCRIPTS_JS) {
    if (modeNetWork == MODE_ONE) {
      tempFile = SD.open("scripts.js");
    }
  }
  else if (typeOperation == STYLE_CSS) {
    if (modeNetWork == MODE_ONE) {
      tempFile = SD.open("_style1.htm");
    }
    else if  (modeNetWork == MODE_MAJOR) {
      tempFile = SD.open("_style2.htm");
    }
  }
  else if (typeOperation == HEADER) {
    switch (currentDesign) {
      case HOME_DESIGN:    tempFile = SD.open("_head_hm.htm"); break;
      case MODERN_DESIGN:  tempFile = SD.open("_head_md.htm"); break;
      case AMPERKA_DESIGN: tempFile = SD.open("_head_am.htm"); break;
      default: tempFile = SD.open("_header.htm");
    }
  }  
  else if (typeOperation == DASH) {
    switch (currentDesign) {
      case HOME_DESIGN:    tempFile = SD.open("_dash_hm.htm"); break;
      case MODERN_DESIGN:  tempFile = SD.open("_dash_md.htm"); break;
      case AMPERKA_DESIGN: tempFile = SD.open("_dash_am.htm"); break;
      default: tempFile = SD.open("_dash.htm");
    }    
  }
  else if (typeOperation == MENU) {
    switch (currentDesign) {
      case HOME_DESIGN:    tempFile = SD.open("_menu_hm.htm"); break;
      case MODERN_DESIGN:  tempFile = SD.open("_menu_md.htm"); break;
      case AMPERKA_DESIGN: tempFile = SD.open("_menu_am.htm"); break;
      default: tempFile = SD.open("_menu.htm");
    }    
  }
  else if (typeOperation == FOOTER) {
    switch (currentDesign) {
      case HOME_DESIGN:    tempFile = SD.open("_foot_hm.htm"); break;
      case MODERN_DESIGN:  tempFile = SD.open("_foot_md.htm"); break;
      case AMPERKA_DESIGN: tempFile = SD.open("_foot_am.htm"); break;
      default: tempFile = SD.open("_footer.htm");
    }    
  }
  else if (typeOperation == FLOTR2_JS) {
    tempFile = SD.open("flotr2.js");
  } 
  else if (typeOperation == SAMPLE2_ONE) {
    if (modeNetWork == MODE_ONE) {
      tempFile = SD.open("sample2.js");
    }
  }  
  else if (typeOperation == SAMPLE2_MAJOR) {
    if (modeNetWork == MODE_MAJOR) {
      tempFile = SD.open("_sample2.htm");
    }
  }
  
  if (tempFile) {
    while(tempFile.available()) {
      rsize2 = tempFile.read(buff2, MAX_BUFFER_SIZE2);
      cl.write(buff2, rsize2);
    }
    tempFile.close();
  }
}
