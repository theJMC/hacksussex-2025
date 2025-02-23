<template>
    <div class="card-view__container flex flex-column flex-align-center flex-justify-center">
        <h3> Match the Gen-Z term to its <i> traditional </i> meaning</h3>
        <div class="card-view container flex">
            <div class="card-view__side fill-flex flex flex-column">
                <button v-for="(card, index) in cardList" :key="index" @click="selectGenZCard(card.cardGenZ)" :class="['card-view__card', 'fill-flex', { 'card-view__card--selected': cardSelected.cardGenZ === card.cardGenZ }, { 'card-view__card--complete': card.isComplete === true }]">
                    {{ card.cardGenZ }}
                </button>
            </div>

            <div class="card-view__side card-view__side-two fill-flex flex flex-column">
                <button v-for="(card, index) in cardList" :key="index" @click="selectBoomerCard(card.cardBoomer)" :class="['card-view__card', 'fill-flex', { 'card-view__card--selected': cardSelected.cardBoomer === card.cardBoomer }, { 'card-view__card--complete': card.isComplete === true }]">
                    {{ card.cardBoomer }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
name: 'CardView',
data() {
    return {
        cardSelected: {
            cardGenZ: '',
            cardBoomer: ''
        },
        cardList: [],
    }
},
props: {
    wordProficiency: {
    type: Number,
    default: 0,
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
    },
    get_cards() {
    axios.get(`${import.meta.env.VITE_API_URL}/get_card`)
      .then((response) => {
        console.log(response.data)
        this.cardList = response.data;
      })
      .catch((error) => {
        console.error(error);
      })
    }
},
  mounted() {
    this.get_cards()
  }
}
</script>

<style>
.fill-flex {
    flex: 1;
}
h3 {
    font-weight: 400;
    text-align: center;
    margin: 0;
}

.card-view__container {
    height: 100%;
}

.card-view__side {
    gap: 30px;
}

.card-view {
    max-width: 80%;
    padding: 20px;
    gap: 24px;
    margin: 0 auto;
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

.card-view__side-two {
    flex-direction: column-reverse;
}
</style>
