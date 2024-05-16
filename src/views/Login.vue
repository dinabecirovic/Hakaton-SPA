<template>
    <div class="login-page">
        <div class="forma">

                <h2>DOBRODOŠLI</h2>
                <div>
                    <input
                        type="email"
                        placeholder="E-mail"
                        v-model = "email"
                    />
                </div>

                <div class="password-container">
                    <input
                        :type="passwordVisible ? 'password' : 'text'"
                        placeholder="Lozinka"
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

                <button class="btn" @click="login" type="submit">Prijavite se</button>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router/index.js";
import Cookies from "js-cookie";

const email = ref("");
const password = ref("");

async function login() {
    try {
        let res = await axios.post("http://hakaton-api.test/api/v1/auth/login", {
            email: email.value,
            password: password.value,
        });
        router.push("/");
        Cookies.set("user_token", res.data.token);
    } catch(error) {
        console.error(error);
    }
}

const passwordVisible = ref(false);
</script>
