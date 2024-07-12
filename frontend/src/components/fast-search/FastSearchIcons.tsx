import React from 'react';
import { WorkIcon, StudyIcon, FamilyIcon, WorkingHolidayIcon, AsiaIcon, SpanishSpeakingIcon } from '../icons/PeopleIcons';

export default function FastSearchIcons({ type }: { type: string }) {
  switch (type) {
    case 'work':
      return <WorkIcon/>;
    case 'study':
      return <StudyIcon/>;
    case 'family':
      return <FamilyIcon/>;
    case 'workingHoliday':
      return <WorkingHolidayIcon/>;
    case 'asia':
      return <AsiaIcon/>;
    case 'spanishSpeaking':
      return <SpanishSpeakingIcon/>;
    default:
      return null;
  }
}
