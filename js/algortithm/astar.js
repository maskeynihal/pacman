import tiles from '../utils/tilesSprite.js';
import gameSettings from '../utils/game.settings.js';
import grid from '../globals/grid.js';
import {
  doesHitWall,
  getTileIndex,
  getDistance,
  isOccupiedByGhost,
} from '../utils/helper.js';
import gameInstance from '../globals/game.instance.js';

export default class Astar {
  constructor(ghostColor, startNode = null, finishNode = null) {
    this.grid = grid.data;
    this.allNodes = [];
    this.startNode = {};
    this.endNode = {};
    this.unvisitedNodes = [];
    this.shortestPath = [];
    this.visitedNodeInOrder = [];
    this.ghostColor = ghostColor;
    this.algorithmName = 'Astar';
  }

  /**
   * Start algorithm
   */
  init(startNode, endNode) {
    this.clearAndSetVariables();
    this.setStartNode(startNode);
    this.setEndNode(endNode);
  }

  /**
   * *clears all variables before using algorithm
   */
  clearAndSetVariables() {
    this.startNode = JSON.parse(JSON.stringify({}));
    this.endNode = JSON.parse(JSON.stringify({}));
    this.unvisitedNodes = JSON.parse(JSON.stringify([]));
    this.shortestPath = JSON.parse(JSON.stringify([]));
    this.visitedNodeInOrder = JSON.parse(JSON.stringify([]));
    this.allNodes = JSON.parse(JSON.stringify(this.grid));
    this.unvisitedNodes = this.allNodes.slice();
  }

  setStartNode(startNode) {
    for (let index = 0; index < this.allNodes.length; index += 1) {
      if (
        this.allNodes[index].column === startNode.column &&
        this.allNodes[index].row === startNode.row
      ) {
        this.allNodes[index].distance = 0;
        this.allNodes[index].isStartNode = true;
        this.allNodes[index].parentNode = null;
        this.startNode = this.allNodes[index];
        break;
      }
    }
  }

  setEndNode(endNode) {
    for (let index = 0; index < this.allNodes.length; index += 1) {
      if (
        this.allNodes[index].column === endNode.column &&
        this.allNodes[index].row === endNode.row
      ) {
        this.allNodes[index].isEndNode = true;
        this.allNodes[index].parentNode = null;
        this.endNode = this.allNodes[index];
        break;
      }
    }
  }

  /**
   * @returns array for left, right, up, down grid of the current node, given x, y
   */
  nextNodes(column, row) {
    return [
      this.allNodes[getTileIndex(column - 1, row)],
      this.allNodes[getTileIndex(column + 1, row)],
      this.allNodes[getTileIndex(column, row - 1)],
      this.allNodes[getTileIndex(column, row + 1)],
    ];
  }

  sortUnvisitedNodeByDistance() {
    this.unvisitedNodes.sort(
      (nodeA, nodeB) =>
        this.heuristicFunction(nodeA) - this.heuristicFunction(nodeB)
    );
  }

  /**
   * Full algorithm call
   * returns array of node of shortest path
   */
  algorithm() {
    this.visitedNodeInOrder = this.getVisitedNodeInOrder();
    this.shortestPath = this.findShortestPath(this.endNode);
    return this.shortestPath;
  }

  updateUnvisitedNode(currentNode) {
    const unvisitedNeighbours = this.getUnvisitedNeighbours(currentNode);
    for (let index = 0; index < unvisitedNeighbours.length; index += 1) {
      unvisitedNeighbours[index].distance = currentNode.distance + 1;
      unvisitedNeighbours[index].parentNode = currentNode;
    }
  }

  getUnvisitedNeighbours(node) {
    const neighbours = this.nextNodes(node.column, node.row);
    return neighbours.filter((neighbour) => !neighbour.isVisited);
  }

  /**
   *  loop with all the possible girds to get to the final node
   * main logic of algorithm
   * @returns array set of all visited nodes
   */
  getVisitedNodeInOrder() {
    const visitedNodeInOrder = [];
    while (this.unvisitedNodes.length) {
      this.sortUnvisitedNodeByDistance();
      const closestNode = this.unvisitedNodes.shift();

      if (
        gameInstance.gameLevelStatus.currentGameStatus ===
          gameInstance.gameLevelStatus.singlePlayer.extreme &&
        this.ghostColor === 'blue'
      ) {
        closestNode.isWall = false;
      }

      if (
        closestNode.isWall ||
        closestNode.index < 85 ||
        closestNode.index > 951
      ) {
        // eslint-disable-next-line no-continue
        continue;
      }

      // !stuck in loop
      if (closestNode.distance > 9999999) {
        return visitedNodeInOrder;
      }

      closestNode.isVisited = true;

      visitedNodeInOrder.push(closestNode);

      // !reached destination
      if (closestNode === this.endNode) {
        return visitedNodeInOrder;
      }

      this.updateUnvisitedNode(closestNode);
    }

    return visitedNodeInOrder;
  }

  /**
   *  loops with visited nodes, visited nodes has parent
   * finds out the shortest path
   * @returns array set of nodes for shortest path
   */
  findShortestPath(nodes) {
    const shortestPath = [];
    let currentNode = nodes;
    while (currentNode != null) {
      shortestPath.unshift(currentNode);
      // eslint-disable-next-line no-param-reassign
      currentNode = currentNode.parentNode;
    }
    return shortestPath;
  }

  drawShortestPath(shortestPath) {
    shortestPath.forEach((node) => {
      gameInstance.context.beginPath();
      gameInstance.context.rect(node.x, node.y, 30, 30);
      gameInstance.context.fillStyle = 'blue';
      gameInstance.context.fill();
    });
  }

  heuristicFunction(currentNode) {
    return (
      currentNode.distance +
      getDistance(currentNode, gameInstance.pacmans[0].getPosition())
    );
  }
}
