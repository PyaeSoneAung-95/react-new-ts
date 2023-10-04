import { useField } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";

const options = [
  { value: "Business", label: "Business" },
  { value: "Sports", label: "Sports" },
  { value: "Crime", label: "Crime" },
  { value: "World", label: "World" },
  { value: "Politics", label: "Politics" },
];

export default function CategorySelect({ name }: { name: string }) {
  const [_field, meta, helpers] = useField(name);
  const [category, setCategory] = useState<CategoryOption | null>(null);

  // clear state value when form reset
  useEffect(() => {
    if (!meta.value && category) {
      setCategory(null);
    }
  }, [meta.value]);

  // for edit form
  useEffect(() => {
    if (!category && meta.value) {
      let initialCategory = options.find(
        (option) => option.value === meta.value
      );
      setCategory(initialCategory!);
    }
  }, []);

  const handleChange = (option: CategoryOption | null) => {
    setCategory(option);
    helpers.setValue(option ? option.value : "");
  };
  return (
    <Select
      options={options}
      value={category}
      onChange={handleChange}
      placeholder="Select category"
      isClearable={true}
      styles={{
        control: (css) => ({
          ...css,
          height: "48px",
        }),
      }}
    />
  );
}
