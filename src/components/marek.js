import React from "react"
import View from "./view.js"
import CV from 'react-cv'

const Marek = () => {

  return (
    <View title = "" key = "view">  
      <CV
        key = 'cv'
        personalData = {{
          key: 'data',
          name: 'Marek Kuczynski',
          title: 'Serverless SA @ AWS',
          image: 'https://marek.rocks/mk.jpg',
          contacts: [
            { type: 'location', key: 'location', value: 'The Netherlands' },
            { type: 'linkedin', key: 'linkedin', value: 'linkedin.com/in/marekq' },
            { type: 'twitter', key: 'twitter', value: 'twitter.com/marekq' },
            { type: 'github', key: 'github', value: 'github.com/marekq' }
        ]}}
        sections = {
          [
            {
              type: 'text',
              title: 'About Marek',
              content: 'Marek Kuczynski is a Senior Serverless Solutions Architect at Amazon Web Services in The Netherlands. He has been with the company since late 2016 and worked with enterprise and startup customers before working fulltime on serverless.',
              icon: 'rocket',
              key: 'about'
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
              type: 'experiences-list',
              title: 'Positions',
              icon: 'archive',
              items: [
                {
                  title: 'Sr. Serverless Specialist Solutions Architect',
                  company: 'Amazon Web Services',
                  description: 'As a Specialist Solutions Architect for serverless, I help customers across EMEA to build and improve their serverless architectures on AWS. I also work on internal enablement of our internal teams and work with the service teams on further improvement of their services. Finally, I\'m a regular speaker at internal and external events, including several meetups in the Benelux.',
                  companyWebSite: 'http://aws.amazon.com.com',
                  companyMeta: 'AWS',
                  datesBetween: '2016.10 - Present',
                  descriptionTags: ['AWS', 'Serverless', 'Architecture']
                }
              ]
            },
            {
              type: 'tag-list',
              title: 'Skills Proficiency',
              icon: 'tasks',
              items: ['Python', 'Go', 'React', 'NodeJS', 'Bash']
            },
          ]
        }
        branding = {false} 
      />  
    </View>
  )
}

export default Marek
