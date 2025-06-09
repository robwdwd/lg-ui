<template>
  <ClientOnly>
    <UModal title="AS Path Flow" :description="`AS paths flows seen to ${prefix}`" @update:open="toggleModelState" @after:enter="onAfterEnter">
      <UTooltip text="View AS path diagram.">
        <UButton icon="i-tabler-route-square-2" color="neutral" variant="ghost" class="float-right" />
      </UTooltip>
      <template #body>
        <div class="relative w-full h-[75vh]">
          <VueFlow v-if="isModalOpen" :nodes="nodes" :edges="edges" :nodes-connectable="nodesConnectable" @nodes-initialized="layoutGraph" />
        </div>
      </template>
    </UModal>
  </ClientOnly>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useVueFlow, type Edge, type Node } from '@vue-flow/core'
import type { ASNInfo, ASNInfoEntry } from '~~/shared/types/bgpresult';

const AsNodeTooltip = resolveComponent('AsNodeTooltip')

const { asPaths, prefix, asInfo } = defineProps<{
  asPaths: number[][];
  asInfo?: ASNInfo;
  prefix: string;
}>();

const config = useRuntimeConfig();
const { layout } = useLayout();
const { fitView, updateNodeInternals } = useVueFlow();

const nodesConnectable = ref(false)
const isModalOpen = ref(false)
const hasParsedPaths = ref(false); // Flag to track if paths have been parsed

const nodes = ref<Node[]>([]);
const edges = ref<Edge[]>([]);

const NODE_STYLE = {
  background: 'var(--ui-bg-accented)',
  border: '1px solid var(--ui-color-neutral-400)',
  color: 'var(--ui-text-toned)',
};

const makeNodeLabel = (id: number, asInfo?: ASNInfoEntry) =>
  asInfo ? h(AsNodeTooltip, { asn: id, asInfo }) : `AS${id}`;

// Function to convert paths into nodes and edges
const parsePaths = (paths: number[][], rootNode: number, asInfo?: ASNInfo): void => {
  const nodeSet = new Set<number>();
  const edgeSet = new Set<string>();
  const newNodes: Node[] = [];
  const newEdges: Edge[] = [];

  // Add the root node
  newNodes.push({
    id: rootNode.toString(),
    data: { label: makeNodeLabel(rootNode) },
    position: { x: 0, y: 0 },
    style: NODE_STYLE,
  });
  nodeSet.add(rootNode);

  for (const path of paths) {
    let prev = rootNode;
    for (const node of path) {
      if (!nodeSet.has(node)) {
        newNodes.push({
          id: node.toString(),
          data: { label: makeNodeLabel(node, asInfo?.[node.toString()]) },
          position: { x: 0, y: 0 },
          style: NODE_STYLE,
        });
        nodeSet.add(node);
      }
      const edgeId = `${prev}-${node}`;
      if (!edgeSet.has(edgeId)) {
        newEdges.push({
          id: edgeId,
          source: prev.toString(),
          target: node.toString(),
        });
        edgeSet.add(edgeId);
      }
      prev = node;
    }
  }

  nodes.value = newNodes;
  edges.value = newEdges;
};

async function toggleModelState(event: boolean) {
  if (event) {
    if (!hasParsedPaths.value) {
      parsePaths(asPaths, config.public.ourAsn, asInfo);
      hasParsedPaths.value = true;
    }
  }
  isModalOpen.value = event;
}

async function onAfterEnter() {
  updateNodeInternals()
}

// Layout the graph and fit the view
async function layoutGraph(): Promise<void> {
  nodes.value = layout(nodes.value, edges.value);
  await nextTick(() => fitView());
}

</script>
