"use strict";

class TemplateProcessor {
  constructor(template) {
    this.template = template;
  }

  fillIn(dictionary) {
    let returnString = this.template;
    for (const property in dictionary) {
      if (Object.prototype.hasOwnProperty.call(dictionary, property)) {
        const placeholder = `{{${property}}}`;
        returnString = returnString.replaceAll(
          placeholder,
          dictionary[property]
        );
      }
    }

    // Modify the regex to match placeholders without any property (e.g., {{}})
    const regex = /{{[^{}]*}}/g;
    returnString = returnString.replace(regex, "");
    return returnString;
  }
}
