<template>
    <div class="login-page">
        <div class="forma">
            <h2>DOBRODOŠLI</h2>
            <div>
                <input type="text" v-model="firstName" placeholder="Ime" />
            </div>

            <div>
                <input type="text" placeholder="Prezime" v-model="lastName" />
            </div>

            <div>
                <input type="email" placeholder="E-mail" v-model="email" />
            </div>

            <div class="password-container">
                <input
                    :type="passwordVisible ? 'password' : 'text'"
                    placeholder="Lozinka*"
                    name="password"
                    autocomplete="on"
                    class="password-input"
                    id="password-input"
                    v-model="password"
                />
                <span
                    class="toggle-password"
                    @click="passwordVisible = !passwordVisible"
                >
                    <i class="fas fa-eye-slash" id="eye-icon"></i>
                </span>
            </div>

            <button @click="register" class="btn" type="submit">
                Registrujte se
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";
import Cookies from "js-cookie";

const passwordVisible = ref(false);

const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");

async function register() {
    try {
        let res = await axios.post("http://hakaton-api.test/api/v1/auth/register",
        {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            password: password.value,
        });
        router.push("/");
        Cookies.set("user_token", res.data.token);
    } catch (error) {
        console.error(error);
    }
    console.log("res", res);
}
</script>

<style>

@import "../styles/_import.scss";

</style>
