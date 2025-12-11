import SearchOptions from "../search/SearchOptions";

export default function Form({ form, formData, setFormData }) {
  return (
    <div className="flex flex-col gap-4 w-70">
      {form.map((field) => (
        <SearchOptions
          key={field.key}
          type={field.type}
          optionEndpoint={field.optionEndpoint}
          placeholder={field.placeholder}
          callback={(toChange) => {
            setFormData({ ...formData, [field.key]: toChange });
          }}
        />
      ))}
    </div>
  );
}
