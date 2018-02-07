import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import GraphMasterData from "../utils/masterDataForTheGraph";
import GraphNodeModel from "../model/graphNode.model";
import GraphModel from "../model/graph.model";

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

  ngOnInit() {
    this.createGraph();
  }

  createGraph() {
    const graphNodesArr = [];
    this.graph = new GraphModel(GraphMasterData);
    console.log("%c this.graph ", "background: lime; color: black", this.graph);
    console.log(
      '%c typeof  ',
      'background: lime; color: black',
      typeof this.graph.nodes
    );
    this.nodesArr = Object.keys(this.graph.nodes).map(
      nodeKeys => this.graph.nodes[nodeKeys]
    );
    console.log(
      '%c nodesArr ',
      'background: lime; color: black',
      this.nodesArr
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

    console.log(
      '%c this.sourceNode ',
      'background: lime; color: black',
      this.sourceNode
    );
    console.log(
      '%c this.targetNode ',
      'background: lime; color: black',
      this.targetNode
    );

    if (this.sourceNode) {
      console.log(
        '%c graph.find(source) ',
        'background: aqua; color: black',
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
      '%c inside onSourceBtnClick ',
      'background: salmon; color: black',
      this.isSourceNodeSelected
    );
  }
}
