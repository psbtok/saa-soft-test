<script setup lang="ts">
import { useAccountStore } from "@/store/accounts";
import AccountForm from "./accountForm.vue";

const store = useAccountStore();
</script>

<template>
    <div class="container">
        <div class="action-block">
            <h1>Учетные записи</h1>
            <div class="button" @click="store.addAccount">
                <span class="material-icons">add</span>
            </div>
        </div>
        <div class="info-block">
            <span class="icon material-icons">question_mark</span>
            <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
        </div>
        <div class="labels">
            <div class="label">Метка</div>
            <div class="label">Тип записи</div>
            <div class="double-label">
                <div class="label">Логин</div>
                <div class="label">Пароль</div>
            </div>
            <div class="deleteBtnBlank"></div>
        </div>

        <div v-for="account in store.accounts" :key="account.id">
            <AccountForm :id="account.id" />
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    max-width: 900px;
    padding: 16px 32px;
}

.button {
    width: 48px;
    height: 48px;
    color: grey;
    border-radius: 4px;
    border: 2px solid rgb(228, 227, 227);
    background: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 24px;
}

.info-block {
    margin-top: 16px;
    border-radius: 4px;
    background-color: #EEF4FA;
    color: grey;
    padding: 4px 12px;
    display: flex;
    align-items: center;
}

.icon {
    border: 2px solid grey;
    border-radius: 32px;
    padding: 2px;
    margin-right: 8px;
}

.action-block {
    display: flex;
    align-items: center;
}

.labels {
    margin-top: 16px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.label {
    color: rgb(179, 179, 179);
    flex: 1;
    margin-right: 8px;
    font-size: 14px;
}

.double-label {
    flex: 2;
    display: flex;
    justify-content: space-between;
}

.deleteBtnBlank {
    width: 24px;
}
</style>
