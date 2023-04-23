export default {
  inject: ["root"],

  computed: {
    /**
     * @returns {import('@logicflow/core').LogicFlow}
     */
    lf() {
      // const lf = this.root.lf;
      return this.root.lf;
    },
  },
};
