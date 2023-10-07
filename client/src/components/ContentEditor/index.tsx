import { useField } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "./toolbarOptions";

export default function ContentEditor({ name }: { name: string }) {
  const [_field, meta, helpers] = useField(name);

  return (
    <ReactQuill
      modules={{
        toolbar: toolbarOptions,
      }}
      theme="snow"
      preserveWhitespace={true}
      value={meta.value}
      placeholder="Write your news content here..."
      onChange={(content, _delta, _source, editor) =>
        helpers.setValue(editor.getLength() > 1 ? content : "")
      }
    />
  );
}
