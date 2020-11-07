import React from "react"
import View from "./view.js"
import CV from 'react-cv'

const Marek = () => {

  return (
    <View title = "">  
      <div className = "container" key = "div"> 
        <CV
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
          key = "main"
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
            }
          ]}
          branding = {false} 
        />  
      </div>
   </View>
  )
}

export default Marek
