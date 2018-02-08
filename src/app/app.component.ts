import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import GraphMasterData from "../utils/masterDataForTheGraph";
import GraphNodeModel from "../model/graphNode.model";
import GraphModel from "../model/graph.model";
import DijkstraModel from "../model/dijkstra.model";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "app";
  sourceNode = null;
  isSourceNodeSelected = false;
  targetNode = null;
  dist = 0;

  graph = null;
  nodesArr = null;
  cacheGraphResult = null;

  dijkstraModelObject = new DijkstraModel();
  pathArr = [];
  ngOnInit() {
    this.createGraph();
  }

  createGraph() {
    const graphNodesArr = [];
    this.graph = new GraphModel(GraphMasterData);
    console.log("%c this.graph ", "background: lime; color: black", this.graph);
    console.log(
      "%c typeof  ",
      "background: lime; color: black",
      typeof this.graph.nodes
    );
    this.nodesArr = Object.keys(this.graph.nodes).map(
      nodeKeys => this.graph.nodes[nodeKeys]
    );
    console.log(
      "%c nodesArr ",
      "background: lime; color: black",
      this.nodesArr
    );
  }

  runDijkstra(pathType, source, target) {
    const results = this.dijkstraModelObject.run(
      this.graph,
      pathType,
      source.id,
      target.id
    );

    this.dist = results.dist[target.id];
    this.cacheGraphResult = results;

    // cache results
    // service.cache = results;
    return results;
  }

  getShortestPath() {
    this.pathArr = this.dijkstraModelObject.getPath(
      this.cacheGraphResult.prev,
      this.cacheGraphResult.target
    );
  }

  onNodeContainerClick(e, nodeObj) {
    const targetNodeObj = nodeObj;
    const id = targetNodeObj.id;
    const weight = targetNodeObj.weight;
    const nType = targetNodeObj.nType;
    const neighbors = targetNodeObj.neighbors;
    if (!this.isSourceNodeSelected) {
      this.sourceNode = new GraphNodeModel(id, weight, nType, neighbors);
    } else {
      this.targetNode = new GraphNodeModel(id, weight, nType, neighbors);
    }

    if (this.sourceNode && this.targetNode) {
      const dijResults = this.runDijkstra(1, this.sourceNode, this.targetNode);
      const shortestPath = this.getShortestPath();
      console.log(
        "%c dijkstra result ",
        "background: aqua; color: black",
        dijResults
      );
    }

    console.log(
      "%c this.sourceNode ",
      "background: lime; color: black",
      this.sourceNode
    );
    console.log(
      "%c this.targetNode ",
      "background: lime; color: black",
      this.targetNode
    );

    if (this.sourceNode) {
      console.log(
        "%c graph.find(source) ",
        "background: aqua; color: black",
        this.graph.find(this.sourceNode.id)
      );
    }
  }

  onSourceBtnClick(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.sourceNode) {
      this.isSourceNodeSelected = true;
    }
    console.log(
      "%c inside onSourceBtnClick ",
      "background: salmon; color: black",
      this.isSourceNodeSelected
    );
  }

  onClearPathClick() {
    this.sourceNode = null;
    this.isSourceNodeSelected = false;
    this.targetNode = null;
    this.dist = 0;

    this.graph = null;
    this.nodesArr = null;
    this.cacheGraphResult = null;

    this.dijkstraModelObject = new DijkstraModel();
    this.pathArr = [];

    this.createGraph();
  }

  checkForActiveClass(id) {
    if (this.sourceNode && this.sourceNode.id === id) {
      return true;
    }
    if (this.targetNode && this.targetNode.id === id) {
      return true;
    }

    if (
      this.pathArr &&
      this.pathArr.length &&
      _.find(this.pathArr, pathId => pathId === id)
    ) {
      return true;
    }
    return false;
  }
}
