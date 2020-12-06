import React from "react"
import CV from 'react-cv'

const Marek = () => {

  return (
    <CV
      key = 'cv'
      personalData = {{
        key: 'data',
        name: 'Marek Kuczynski',
        title: 'Serverless Specialist SA @ AWS',
        image: '/mk.jpg',
        contacts: [
          { type: 'location', key: 'location', value: 'The Hague, The Netherlands' },
          { type: 'linkedin', key: 'linkedin', value: 'linkedin.com/in/marekq' },
          { type: 'twitter', key: 'twitter', value: 'twitter.com/marekq' },
          { type: 'github', key: 'github', value: 'github.com/marekq' }
      ]}}
      sections = {
        [
          {
            type: 'text',
            title: 'About Marek',
            content: 'Marek Kuczynski is a Senior Serverless Solutions Architect at Amazon Web Services in The Netherlands. He has been with the company since late 2016 and worked with enterprise and startup customers before working fulltime on serverless. Before AWS, Marek spent several years as a security consultant and ethical hacker, with a focus on cloud, mobile and backend systems.',
            icon: 'usertie',
            key: 'about'
          },
          {
            type: 'experiences-list',
            title: 'Experiences',
            icon: 'archive',
            items: 
              [
                {
                  title: 'Sr. Serverless Specialist Solutions Architect',
                  company: 'Amazon Web Services',
                  description: 'As a Specialist SA for serverless, I help customers across EMEA to build and improve their serverless architectures on AWS. I also work on internal enablement of our internal teams and work with the service teams on further improvement of their services. Finally, I\'m a regular speaker at internal and external events, including several meetups in the Benelux.',
                  companyWebSite: 'https://aws.amazon.com',
                  companyMeta: 'AWS',
                  datesBetween: '2019 - now',
                  key: 'serverless'
                },
                {
                  title: 'Sr. Startup Solutions Architect',
                  company: 'Amazon Web Services',
                  description: 'As a Startup SA, I worked with startups in The Benelux on building their business on AWS. I worked mostly on container, ML and serverless projects during this time.',
                  companyWebSite: 'https://aws.amazon.com',
                  companyMeta: 'AWS',
                  datesBetween: '2019 - 2019',
                  key: 'startup'
                },
                {
                  title: 'Enterprise Solutions Architect',
                  company: 'Amazon Web Services',
                  description: 'As an enterprise SA, I worked with some of the largest AWS customers in The Benelux. I gained experience with mass migrations, building cloud native architectures and serverless during this period.',
                  companyWebSite: 'https://aws.amazon.com',
                  companyMeta: 'AWS',
                  datesBetween: '2016 - 2018',
                  key: 'enterprise'
                },
                {
                  title: 'Vulnerability and Red Team Analyst, CyberDefence',
                  company: 'Royal Dutch Shell',
                  description: 'At Shell, I was part of the CyberDefence Team which is responsible for digital security at the company. I worked on vulnerability assessment, penetration testing and red teaming across the company. During my last two years at Shell, I took a special interest in AWS Cloud Security.',
                  companyWebSite: 'https://shell.com',
                  companyMeta: 'Shell',
                  datesBetween: '2015 - 2016',
                  key: 'vulnerability'
                },
                {
                  title: 'Threat Analyst, CyberDefence',
                  company: 'Royal Dutch Shell',
                  description: 'At Shell, I was part of the CyberDefence Team which is responsible for digital security at the company. Working as a Threat Analyst, I would implement preventive security controls and triage for (external) cyber security threats that could impact the company.',
                  companyWebSite: 'https://shell.com',
                  companyMeta: 'Shell',
                  datesBetween: '2014 - 2015',
                  key: 'threat'
                },
                {
                  title: 'Security Auditor and Ethical Hacker',
                  company: 'KPMG',
                  description: 'While working for the Information Protection Services department, I was involved in penetration testing for various companies in the finance, energy and government sector. I developed skills for mobile device pen testing and did several security assessments of mobile solutions for customers in Europe.',
                  companyWebSite: 'https://kpmg.nl',
                  companyMeta: '',
                  datesBetween: '2011 - 2013',
                  key: 'kpmg'
                }
              ]
          },
          {
            type: 'common-list',
            title: 'Education',
            icon: 'graduation',
            items: [
              {
                title: 'Masters degree - System and Network Engineering',
                authority: 'University of Amsterdam',
                authorityWebSite: 'https://os3.nl',
                rightSide: '2010 - 2011'
              },
              {
                title: 'Bachelor degree - Network Infrastructure Design',
                authority: 'Hogeschool Zuyd Heerlen',
                authorityWebSite: 'https://www.zuyd.nl/',
                rightSide: '2006 - 2010'
              }
            ]
          },
          {
            type: 'common-list',
            title: 'Languages',
            icon: 'language',
            key: 'language',
            items: [
              {
                authority: 'Dutch',
                authorityMeta: 'Native',
                key: "dutch"
              },
              {
                authority: 'Polish',
                authorityMeta: 'Native',
                key: "polish"
              },
              {
                authority: 'English',
                authorityMeta: 'Professional',
                key: "english"
              }
            ]
          },
          {
            type: 'tag-list',
            title: 'Skills Proficiency',
            icon: 'tasks',
            key: 'skills',
            items: ['Python', 'Go', 'React', 'NodeJS', 'Bash']
          },
        ]
      }
      branding = {false} 
    />  
  )
}

export default Marek
