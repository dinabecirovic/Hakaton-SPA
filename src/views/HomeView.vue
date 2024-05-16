<template>
    <div class="menu">
        <i class="fas fa-bars" @click="openMenu"></i>
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" @click="closeMenu()"
                >&times;</a
            >
            <a href="#" v-if="0">Odjavi se</a>
            <a>Životinje</a>

            <div class="progress">
                <div
                    class="inner"
                    :style="{
                        width:
                            (store.progress?.animals /
                                Object.keys(images.animals).length) *
                                100 +
                            '%',
                    }"
                ></div>
            </div>
            <div class="progress-number">
                {{ store.progress?.animals || 0 }} /
                {{ Object.keys(images.animals).length || 0 }}
            </div>

            <a>Povrće</a>

            <div class="progress">
                <div
                    class="inner"
                    :style="{
                        width:
                            (store.progress?.vegetables /
                                Object.keys(images.vegetables).length) *
                                100 +
                            '%',
                    }"
                ></div>
            </div>
            <div class="progress-number">
                {{ store.progress?.vegetables || 0 }} /
                {{ Object.keys(images.vegetables).length || 0 }}
            </div>

            <a>Voće</a>
            <div class="progress">
                <div
                    class="inner"
                    :style="{
                        width:
                            (store.progress?.fruits /
                                Object.keys(images.fruits).length) *
                                100 +
                            '%',
                    }"
                ></div>
            </div>
            <div class="progress-number">
                {{ store.progress?.fruits || 0 }} /
                {{ Object.keys(images.fruits).length || 0 }}
            </div>
            <a>Ostalo</a>
            <div class="progress">
                <div
                    class="inner"
                    :style="{
                        width:
                            (store.progress?.objects /
                                Object.keys(images.objects).length) *
                                100 +
                            '%',
                    }"
                ></div>
            </div>
            <div class="progress-number">
                {{ store.progress?.objects || 0 }} /
                {{ Object.keys(images.objects).length || 0 }}
            </div>

            <div class="progress overall">
                <div
                    class="inner"
                    :style="{
                        width: overAllProgress,
                    }"
                ></div>
            </div>
        </div>
    </div>

    <div class="content card-main">
        <Header />
        <div class="typed-container">
            <h1 id="typed">
                Zaronite u čarobni svet boja, <br />
                oblika i mašte.
            </h1>
        </div>
        <teleport to="body" v-if="playing">
            <div class="game-dialog">
                <div class="dialog-content">
                    <div class="image-container">
                        <img :src="currentImage" alt="" ref="image" />

                        <Volume @click="speakCurrentWord" />
                    </div>

                    <div class="input">
                        <input
                            :maxlength="currentWord.length"
                            type="text"
                            v-model="currentWordInput"
                            placeholder="Šta vidiš na slici?"
                        />
                    </div>
                </div>
            </div>
        </teleport>
    </div>

    <div class="cards">
        <div class="card" @click="play('animals')">
            <div class="wrapper">
                <img :src="dogUrl" alt="" />

                <div class="play">Životinje</div>
            </div>
        </div>

        <div class="card" @click="play('vegetables')">
            <div class="wrapper">
                <div class="play">Povrće</div>

                <img :src="carrotUrl" alt="" />
            </div>
        </div>

        <div class="card" @click="play('fruits')">
            <div class="wrapper">
                <div class="play">Voće</div>
                <img :src="appleUrl" alt="" />
            </div>
        </div>

        <div class="card" @click="play('objects')">
            <div class="wrapper">
                <img :src="houseUrl" alt="" />

                <div class="play">Ostalo</div>
            </div>
        </div>

        <!-- <div class="card" @click="play('random')">
            <div class="wrapper">
                <img :src="dogUrl" alt="" />

                <div class="play">Životinje</div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import { ref, computed, watch, onMounted } from "vue";
import Volume from "../icons/volume.svg";
import useStore from "@/stores/main";

import carrotUrl from "../images/carrot.avif";
import pepperUrl from "../images/pepper.jpeg";
import cucumberUrl from "../images/cucumber.jpeg";
import onionUrl from "../images/onion.jpeg";
import cabbageUrl from "../images/cabbage.jpeg";
import potatoUrl from "../images/potato.jpeg";
import green_peasUrl from "../images/green.jpeg";
import garlicUrl from "../images/garlic.jpeg";
import broccoliUrl from "../images/peas.jpeg";
import gingerUrl from "../images/ginger.jpg";
import cherryUrl from "../images/charry.jpeg";

