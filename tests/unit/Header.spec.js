import { mount } from "@vue/test-utils"
import Header from "@/components/Header"


describe('Testing Header component', () => {
  const wrapper = mount(Header)
  const vm = wrapper.vm
  it('renders the correct data', () => {
    expect(wrapper.find('b-nav-item b').text()).toBe('Quiz App')
  })

})
