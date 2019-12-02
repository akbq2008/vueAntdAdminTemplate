import Vue from 'vue';
let resizeElement = null;
Vue.directive('fixed', {
  bind: (el, binding, vnode) => {
    console.log(el, binding, 'vs');
  },
  inserted: (el) => {

    resizeElement = () => {
      setTimeout(() => {
        let elStyle = el.getBoundingClientRect();
        el.style.position = 'fixed';
        el.style.top = elStyle.top;
        el.style.left = Math.round(elStyle.left) + 'px';
        el.style.zIndex = 10;
        el.style.backgroundColor = '#333333';
        el.style.width = Math.round(elStyle.width) + 'px';
        console.log(elStyle, 'elStyle');

      }, 0);
    };
    resizeElement();
    // Bus.$on('toggle', (data) => {
    //   console.log(data, '回调', el.getBoundingClientRect());
    //   resizeElement();
    // });
  },
  update: (el, binding, vnode, oldVnode,) => {
    let elStyle = el.getBoundingClientRect();
    resizeElement();
    console.log(el, elStyle, binding, vnode, oldVnode, 'update');
  },
  unbind: () => {

  },
  componentUpdated: () => {
    console.log('更好');

  }
});
