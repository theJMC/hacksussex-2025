<template>
    <div class="flex flex-column flex-justify-center flex-align-center">
        <div class="network-header flex">
            <div class="bruno"></div>
            <div class="network-functions flex flex-column">
                <div class="lesson-question">
                    <RichTextEditor :content="`${compitency > 50 ? 'Well done!' : ''} You’re currently <b>${compitency}%</b> Gen Z competent!`" />
                </div>
                <div class="flex network-buttons">
                    <button type="button" class="base-button-one flex-one button-green" @click="redirectToMain" aria-label="Learn a new word"> Learn a new word </button>
                    <button type="button" class="base-button-one flex-one button-orange" @click="redirectToPractice" aria-label="Practice"> Practice </button>
                    <button type="button" class="base-button-one flex-one" @click="redirectToHome" aria-label="Home"> Home </button>
                </div>
            </div>
        </div>

        <div class="network-element network" ref="network" tabindex="-1"></div>
    </div>
</template>

<script>
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { genZWords } from '@/data/dataNetwork'; // Import the data

export default {
    name: 'NetworkView',
    components: {
        RichTextEditor
    },
    props: {
        focusedNode: {
            type: Number,
            default: 3
        },
        compitency: {
            type: Number,
            default: 0
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
    },
    methods: {
        redirectToMain() {
        this.$router.push('/main');
      },
      redirectToPractice() {
        this.$router.push('/practice');
      },
      redirectToHome() {
        this.$router.push('/');
      },
    }
}
</script>

<style scoped>
.network {
    height: 70vh;
    width: 90%;
    margin: 10px;
    background: var(--real-white);
    box-shadow: 0px 4px 4px var(--shadow);
}

.network-header {
    padding-top: 30px;
    width: 100%;
    background-color: var(--dark-grey);
}

.network-functions {
    gap: 14px;
    width: 80%;
}

.network-buttons {
    gap: 8px;
    width: 100%;
}
</style>