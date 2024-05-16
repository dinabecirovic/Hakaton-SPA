
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const useStore = defineStore("mainStore", () => {

    const language = ref("");
    const supportedLanguages = ["en", "sr"];
    const progress = ref({});

    function setProgressForUser(category, index){
        progress.value[category] = index;
    }

    watch(language, (newLang) => {
        localStorage.setItem("lang", newLang);
    });

    watch(progress, () => {

        console.log("setting up");
        localStorage.setItem("progress", JSON.stringify(progress.value))
    }, {
        deep: true
    })

    return {
        language,
        supportedLanguages,
        progress,
        setProgressForUser
    }

})

export default useStore;
