"use babel";

import path from "path";

const RE = {
  PACKAGE: /^package ([^;]+)/
};

export default {

  packageName(textEditor) {
    const filePath = textEditor.getPath();
    if (!filePath) {
      return null;
    }
    const firstLine = textEditor.lineTextForBufferRow(0);
    const matches = firstLine.match(RE.PACKAGE);
    if (!matches) {
      return null;
    }
    const packageComponents = matches[1].split("::");
    const filePathComponents = filePath.split(path.sep).slice(-packageComponents.length);
    const filePathComponentsLen = filePathComponents.length;
    if (filePathComponentsLen > 0) {
      filePathComponents[filePathComponentsLen-1]
        = filePathComponents[filePathComponentsLen-1].split(".")[0];
      const ok = packageComponents
        .map((c, i) => c.toLowerCase() === filePathComponents[i].toLowerCase())
        .reduce((prev, current) => prev && current);
      if (ok) {
        return null;
      }
    }
    return [{
      type: "Error",
      text: "Package doesn't match the file path.",
      range: [[0, 0], [0, firstLine.length-1]],
      filePath
    }];
  }

};
