"use client";
import dynamic from "next/dynamic";
import React from "react";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const TextEditor = ({ value, setvalue, disabled }) => {
  const handleChange = (html) => {
    setvalue(html);
  };
  return (
    <div className="editor-container relative">
      <ReactQuill
        disabled={disabled}
        value={value}
        onChange={handleChange}
        style={{ height: "200px" }}
        theme="snow"
        modules={{
          toolbar: [
            [{ size: [] }],
            [{ align: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ color: [] }, { background: [] }],
          ],
        }}
        formats={[
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "code-block",
          "header",
          "list",
          // "bullet",
          "align",
          "link",
          "image",
          "video",
          "script",
          // "sub",
          // "super",
          "color",
          "background",
          "indent",
          "direction",
        ]}
      />
    </div>
  );
};

export default TextEditor;
