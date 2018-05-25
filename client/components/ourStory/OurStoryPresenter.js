import React from 'react'
import { connect } from 'react-redux'
import { FooterPresenter } from '../'

const OurStoryPresenter = () => (
  <div className="ourStoryBackgroundImage">
    <div className="ourStoryFirstContainer">
      <p className="ourStoryHeader">OUR STORY</p>
      <p className="ourStoryBody">Ora is a ministry that promotes a lifestyle of holiness and builds technology tools to help people cultivate lives of devotion to God. As Christians who are called to be “in the world but not of the world”, we need to contend with temptations to distorted lifestyles: materialism, consumerism, close-mindedness, and hardness of heart. These distorted lifestyles are age-old problems that every generation has been tempted by in one way or another. However, this generation is currently facing unique challenges because of the way that social media is amplifying those distorted lifestyles. Certain technological tools, if they’re not used carefully and deliberately, intensify our feelings of self-doubt, envy, and emptiness. Because they aren’t constructed from a Christian paradigm, these tools can cultivate habits that draw us into our own vanity instead of drawing us closer to God and closer to each other. This common struggle of Christians all over the world serves as the backdrop to the start of Ora’s ministry.</p>
    </div>
    <div className="ourStoryContainer">
      <p className="ourStoryHeader">OUR RESPONSE</p>
      <p className="ourStoryBody">While we think it’s important to recognize the dangers of certain technological systems, we also think that it’s important to affirm the incredible good work that technology has produced. When designed carefully and used deliberately, technology can help us share the message of our faith, cultivate intentional habits, and point us toward deeper mysteries in the Body of Christ. With this in mind, we built the Ora Prayer Network. The Ora Prayer Network is a mobile app that allows users to submit anonymous prayer requests and cultivate daily habits of praying for others. The app is meticulously designed to help users pray selflessly and empathetically, and our hope is that by forming intentional habits of intercessory prayer users will draw closer to God and to their neighbor.</p>
    </div>
    <div className="ourStoryContainer">
      <p className="ourStoryHeader">OUR VISION</p>
      <p className="ourStoryBody bottomMargin3em">By promoting a lifestyle of holiness and building practical technology tools, Ora hopes to accompany Christians as they journey deeper into the mysteries of the Church. As we continue to grow, we look forward to getting to know our community, listening to them, and serving their needs. While we all seek the same source and summit of all truth, we know that we need different types of practical support to get there. The Ora Prayer Network is the first in what we hope will be a long line of technology products that help people draw into deeper communion with God and with their neighbor.</p>
    </div>
    <div className="topMargin3em bottomMargin3em">
      <FooterPresenter />
    </div>
  </div>
)

export default connect()(OurStoryPresenter)
