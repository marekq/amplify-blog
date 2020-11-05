import React from "react"
import View from "./view.js"
import Header from "../components/header"
import CV from 'react-cv'

const Marek = () => {

  return (
    <View title = "">  
      <Header /> 
      <div className = "container"> 
        <CV
          personalData = {{
            name: 'Marek Kuczynski',
            title: 'Serverless SA @ AWS',
            image: 'http://marek.rocks/mk.jpg',
            contacts: [
              { type: 'location', value: 'The Netherlands' },
              { type: 'linkedin', value: 'linkedin.com/in/marekq' },
              { type: 'twitter', value: 'twitter.com/marekq' },
              { type: 'github', value: 'github.com/marekq' }
          ]}}
          sections= {[
            {
              type: 'text',
              title: 'About Marek',
              content: 'Marek Kuczynski is a Senior Serverless Solutions Architect at Amazon Web Services in The Netherlands. He has been with the company since late 2016 and worked with enterprise and startup customers before working fulltime on serverless.',
              icon: 'rocket'
            },
            {
              type: 'common-list',
              title: 'Languages',
              icon: 'language',
              items: [
                {
                  authority: 'Dutch',
                  authorityMeta: 'Native'
                },
                {
                  authority: 'Polish',
                  authorityMeta: 'Native'
                },
                {
                  authority: 'English',
                  authorityMeta: 'Professional'
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
