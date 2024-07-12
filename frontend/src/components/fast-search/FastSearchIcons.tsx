import React from 'react';
import { WorkIcon, StudyIcon, FamilyIcon, WorkingHolidayIcon, AsiaIcon, SpanishSpeakingIcon } from '../icons/PeopleIcons';

export default function VisaIcon({ type }: { type: string }, ...props: any[]) {
  switch (type) {
    case 'work':
      return <WorkIcon {...props} />;
    case 'study':
      return <StudyIcon {...props} />;
    case 'family':
      return <FamilyIcon {...props} />;
    case 'workingHoliday':
      return <WorkingHolidayIcon {...props} />;
    case 'asia':
      return <AsiaIcon {...props} />;
    case 'spanishSpeaking':
      return <SpanishSpeakingIcon {...props} />;
    default:
      return null;
  }
}
