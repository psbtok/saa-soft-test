<script setup lang="ts">
import { useAccountStore } from "@/store/accounts";
import AccountForm from "./accountForm.vue";

const store = useAccountStore();
</script>

<template>
    <div class="account-container">
        <div class="account-container__action-block">
            <h1 class="account-container__title">Учетные записи</h1>
            <div class="account-container__button" @click="store.addAccount">
                <span class="material-icons">add</span>
            </div>
        </div>
        <div class="account-container__info-block">
            <span class="account-container__icon material-icons">question_mark</span>
            <span class="account-container__info-text">Для указания нескольких меток для одной пары логин/пароль
                используйте разделитель ;</span>
        </div>
        <div class="account-container__labels">
            <div class="account-container__label">Метка</div>
            <div class="account-container__label">Тип записи</div>
            <div class="account-container__double-label">
                <div class="account-container__label">Логин</div>
                <div class="account-container__label">Пароль</div>
            </div>
            <div class="account-container__delete-btn-blank"></div>
        </div>

        <div v-for="account in store.accounts" :key="account.id">
            <AccountForm :id="account.id" />
        </div>
    </div>
</template>

<style scoped>
.account-container {
    width: 100%;
    max-width: 900px;
    padding: 16px 32px;
}

.account-container__button {
    cursor: pointer;
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

.account-container__info-block {
    margin-top: 16px;
    border-radius: 4px;
    background-color: #EEF4FA;
    color: grey;
    padding: 4px 12px;
    display: flex;
    align-items: center;
}

.account-container__icon {
    border: 2px solid grey;
    border-radius: 32px;
    padding: 2px;
    margin-right: 8px;
}

.account-container__action-block {
    display: flex;
    align-items: center;
}

.account-container__labels {
    margin-top: 16px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.account-container__label {
    color: rgb(179, 179, 179);
    flex: 1;
    margin-right: 8px;
    font-size: 14px;
}

.account-container__double-label {
    flex: 2;
    display: flex;
    justify-content: space-between;
}

.account-container__delete-btn-blank {
    width: 24px;
}
</style>
