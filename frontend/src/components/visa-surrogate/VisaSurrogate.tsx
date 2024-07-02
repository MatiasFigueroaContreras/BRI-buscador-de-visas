import Image from "next/image"
import ScheduleIcon from "../icons/ScheduleIcon"
import Link from "next/link"
import Visa from "@/types/Visa"

export default function VisaSurrogate({visa} : {visa: Visa}) {
  return (
    <Link href={visa.url}>
      <article
        className="relative z-10 w-[40rem] bg-secondary-300 text-text-primary-dark 
                rounded-lg border border-primary-300 shadow-md hover:border-primary-600 
              hover:bg-secondary-400 hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <section className="flex justify-between px-4 py-2">
          <div className="grid text-center">
            <h6 className="text-sm text-primary-500">Pasaporte</h6>
            <h3 className="text-lg font-semibold">{visa.type_of_visa}</h3>
          </div>
          <div className="flex gap-1 font-medium items-start">
            <ScheduleIcon className="w-6" />
            <span>{visa.visa_duration} de duración</span>
          </div>
        </section>
        <svg
          className="absolute top-0 w-full"
          width={100}
          height={100}
          viewBox="0 0 100 15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="25"
            y1="9"
            x2="0"
            y2="9"
            className="stroke-primary-300"
            strokeWidth="0.25"
          />
          <line
            x1="30"
            y1="6"
            x2="25"
            y2="9"
            className="stroke-primary-300"
            strokeWidth="0.25"
          />
          <line
            x1="100"
            y1="6"
            x2="30"
            y2="6"
            className="stroke-primary-300"
            strokeWidth="0.25"
          />
        </svg>
        <section className="flex gap-10 px-4 pt-1 pb-4">
          <div className="basis-1/4 grid text-center justify-items-center">
            <h3 className="text-lg font-semibold">
              {visa.destination_country}
            </h3>
            <Image
              src={`icons/flags/${visa.country_code}.svg`}
              width={60}
              height={60}
              alt={`Country flag of ${visa.destination_country}`}
            />
            <span className="text-base font-medium">Categorías: {visa.categories}</span>
          </div>
          <div className="basis-3/4 grid gap-2">
            <section>
              <h6 className="text-sm text-primary-500 font-medium">
                Proceso obtención visa:
              </h6>
              <div className="flex ml-4 justify-between">
                <span>
                  Costo estimado: <b className="font-semibold">{visa.processing_fee}</b>
                </span>
                <span>
                  Duración proceso:{" "}
                  <b className="font-semibold">{visa.processing_time}</b>
                </span>
              </div>
            </section>
            <hr className="border-primary-200 border-dashed" />
            <section>
              <h6 className="text-sm text-primary-500 font-medium">
                Palabras clave:
              </h6>
              <p className="ml-4 font-medium">{visa.highlight.join(", ")}</p>
            </section>
          </div>
        </section>
      </article>
    </Link>
  )
}
