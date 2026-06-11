interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({
  value,
  onChange,
}: SearchBoxProps) {
  return (
    <div className="mb-6">
      <label
        className="
        block
        text-sm
        font-semibold
        mb-2
      "
      >
        Buscar Plan
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Fibra, Stream, Disney..."
        className="
          w-full
          border
          rounded-lg
          p-2
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
}