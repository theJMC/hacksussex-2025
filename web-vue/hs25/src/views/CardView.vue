<template>
    <div class="card-view container flex">
        <div class="card-view__side fill-flex flex flex-column">
            <button v-for="(card, index) in cardList" :key="index" @click="selectGenZCard(card.cardGenZ)" :class="['card-view__card', 'fill-flex', { 'card-view__card--selected': cardSelected.cardGenZ === card.cardGenZ }, { 'card-view__card--complete': card.isComplete === true }]">
                {{ card.cardGenZ }}
            </button>
        </div>

        <div class="card-view__side fill-flex flex flex-column">
            <button v-for="(card, index) in cardList" :key="index" @click="selectBoomerCard(card.cardBoomer)" :class="['card-view__card', 'fill-flex', { 'card-view__card--selected': cardSelected.cardBoomer === card.cardBoomer }, { 'card-view__card--complete': card.isComplete === true }]">
                {{ card.cardBoomer }}
            </button>
        </div>
    </div>
</template>

<script>
import defaultCards from '../data/defaultCards';

export default {
name: 'CardView',
data() {
    return {
        cardSelected: {
            cardGenZ: '',
            cardBoomer: ''
        }
    }
},
props: {
    wordProficiency: {
    type: Number,
    default: 0,
    },
    cardList: {
        type: Array,
        default: () => defaultCards, // each card should be in format { cardGenZ, cardBoomer }
    }
},
methods: {
    selectBoomerCard(card) {
        this.cardSelected.cardBoomer = card;
        this.checkCard();
    },
    selectGenZCard(card) {
        this.cardSelected.cardGenZ = card;
        this.checkCard();
    },
    checkCard() {
        const selectedCard = this.cardList.find(card => 
            card.cardGenZ === this.cardSelected.cardGenZ && 
            card.cardBoomer === this.cardSelected.cardBoomer
        );
        if (selectedCard) {
            selectedCard.isComplete = true;
            this.cardSelected.cardGenZ = '';
            this.cardSelected.cardBoomer = '';

            // Check if all cards are complete
            const allCardsComplete = this.cardList.every(card => card.isComplete === true);
            if (allCardsComplete) {
                console.log('all-cards-complete');
                this.$emit('all-cards-complete');
            }
        }
    }
}
}
</script>

<style>
.fill-flex {
    flex: 1;
}

.card-view__side {
    gap: 16px;
}

.card-view {
    gap: 24px;
}

.card-view__card {
    background-color: var(--real-white);
    border: none;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0px 4px 4px var(--shadow);
    transition: background 0.2s, color 0.2s;
}

.card-view__card--selected {
    background-color: var(--pale-blue);
    pointer-events: none;
}

.card-view__card--complete {
    background-color: var(--light-grey);
    color: var(--dark-grey);
    pointer-events: none;
}
</style>
