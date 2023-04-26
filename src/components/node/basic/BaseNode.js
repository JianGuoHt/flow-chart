import { BaseNode, BaseNodeModel } from "@logicflow/core";

class BaseNewModel extends BaseNodeModel {}

class BaseNewNode extends BaseNode {}

export default {
  type: "pro-base-node",
  view: BaseNewNode,
  model: BaseNewModel,
};
