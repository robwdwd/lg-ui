import dagre from '@dagrejs/dagre'
import { Position, useVueFlow, type Edge, type Node } from '@vue-flow/core'

/**
 * Composable to run the layout algorithm on the graph.
 * It uses the `dagre` library to calculate the layout of the nodes and edges.
 */
export function useLayout() {
  const { findNode } = useVueFlow()

  // Default dimensions for nodes
  const DEFAULT_NODE_WIDTH = 150
  const DEFAULT_NODE_HEIGHT = 50

  function layout(nodes: Node[], edges: Edge[]): Node[] {
    // Create a new graph instance
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: 'TB', marginx: 20, marginy: 20, edgesep: 250, ranksep: 75 })

    // Add nodes to the graph
    for (const node of nodes) {
      const graphNode = findNode(node.id)
      if (!graphNode) {
        console.warn(`Node with id ${node.id} not found.`)
        continue
      }
      dagreGraph.setNode(node.id, {
        width: graphNode.dimensions.width || DEFAULT_NODE_WIDTH,
        height: graphNode.dimensions.height || DEFAULT_NODE_HEIGHT,
      })
    }

    // Add edges to the graph
    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target)
    }

    // Perform layout calculation
    dagre.layout(dagreGraph)

    // Update node positions
    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)
      if (!nodeWithPosition) {
        console.warn(`Position not found for node with id ${node.id}.`)
        return node
      }

      return {
        ...node,
        targetPosition: Position.Top,
        sourcePosition: Position.Bottom,
        position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      }
    })
  }

  return { layout }
}