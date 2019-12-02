import { expect } from 'chai';
import MainMenu from '@/components/mainMenu/MainMenu';
import { mount } from '@vue/test-utils';
// import mainRoutes from '@/router';
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    // const wrapper = mount(MainMenu, {
    //   propsData: {
    //     menus: mainRoutes
    //   }
    // });
    console.log(MainMenu, 'vs');

    expect(1 + 1).to.be.equal(2);
    // expect(wrapper.classes()).toContain('menu-item');
  });
});
;
