class GraphNodeModel {
  id: number;
  weight: number;
  nType: number;
  neighbors: Array<number>;

  constructor(id, weight, nType, neighbors) {
    this.id = id;
    this.weight = weight;
    this.nType = nType;
    this.neighbors = [...neighbors];
  }
}
export default GraphNodeModel;
export { GraphNodeModel };