import dogUrl from "../images/dog.jpg";
import birdUrl from "../images/bird.jpeg";
import catUrl from "../images/cat.jpeg";
import horseUrl from "../images/horse.jpeg";
import goatUrl from "../images/goat.jpeg";
import pandaUrl from "../images/panda.jpeg";
import squirrelUrl from "../images/squirrel.jpeg";
import rabbitUrl from "../images/rabbit.jpeg";
import cow from "../images/cow.jpeg";
import fish from "../images/fish.jpeg";
import chicken from "../images/chicken.jpeg";

import appleUrl from "../images/apple.webp";
import bananaUrl from "../images/banana.jpeg";
import orangeUrl from "../images/orange.jpeg";
import peachUrl from "../images/peach.jpg";
import pearUrl from "../images/pear.jpeg";
import strawberryUrl from "../images/strawberry.jpeg";
import raspberryUrl from "../images/raspberry.jpeg";
import blueberryUrl from "../images/blueberry.jpeg";
import blackberryUrl from "../images/blackberry.jpeg";
import lemonUrl from "../images/lemon.jpeg";

import bedUrl from "../images/bed.jpeg";
import houseUrl from "../images/house.jpeg";
import carUrl from "../images/car.jpeg";
import schoolUrl from "../images/school.jpeg";
import tableUrl from "../images/table.jpeg";
import chairUrl from "../images/chair.jpeg";
import glassUrl from "../images/glas.jpeg";
import mirrorUrl from "../images/mirror.jpeg";
import doorUrl from "../images/door.jpeg";
import windowUrl from "../images/window.jpeg";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
import fourUrl from "../images/4.jpeg";
import xUrl from "../images/x.jpeg";
import minusUrl from "../images/minus.jpeg";

const isVisible = ref(false);
const isLog = ref(false);

function logOut() {
    Cookies.remove("user_token");
}
function openMenu() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeMenu() {
    document.getElementById("mySidenav").style.width = "0";
}

const store = useStore();
const toast = useToast();

const activeCategory = ref(null);
const currentIndex = ref(0);
const playing = ref(false);

const image = ref(null);
const currentWordInput = ref("");

const images = {
    animals: {
        dog: dogUrl,
        bird: birdUrl,
        cat: catUrl,
        horse: horseUrl,
        goat: goatUrl,
        panda: pandaUrl,
        squirrel: squirrelUrl,
        rabbit: rabbitUrl,
        cow: cow,
        fish: fish,
        chicken: chicken,
    },
    vegetables: {
        carrot: carrotUrl,
        pepper: pepperUrl,
        cucumber: cucumberUrl,
        onion: onionUrl,
        cabbage: cabbageUrl,
        potato: potatoUrl,
        green: green_peasUrl,
        garlic: garlicUrl,
        broccoli: broccoliUrl,
        ginger: gingerUrl,
        cherry: cherryUrl,
    },
    fruits: {
        apple: appleUrl,
        banana: bananaUrl,
        orange: orangeUrl,
        peach: peachUrl,
        pear: pearUrl,
        strawberry: strawberryUrl,
        raspberry: raspberryUrl,
        blueberry: blueberryUrl,
        blackberry: blackberryUrl,
        lemon: lemonUrl,
    },
    objects: {
        bed: bedUrl,
        house: houseUrl,
        car: carUrl,
        school: schoolUrl,
        table: tableUrl,
        chair: chairUrl,
        glass: glassUrl,
        mirror: mirrorUrl,
        door: doorUrl,
        window: windowUrl,
    },
};

const currentWordsArray = computed(() => {
    if (activeCategory.value === "animals") {
        return images.animals;
    }

    if (activeCategory.value === "vegetables") {
        return images.vegetables;
    }

    if (activeCategory.value === "fruits") {
        return images.fruits;
    }

    if (activeCategory.value === "objects") {
        return images.objects;
    }
});

const currentWord = computed(() => {
    if (!currentWordsArray.value) return "";

    return Object.keys(currentWordsArray.value)[currentIndex.value] || "";
});

const currentImage = computed(() => {
    return currentWordsArray.value[currentWord.value];
});

async function play(category) {
    playing.value = true;

    activeCategory.value = category;

    let index = store.progress[category] || 0;

    if (index === Object.keys(images[category]).length) index = 0;

    store.setProgressForUser(activeCategory.value, index);

    currentIndex.value = index;

    speakCurrentWord();
}

