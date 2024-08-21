"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

interface ReactQuillEditorProps {
  onChange?: (data: string) => void;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function ReactQuillEditor({
  onChange,
  value,
  defaultValue,
  placeholder,
}: ReactQuillEditorProps) {
  return (
    <>
      <ReactQuill
        // style={{ height: "50px" }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        modules={{
          toolbar: {
            syntax: true,
            container: [
              ["code-block"],
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "size"],
              ["clean"],
            ],
          },
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "link",
          "image",
        ]}
      />
    </>
  );
}
