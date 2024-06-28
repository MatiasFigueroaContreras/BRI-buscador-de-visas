import Button from "../button/Button";
import MultipleSelect from "../multiple-select/MultipleSelect";
import SearchInput from "../search-input/SearchInput";
import Select from "../select/Select";

export default function VisaSearchBar() {
  return (
    <div className="flex h-10 w-full justify-center gap-2 !text-sm">
      <Select placeholder="Pais de origen" className="!w-48 !font-medium">
        <option value="chile">Chile</option>
        <option value="argentina">Argentina</option>
        <option value="brasil">Brasil</option>
        <option value="peru">Peru</option>
        <option value="colombia">Colombia</option>
        <option value="mexico">Mexico</option>
        <option value="espana">España</option>
      </Select>
      <MultipleSelect
        className="!min-h-10 !w-60 font-medium"
        placeholder="Tipo de visa"
        options={[
          {
            value: "Working Holiday",
            label: "Working Holiday",
          },
          {
            value: "Estudiante",
            label: "Estudiante",
          },
          {
            value: "Turista",
            label: "Turista",
          },
          {
            value: "Trabajo",
            label: "Trabajo",
          },
        ]}
      />
      <SearchInput
        placeholder="Tipos de visa, Requisitos, países..."
        className="!h-10 !w-[30rem]"
      />
      <Button className="!w-28 bg-background !font-semibold !text-text-primary-dark shadow-none hover:bg-gray-200">
        BUSCAR
      </Button>
    </div>
  );
}
