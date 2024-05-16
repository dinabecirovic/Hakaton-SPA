<template>
    <nav>
        <div class="left">
            <h1>Smartić</h1>
            <div class="logo">
                <img :src="Logo" alt="" />
            </div>
        </div>
        <div class="right">
            <template v-if="0">
                <IconEn
                    v-if="store.language === 'en'"
                    @click="store.language = 'sr'"
                />
                <IconSr
                    :src="IconSr"
                    v-if="store.language === 'sr'"
                    @click="store.language = 'en'"
                />
            </template>
        </div>
    </nav>
</template>

<script setup>
import useStore from "@/stores/main";
import IconEn from "../icons/flags/gb.svg";
import IconSr from "../icons/flags/rs.svg";
import Logo from "../icons/logo.png?url";

const store = useStore();
</script>

<style scoped lang="scss">

nav {
    --color: #184e3f;

    display: flex;
    align-items: center;
    height: 100px;
    border-radius: 20px;
    padding: 20px;

    .left {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .logo {
            width: 25px;
            height: 25px;
            margin-bottom: 15px;
            img {
                width: 100%;
                height: 100%;
            }
        }

        h1 {
            font-size: 2rem;
            color: rgb(255, 255, 255);
        }
    }

    .right {
        display: flex;
        gap: 10px;
        svg {
            overflow: hidden;
            border-radius: 50%;
            width: 30px;
            height: 30px;
        }
    }
}
</style>
