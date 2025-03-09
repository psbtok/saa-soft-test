<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useAccountStore, type Account, type AccountType } from '@/store/accounts';
import { FormKit } from '@formkit/vue';

const props = defineProps<{ id: number }>();
const store = useAccountStore();
const account = store.accounts.find((acc) => acc.id === props.id);

const form = reactive({
    labelInput: account?.label.map((l) => l.text).join('; ') || '',
    login: account?.login || '',
    password: account?.password || '',
    type: account?.type || 'LDAP' as AccountType,
    passwordVisible: false,
});

watch(() => form.type, (newType) => {
    if (newType === 'LDAP') {
        form.password = '';
    }
});

watch(form, () => {
    saveAccount();
}, { deep: true });

const saveAccount = () => {
    const updatedAccount = store.updateAccount(props.id, {
        label: form.labelInput.split(';').map((l) => ({ text: l.trim() })),
        type: form.type,
        login: form.login,
        password: form.type === 'LDAP' ? null : form.password,
    });

    if (updatedAccount) {
        syncForm(updatedAccount);
    }
};

const syncForm = (account: Account) => {
    Object.assign(form, {
        labelInput: account.label.map((l) => l.text).join('; '),
        login: account.login,
        password: account.password || '',
        type: account.type,
    });
};

const deleteAccount = () => {
    if (account?.id) {
        store.deleteAccount(account.id);
    }
};

const togglePasswordVisibility = () => {
    form.passwordVisible = !form.passwordVisible;
};
</script>

<template>
    <div class="account-form">
        <div class="account-form__input">
            <FormKit name="label" type="text" v-model="form.labelInput" placeholder="Введите метки через ;" />
        </div>

        <div class="account-form__input">
            <FormKit name="type" type="select" v-model="form.type"
                :options="[{ value: 'LDAP', label: 'LDAP' }, { value: 'Локальная', label: 'Локальная' }]" />
        </div>

        <div class="account-form__double-input">
            <div class="account-form__input">
                <FormKit name="login" type="text" v-model="form.login" required placeholder="Логин" />
            </div>

            <div class="account-form__input" v-if="form.type === 'Локальная'">
                <div class="account-form__password-container">
                    <FormKit style="padding-right: 32px;" name="password" v-model="form.password"
                        :type="form.passwordVisible ? 'text' : 'password'" required placeholder="Пароль" />
                    <span class="account-form__password-toggle" @click="togglePasswordVisibility">
                        <span class="account-form__visibility-icon material-icons">
                            {{ form.passwordVisible ? 'visibility' : 'visibility_off' }}
                        </span>
                    </span>
                </div>
            </div>
        </div>

        <div class="account-form__button" @click="deleteAccount">
            <span class="material-icons">delete</span>
        </div>
    </div>
</template>

<style scoped>
.account-form {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.account-form__button {
    flex: 0;
    width: 48px;
    height: 48px;
    color: grey;
    margin-left: 0;
    cursor: pointer;
}

.account-form__input {
    flex: 1;
    margin-right: 8px;
}

.account-form__double-input {
    flex: 2;
    display: flex;
}

.account-form__password-container {
    position: relative;
    width: 100%;
}

.account-form__password-toggle {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;
}

.account-form__visibility-icon {
    color: grey;
}
</style>
