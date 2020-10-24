import PropTypes from 'prop-types';

export const person = {
  basics: {
    name: 'Marek Kuczynski',
    label: 'Serverless Solutions Architect',
    picture: '/mk.jpg',
    website: 'http://marek.rocks',
    location: {
      city: 'The Hague',
      countryCode: 'The Netherlands',
      region: 'Europe',
    },
    profiles: [
      {
        network: 'GitHub',
        username: 'deltaskelta',
        url: 'https://www.github.com/marekq',
      },
      {
        network: 'Twitter',
        username: 'erlichbachman',
        url: 'https://twitter.com/marekq',
      },
      {
        network: 'LinkedIn',
        username: 'erlichbachman',
        url: 'https://www.linkedin.com/in/marekq/',
      },
    ],
  },
  work: [
    {
      company: 'Amazon Web Services',
      position: 'Serverless SA',
      website: 'https://aws.amazon.com',
      startDate: 'Oct 2016',
      endDate: 'Now',
      highlights: ['serverless', 'architecture'],
      summary: 'As a Specialist Solutions Architect for serverless, I help customers across EMEA to build and improve their serverless architectures on AWS. I also work on internal enablement of our internal teams and work with the service teams on further improvement of their services. Finally, I\'m a regular speaker at internal and external events, including several meetups in the Benelux.'
    },
    {
      company: 'Royal Dutch Shell',
      position: 'Threat and Vulnerability Analyst',
      website: 'http://shell.com',
      startDate: 'Jan 2013',
      endDate: 'Oct 2016',
      summary: 'Within Shell I was performing penetration tests, improving the security monitoring strategy and helping internal businesses understand and remediate their security issues. During my last two years at the company, I worked on improving AWS cloud security from a technical perspective.',
      highlights: ['pentest', 'red team', 'aws', 'incident response', 'vulnerability scanning'],
    },
    {
      company: 'KPMG Advisory',
      position: 'Ethical Hacker',
      website: 'http://kpmg.nl',
      startDate: 'Dec 2011',
      endDate: 'Dec 2013',
      summary: 'While working for the Information Protection Services department, I was involved in penetration testing for various companies in the finance, energy and government sector. I developed skills for mobile device pen testing and did several security assessments of mobile solutions for customers in Europe.',
      highlights: ['pentest', 'mobile', 'web', 'source code analysis'],
    },
  ],
  volunteer: [
    {
      organization: 'ServerlessDays Amsterdam',
      position: 'Organizer',
      website: 'https://serverlessdays.amsterdam/',
      startDate: 'Jan 2019',
      endDate: 'now',
      summary: 'ServerlessDays Amsterdam is a developer-oriented conference about serverless technologies. We believe in and encourage practical sessions, in which developers share their experience and lessons from real-world projects. ServerlessDays Amsterdam is part of ServerlessDays, a global series of events around the world fostering communities around serverless technologies.',
      highlights: [],
    }
  ],
  education: [
    {
      institution: 'University of Amsterdam',
      area: 'Systems and Network Engineering',
      website: 'https://www.os3.nl/',
      studyType: 'Masters',
      startDate: 'Sept 2010',
      endDate: 'August 2011',
      courses: [],
    },
  ],
  skills: [
    {
      name: 'Lambda',
      level: '100',
      keywords: []
    },
    {
      name: 'DynamoDB',
      level: '100',
      keywords: []
    },
    {
      name: 'Python',
      level: '90',
      keywords: [],
    },
    {
      name: 'Golang',
      level: '75',
      keywords: [],
    },
    {
      name: 'Node.JS',
      level: '60',
      keywords: [],
    }
  ],
};

export const locationType = PropTypes.shape({
  address: PropTypes.string,
  postalCode: PropTypes.string,
  city: PropTypes.string,
  countryCode: PropTypes.string,
  region: PropTypes.string,
}).isRequired;

export const profileType = PropTypes.shape({
  network: PropTypes.string,
  username: PropTypes.string,
  url: PropTypes.string,
}).isRequired;

export const basicsType = PropTypes.shape({
  name: PropTypes.string,
  label: PropTypes.string,
  picture: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  summary: PropTypes.string,
  location: PropTypes.shape(locationType),
  profiles: PropTypes.arrayOf(profileType),
}).isRequired;

export const workType = PropTypes.arrayOf(PropTypes.shape({
  company: PropTypes.string,
  position: PropTypes.string,
  website: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  summary: PropTypes.string,
  highlights: PropTypes.arrayOf(PropTypes.string),
})).isRequired;

export const volunteerType = PropTypes.arrayOf(PropTypes.shape({
  organization: PropTypes.string,
  position: PropTypes.string,
  website: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  summary: PropTypes.string,
  highlights: PropTypes.arrayOf(PropTypes.string),
})).isRequired;

export const educationType = PropTypes.arrayOf(PropTypes.shape({
  institution: PropTypes.string,
  area: PropTypes.string,
  studyType: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  gpa: PropTypes.string,
  courses: PropTypes.arrayOf(PropTypes.string),
})).isRequired;

export const awardsType = PropTypes.arrayOf(PropTypes.shape({
  title: PropTypes.string,
  date: PropTypes.string,
  awarder: PropTypes.string,
  summary: PropTypes.string,
})).isRequired;

export const publicationsType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string,
  publisher: PropTypes.string,
  releaseDate: PropTypes.string,
  website: PropTypes.string,
  summary: PropTypes.string,
})).isRequired;

export const skillsType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string,
  level: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
})).isRequired;

export const languagesType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string,
  level: PropTypes.string,
})).isRequired;

export const interestsType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
})).isRequired;

export const referencesType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string,
  reference: PropTypes.string,
})).isRequired;

export const resumeType = PropTypes.shape({
  basics: basicsType,
  work: workType,
  volunteer: volunteerType,
  education: educationType,
  awards: awardsType,
  publications: publicationsType,
  skills: skillsType,
  languages: languagesType,
  interests: interestsType,
  references: referencesType,
});