async function speakCurrentWord() {
    if (!window.speechSynthesis) {
        console.log("Web Speech API not supported in this browser.");
        return;
    }

    // Stop any currently speaking utterance
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentWord.value);

    // Optional: Set other properties
    utterance.pitch = 1; // Range between 0 and 2
    utterance.rate = 1; // Range between 0.1 and 10
    utterance.volume = 1; // Range between 0 and 1

    utterance.onstart = () => console.log("Start speaking...");
    utterance.onend = () => console.log("Finished speaking.");
    utterance.onerror = (event) => console.log("Error occurred:", event.error);

    speechSynthesis.speak(utterance);
}

async function sleep(s = 100) {
    await new Promise((res) => {
        setTimeout(() => {
            res();
        }, s);
    });
}

watch(currentWordInput, async (newWord) => {
    if (newWord.toLowerCase() === currentWord.value.toLowerCase()) {
        if (currentIndex.value === currentWordsArray.value?.length - 1) {
            stop(true);
        }

        currentIndex.value++;
        currentWordInput.value = "";
    } else if (newWord.length === currentWord.value.length) {
        image.value.style.transform = "translate(-5px)";
        await sleep(100);
        image.value.style.transform = "translate(5px)";
        await sleep(100);
        image.value.style.transform = "translate(-5px)";
        await sleep(100);
        image.value.style.transform = "translate(5px)";
        await sleep(100);
        image.value.style.transform = "translate(0px)";
        currentWordInput.value = "";
    }
});

watch(currentIndex, () => {
    if (!playing.value) return;

    store.setProgressForUser(activeCategory.value, currentIndex.value);

    if (currentIndex.value === Object.keys(currentWordsArray.value).length) {
        stop(true);
    }
});

function stop(showToast) {
    if (showToast)
        toast.info(
            "Završili ste igru, čestitamo. Svoj napredak imate u denom meniju"
        );

    activeCategory.value = "";
    currentIndex.value = 0;

    playing.value = false;
}

const overAllProgress = computed(() => {

    let allVariable = 0;
    if(store.progress.length){
        allVariable = Object.values(store.progress).reduce((ac, el) => ac + el);
    }


    let allLength =
        Object.values(images.animals).length +
        Object.values(images.fruits).length +
        Object.values(images.vegetables).length +
        Object.values(images.objects).length;

    return allVariable / allLength * 100 + "%";
});

watch((currentImage) => {
    if (currentImage) speakCurrentWord();
});

onMounted(async () => {
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") stop(false);
    });
});
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

#dropdown {
    position: absolute;
}
#dropdown.show {
    display: flex;
}

.menu {
    z-index: 5;
    position: fixed;
    right: 30px;
    top: 30px;
    > i {
        font-size: 30px;
        color: white;
        cursor: pointer;
    }
}

.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.5s;
    display: flex;
    flex-direction: column;
}

.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #d3d3d3;
    display: block;
    transition: 0.3s;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.sidenav .closebtn {
    position: absolute;
    top: 20px;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }
    .sidenav a {
        font-size: 18px;
    }
}

.card-main {
    clip-path: polygon(
        0% 0%,
        0% 92.5%,
        1.7% 93.3%,
        3.4% 94.1%,
        5.1% 94.9%,
        6.8% 95.6%,
        8.5% 96.3%,
        10.2% 96.8%,
        11.9% 97.3%,
        13.6% 97.8%,
        15.3% 98.3%,
        17% 98.7%,
        18.7% 99.1%,
        20.3% 99.45%,
        22% 99.6%,
        23.7% 99.7%,
        25.4% 99.7%,
        27.1% 99.6%,
        28.8% 99.455%,
        30.5% 99.2%,
        32.2% 98.8%,
        33.9% 98.5%,
        35.6% 98.1%,
        37.3% 97.7%,
        39% 97.29%,
        40.7% 96.8%,
        42.4% 96.2%,
        44.1% 95.6%,
        45.8% 94.7%,
        47.5% 93.7%,
        49.2% 92.5%,
        50.8% 91.2%,
        52.5% 89.9%,
        54.2% 88.5%,
        55.9% 87%,
        57.6% 85.4%,
        59.3% 83.8%,
        61% 82.2%,
        62.7% 80.8%,
        64.4% 79.5%,
        66.1% 78.3%,
        67.8% 77.3%,
        69.5% 76.5%,
        71.2% 75.9%,
        72.9% 75.4%,
        74.6% 75.1%,
        76.3% 75%,
        78% 75.1%,
        79.7% 75.4%,
        81.4% 75.9%,
        83.1% 76.5%,
        84.7% 77.3%,
        86.4% 78.3%,
        88.1% 79.5%,
        89.8% 80.8%,
        91.5% 82.2%,
        93.2% 83.8%,
        94.9% 85.4%,
        96.6% 87.1%,
        98.3% 88.9%,
        100% 90.7%,
        100% 0%
    );
    width: 100%;
    height: 95vh;
    position: relative;
    background-image: url("../images/back7.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba($color: #000000, $alpha: 0.6);
        z-index: -1;
    }
}
.typed-container {
    display: inline-block;
    margin-left: 50%;
    margin-top: 5%;
}

