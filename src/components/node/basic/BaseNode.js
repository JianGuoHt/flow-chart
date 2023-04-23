import { BaseNode, BaseNodeModel } from "@logicflow/core";

class BaseNewNode extends BaseNode {}

class BaseNewModel extends BaseNodeModel {}

export default {
  type: "pro-base-node",
  view: BaseNewNode,
  model: BaseNewModel,
};
