import MultipleSelect from "../multiple-select/MultipleSelect"
import FilterOption from "./FilterOption"

export default function FiltersBar() {
  return (
    <aside className="sticky top-0 left-0 flex flex-col basis-1/4 gap-5 z-10">
      <h2 className="text-xl font-semibold">Filtros</h2>
      <hr className="-mt-3" />
      <FilterOption placeholder="Pais de destino">
        <MultipleSelect
          placeholder="Pais de destino"
          options={[
            { value: "1", label: "Argentina" },
            { value: "2", label: "Brasil" },
            { value: "3", label: "Chile" },
            { value: "4", label: "Colombia" },
            { value: "5", label: "Ecuador" },
            { value: "6", label: "Perú" },
            { value: "7", label: "Uruguay" },
            { value: "8", label: "Venezuela" },
          ]}
        />
      </FilterOption>
      <FilterOption placeholder="Categoria de visa">
        <MultipleSelect
          placeholder="Categoria de visa"
          options={[
            { value: "1", label: "H1B1" },
            { value: "2", label: "B1" },
            { value: "3", label: "C1" },
            { value: "4", label: "B2" },
            { value: "5", label: "F1" },
            { value: "6", label: "M1" },
            { value: "7", label: "G" },
            { value: "8", label: "G1" },
          ]}
        />
      </FilterOption>
      <FilterOption placeholder="Tiempo de tramitacion">
        <MultipleSelect
          placeholder="Tiempo de tramitacion"
          options={[
            { value: "1", label: "15 dias" },
            { value: "2", label: "30 dias" },
            { value: "3", label: "45 dias" },
            { value: "4", label: "60 dias" },
            { value: "5", label: "75 dias" },
            { value: "6", label: "90 dias" },
            { value: "7", label: "105 dias" },
            { value: "8", label: "120 dias" },
          ]}
        />
      </FilterOption>
    </aside>
  )
}
