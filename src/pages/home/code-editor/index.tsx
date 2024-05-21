import React from "react";
import { JsonEditor, JsonEditorProps } from "json-edit-react";


export const CodeEditor: React.FC<JsonEditorProps> = (props) => {
  return (
    <JsonEditor
      theme={"githubDark"}
      maxWidth={"100%"}
      {...props}
    />
  );
};