#typed {
    overflow: hidden;
    white-space: nowrap;
    width: 0;
    animation: typing;
    animation-duration: 3s;
    //animation-timing-function: steps(40, end);
    animation-fill-mode: forwards;
    color: white;
    font-size: 3rem;
}
@keyframes typing {
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-inline: auto;
    gap: 40px;
    width: 1500px;
    margin-top: 20px;
    z-index: 10;
    position: relative;
    margin-bottom: 50px;

    .card {
        height: 400px;
        width: 400px;

        filter: brightness(80%);
        transition: all 0.3s ease;

        &.card:nth-child(1) {
            border-radius: 30% 70% 70% 30% / 37% 35% 65% 63%;
        }

        &.card:nth-child(2) {
            border-radius: 53% 47% 49% 51% / 56% 66% 34% 44%;
        }

        &.card:nth-child(3) {
            border-radius: 53% 47% 35% 65% / 46% 43% 57% 54%;
        }

        &.card:nth-child(4) {
            position: relative;
            border-radius: 62% 38% 79% 21% / 42% 46% 54% 58%;
            left: 200px;
            top: -70px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
        }

        .wrapper {
            border-radius: inherit;
            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;

            transition: all 0.3s ease;
            transform-origin: center center;
            position: relative;
            cursor: pointer;
            border: 1px solid black;
            overflow: hidden;

            .play {
                position: absolute;
                font-size: 2rem;
                color: white;
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(1px);

                opacity: 0;
                transition: all 0.3s ease-in-out;

                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .button-container {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform-origin: center center;
                transform: translate(-50%) rotate(30deg);
                animation-duration: 5s;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
                animation-fill-mode: forwards;
                background: #cccccc50;
                border-radius: 30%;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3 ease-in-out;
                opacity: 0.5;

                img {
                    width: 100px;
                    border-radius: none;
                    outline: 5px solid rgba(117, 128, 0, 0.463);
                    outline-offset: 10px;
                    transition: all 0.3s;
                }

                &.first-button {
                    bottom: 20px;
                    animation-name: play1;
                    transform: translate(-70%) rotate(-30deg);
                }

                &.sec-button {
                    animation-name: play2;
                    transform: translate(-50%) rotate(0deg);
                }

                &.third-button {
                    bottom: 20px;
                    animation-name: play3;
                }
            }

            &:hover {
                transform: scale(1.1);

                .play {
                    opacity: 1;
                }

                .button-container {
                    opacity: 1;
                    animation-duration: 2s;

                    img {
                        scale: 1.2;
                        outline: 5px solid rgba(117, 128, 0, 0.615);
                    }
                }
            }
        }
    }
}

.game-dialog {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #000000d6;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;

    .dialog-content {
        width: 1000px;
        height: 600px;
        border-radius: 20px;
        border: 1px solid white;
        padding: 50px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            height: 450px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50px;
            }

            svg {
                position: absolute;
                z-index: 30;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                top: 0;
                right: 0;
                transform: translate(15px, -10px);
                fill: rgb(134, 134, 134);
                cursor: pointer;

                background-color: white;
                padding: 10px;
                rotate: -20deg;
                transition: all 0.3s ease-in-out;

                &:hover {
                    scale: 1.1;
                }
            }
        }

        .input {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;

            transform: translateY(20px);

            input {
                height: 40px;
                font-size: 2rem;
                background-color: transparent;
                border: 0;
                outline: 0;
                color: white;
                border-bottom: 2px solid white;
                width: 15ch;

                text-align: center;
            }
        }
    }
}

.progress {
    width: 80%;
    height: 8px;
    margin-inline: auto;
    border: 1px solid rgb(252, 252, 252);
    border-radius: 5px;

    .inner {
        color: white;
        height: 100%;
        background: white;
    }
}

.progress-number {
    margin-top: 10px;
    color: white;
    padding-left: 30px;
    opacity: 0.6;
}

.overall{
    margin-top: auto;
    margin-bottom: 10px;
    .inner{
        background-color:orange;
    }
}

</style>
