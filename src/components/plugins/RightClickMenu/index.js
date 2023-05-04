import Vue from "vue";
import VueComponent from "./DomContainer.vue";

export class RightClickMenu {
  static pluginName = "rightClickMenu";

  constructor() {
    this.__VueCom = null;
  }

  /**
   * @type {import('@logicflow/core').ComponentRender}
   */
  render(lf, toolOverlay) {
    const VueComponentExtend = Vue.extend(VueComponent);
    const vueComponentExtend = new VueComponentExtend({
      data() {
        return {
          lf,
        };
      },
    });
    const mount = vueComponentExtend.$mount();

    this.__VueCom = mount;
    toolOverlay.appendChild(mount.$el);
  }

  destroy() {
    this.__VueCom && this.__VueCom.$destroy();
  }
}
