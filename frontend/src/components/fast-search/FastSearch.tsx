import React from "react"
import FastSearchBox from "./FastSearchBox"
import {
  AsiaIcon,
  FamilyIcon,
  SpanishSpeakingIcon,
  StudyIcon,
  WorkIcon,
  WorkingHolidayIcon,
} from "../icons/PeopleIcons"
import { countries } from "countries-list"

const workAndSkillsDescription =
  "For professionals and skilled workers seeking job opportunities abroad. These visas allow you to work legally and contribute your skills to the local economy."
const studyVisasDescription =
  "Tailored for students aiming to pursue their education in a foreign country. These visas enable you to attend recognized institutions and gain valuable knowledge and experience."
const familyVisasDescription =
  "Designed for individuals looking to reunite with their family members living abroad. These visas help you join your loved ones and create a home away from home."
const workingHolidayVisasDescription =
  "Ideal for young travelers wishing to explore new cultures while working part-time. These visas provide a unique opportunity to fund your travels and immerse yourself in a new environment."
const asiaVisasDescription =
  "For those interested in experiencing the diverse cultures and vibrant economies of Asian countries. These visas facilitate travel for tourism, business, or family visits across Asia."
const spanishSpeakingCountriesVisasDescription =
  "Perfect for individuals looking to visit or stay in Spanish-speaking countries. Whether for tourism, work, or study, these visas ensure you can navigate and enjoy the local culture and language."

export default function FastSearch() {
  const countriesObject = Object.values(countries)
  const asiaCountries = countriesObject.filter((country: Country) => {
    return (
      country.continent == "AS"
    )
  })
  const spanishSpeakingCountries = countriesObject.filter((country: Country) => {
    return (
      country.languages.includes("es")
    )
  })

  const asiaCountriesSearchParam = asiaCountries.map((country: Country) => {
    return `dest_country=${country.name}`
  }).join("&")

  const spanishSpeakingCountriesSearchParam = spanishSpeakingCountries.map((country: Country) => {
    return `dest_country=${country.name}`
  }).join("&") 

  return (
    <section className="flex flex-wrap gap-8 justify-center mt-8 !font-semibold">
      <FastSearchBox
        title="Work and Skills Visas"
        description={workAndSkillsDescription}
        icon={<WorkIcon />}
        searchParams="visa_type=Work&visa_type=Skilled+Work&visa_type=Temporary+Work&visa_type=Specialist+Work&visa_type=Work+Talent"
      />
      <FastSearchBox
        title="Study Visas"
        description={studyVisasDescription}
        icon={<StudyIcon />}
        searchParams="visa_type=Study&visa_type=Student&visa_type=Long+Term+Study&visa_type=Short+Term+Study"
      />
      <FastSearchBox
        title="Family Visas"
        description={familyVisasDescription}
        icon={<FamilyIcon />}
        searchParams="visa_type=Family"
      />
      <FastSearchBox
        title="Working Holiday Visas"
        description={workingHolidayVisasDescription}
        icon={<WorkingHolidayIcon />}
        searchParams="visa_type=Working+Holiday"
      />
      <FastSearchBox
        title="Asia Visas"
        description={asiaVisasDescription}
        icon={<AsiaIcon />}
        searchParams={asiaCountriesSearchParam}
      />
      <FastSearchBox
        title="Spanish-speaking Countries Visas"
        description={spanishSpeakingCountriesVisasDescription}
        icon={<SpanishSpeakingIcon />}
        searchParams={spanishSpeakingCountriesSearchParam}
      />
    </section>
  )
}
