import Image from "next/image"
import ScheduleIcon from "../icons/ScheduleIcon"
import Link from "next/link"
import Visa from "@/types/Visa"

export default function VisaSurrogate({visa} : {visa: Visa}) {
  const formatKeywords = () => {
    const highlight = visa.highlight.join(", ")
    const evisa = visa.evisa_availability ? "eVisa available" : "eVisa not available"
    const extension = visa.extension_possibility ? "Extension possible" : "No extension"
    const capitalRequired = visa.capital_required == 0 ? "No capital required" : `${visa.capital_required} USD required`
    const res = {
      __html: `${evisa}, ${extension}, ${capitalRequired}${
        highlight.length == 0 ? "" : ", " + highlight
      }`,
    } 
    return res;
  }

  const getXAxis = () => {
    return visa.type_of_visa.length  * 1.5 + 10
  }

  const needDurationText = (str : string) => {
    const containNumber = /\d/.test(str);
    const endsWithDays = str.endsWith('days')
    return containNumber && endsWithDays
  }

  return (
    <Link href={visa.url} rel="noopener noreferrer" target="_blank">
      <article
        className="relative z-10 w-[40rem] bg-secondary-300 text-text-primary-dark 
                rounded-lg border border-primary-300 shadow-md hover:border-primary-600 
              hover:bg-secondary-400 hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <section className="flex justify-between px-4 py-2">
          <div className="grid text-center">
            <h6 className="text-sm text-primary-500">Passport</h6>
            <h3 className="text-lg font-semibold">{visa.type_of_visa} Visa</h3>
          </div>
          <div className="flex gap-1 font-medium items-start">
            <ScheduleIcon className="w-6" />
            <span>
              {visa.visa_duration + " days"}{" "}
            
              
            </span>
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
            x1={getXAxis()}
            y1="9"
            x2="0"
            y2="9"
            className="stroke-primary-300"
            strokeWidth="0.25"
          />
          <line
            x1={getXAxis() + 5}
            y1="6"
            x2={getXAxis()}
            y2="9"
            className="stroke-primary-300"
            strokeWidth="0.25"
          />
          <line
            x1="100"
            y1="6"
            x2={getXAxis() + 5}
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
              width={75}
              height={75}
              alt={`Country flag of ${visa.destination_country}`}
            />
            <span className="text-base font-medium">
              Category: {visa.categories}
            </span>
          </div>
          <div className="basis-3/4 grid gap-2">
            <section>
              <h6 className="text-sm text-primary-500 font-medium">
                Visa obtaining process:
              </h6>
              <div className="flex ml-4 justify-between">
                <span>
                  Estimated cost:{" "}
                  <b className="font-semibold">{visa.processing_fee} USD</b>
                </span>
                <span>
                  Process duration:{" "}
                  <b className="font-semibold">{visa.processing_time}</b>
                </span>
              </div>
            </section>
            <hr className="border-primary-200 border-dashed" />
            <section>
              <h6 className="text-sm text-primary-500 font-medium">
                Characteristics:
              </h6>
              <p
                className="ml-4 font-medium overflow-hidden text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
                dangerouslySetInnerHTML={formatKeywords()}
              />
            </section>
          </div>
        </section>
      </article>
    </Link>
  )
}
