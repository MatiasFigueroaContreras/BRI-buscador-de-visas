"use client";

import Button from "@/components/button/Button";
import MultipleSelect from "@/components/multiple-select/MultipleSelect";
import Pagination from "@/components/pagination/Pagination";
import Select from "@/components/select/Select";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-8 p-24">
            <div className="grid gap-4 w-72">
                <h4 className="text-xl font-bold text-black">
                    Multiple Select Component
                </h4>
                <MultipleSelect
                    placeholder="Selecciona una opcion"
                    options={[
                        {
                            value: "1",
                            label: "Option 1",
                        },
                        {
                            value: "2",
                            label: "Option 2",
                        },
                        {
                            value: "3",
                            label: "Option",
                        },
                    ]}
                    onChange={(options) => {
                        console.log(options);
                    }}
                />
            </div>
            <div className="grid gap-4 w-72">
                <h4 className="text-xl font-bold text-black">
                    Select Component
                </h4>
                <Select
                    placeholder="Selecciona una opcion"
                >
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </Select>
            </div>
            <div>
                <h4 className="text-xl font-bold text-black">
                    Button Component
                </h4>
                <Button className="w-60 h-8">CLICK ME!</Button>
            </div>
            <div>
                <h4 className="text-xl font-bold text-black">
                    Pagination Component
                </h4>
                <Pagination totalItems={100} pageSize={10}/>
            </div>
        </main>
    );
}
