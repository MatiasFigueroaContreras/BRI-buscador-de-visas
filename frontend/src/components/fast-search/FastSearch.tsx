import React from 'react';
import FastSearchBox from "./FastSearchBox";

const workAndSkillsDescription = 'For professionals and skilled workers seeking job opportunities abroad. These visas allow you to work legally and contribute your skills to the local economy.';
const studyVisasDescription = 'Tailored for students aiming to pursue their education in a foreign country. These visas enable you to attend recognized institutions and gain valuable knowledge and experience.';
const familyVisasDescription = 'Designed for individuals looking to reunite with their family members living abroad. These visas help you join your loved ones and create a home away from home.';
const workingHolidayVisasDescription = 'Ideal for young travelers wishing to explore new cultures while working part-time. These visas provide a unique opportunity to fund your travels and immerse yourself in a new environment.';
const asiaVisasDescription = 'For those interested in experiencing the diverse cultures and vibrant economies of Asian countries. These visas facilitate travel for tourism, business, or family visits across Asia.';
const spanishSpeakingCountriesVisasDescription = 'Perfect for individuals looking to visit or stay in Spanish-speaking countries. Whether for tourism, work, or study, these visas ensure you can navigate and enjoy the local culture and language.';

export default function FastSearch() {
  return (
    <section className="flex flex-wrap gap-8 justify-center mt-8 !font-semibold">
      <FastSearchBox title="Work and Skills Visas" description={workAndSkillsDescription} type="work" link="#" />
      <FastSearchBox title="Study Visas" description={studyVisasDescription} type="study" link="#" />
      <FastSearchBox title="Family Visas" description={familyVisasDescription} type="family" link="#" />
      <FastSearchBox title="Working Holiday Visas" description={workingHolidayVisasDescription} type="workingHoliday" link="#" />
      <FastSearchBox title="Asia Visas" description={asiaVisasDescription} type="asia" link="#" />
      <FastSearchBox title="Spanish-speaking Countries Visas" description={spanishSpeakingCountriesVisasDescription} type="spanishSpeaking" link="#" />
    </section>
  );
}
