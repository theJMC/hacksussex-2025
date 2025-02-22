<template>
    <div class="network-element network-title flex">
        <h3 class="network-title-text"> Explore your word network </h3>
    </div>

    <div class="network-element network" ref="network" tabindex="-1"></div>

    <div class="network-button__container network-bottom flex">
        <button class="network-button"> Learn more </button>
        <button class="network-button"> Practice </button>
    </div>
</template>

<script>
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { genZWords } from '@/data/dataNetwork'; // Import the data

export default {
    name: 'NetworkView',
    props: {
        focusedNode: {
            type: Number,
            default: 3
        }
    },
    mounted() {
        const container = this.$refs.network;
        const paleGreen = '#98FB98';
        const paleRed = '#FFC0CB';
        const lineGrey = '#00000';

        // Create nodes and edges from the imported data
        const nodes = new DataSet(genZWords.map((word, index) => ({
            id: index + 1,
            label: word.word,
            color: word.isGenZ ? paleRed : paleGreen,
            shape: word.isGenZ ? 'star' : 'dot'
        })));

        const edges = new DataSet(genZWords.flatMap((word, index) => 
            word.linkedWords.map(linkedWord => ({
                from: index + 1,
                to: genZWords.findIndex(w => w.word === linkedWord) + 1,
                color: { color: lineGrey }
            }))
        ));

        const data = {
            nodes: nodes,
            edges: edges
        };

        const options = {
            nodes: {
                size: 16
            },
            edges: {
                width: 1,
            },
            physics: {
                enabled: true
            },
            interaction: {
                keyboard: {
                    enabled: true,
                    speed: {x: 10, y: 10, zoom: 0.02},
                    bindToWindow: false
                },
                navigationButtons: true
            }
        };

        const network = new Network(container, data, options);

        // Focus on the specified node on page load
        network.once('stabilizationIterationsDone', () => {
            network.focus(this.focusedNode, {
                scale: 1.5,
                animation: {
                    duration: 1000,
                    easingFunction: 'easeInOutQuad'
                }
            });
        });

        // Add keyboard navigation
        container.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    network.moveTo({ offset: { x: 0, y: 50 } });
                    break;
                case 'ArrowDown':
                    network.moveTo({ offset: { x: 0, y: -50 } });
                    break;
                case 'ArrowLeft':
                    network.moveTo({ offset: { x: 50, y: 0 } });
                    break;
                case 'ArrowRight':
                    network.moveTo({ offset: { x: -50, y: 0 } });
                    break;
                case '+':
                    network.moveTo({ scale: network.getScale() * 1.2 });
                    break;
                case '-':
                    network.moveTo({ scale: network.getScale() / 1.2 });
                    break;
            }
        });
    }
}
</script>

<style scoped>

.network-title {
    justify-content: center;
    align-items: center;
    width: 99%;
}

.network-bottom {
    justify-content: center;
    align-items: center;
    width: 99%;
    z-index: 3;
    gap:20px;
}

.network-title-text,
.network-button {
    width: fit-content;
    background-color: var(--white);
    border: 1px solid var(--light-grey);
    border-radius: 20px;
    padding: 20px 80px;
    box-shadow: 0px 4px 4px var(--shadow);
    z-index: 1;
}

.network {
    height: 70vh;
    width: 99%;
    margin: 10px;
    border: 3px solid var(--light-grey);
    box-shadow: 0px 4px 4px var(--shadow);
}

.network-button {
    z-index: 2;
}
</style>