import React from 'react'
import { shallow } from 'enzyme'

import App from 'Components/App'

describe('<App />', () => {
  it('should render sucessfully', () => {
    const wrapper = shallow(<App />)

    expect(wrapper).toHaveLength(1)
  })
})
