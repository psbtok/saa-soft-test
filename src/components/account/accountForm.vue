<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAccountStore, type AccountType } from '@/store/accounts';
import { FormKit } from '@formkit/vue';

const props = defineProps<{ id: number }>();

const store = useAccountStore();
const account = store.accounts.find((acc) => acc.id === props.id);

const labelInput = ref(account?.label.map((l) => l.text).join('; ') || '');
const login = ref(account?.login || '');
const password = ref(account?.password || '');
const type = ref<AccountType>(account?.type || 'LDAP');
const passwordVisible = ref(false);

watch(type, (newType) => {
    if (newType === 'LDAP') {
        password.value = '';
    }
});

watch([labelInput, login, password, type], () => {
    saveAccount();
}, { deep: true });

const saveAccount = () => {
    console.log('saving');
    store.updateAccount(props.id, {
        label: labelInput.value.split(';').map((l) => ({ text: l.trim() })),
        type: type.value,
        login: login.value,
        password: type.value === 'LDAP' ? null : password.value,
    });
};

const deleteAccount = () => {
    if (account?.id) {
        store.deleteAccount(account.id)
    }
};

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};
</script>

<template>
    <div class="account-form">
        <div class="input">
            <FormKit name="label" type="text" v-model="labelInput" placeholder="Введите метки через ;" />
        </div>
        <div class="input">
            <FormKit name="type" type="select" v-model="type"
                :options="[{ value: 'LDAP', label: 'LDAP' }, { value: 'Локальная', label: 'Локальная' }]" />
        </div>
        <div class="double-input">
            <div class="input">
                <FormKit name="login" type="text" v-model="login" required />
            </div>
            <div class="input" v-if="type === 'Локальная'">
                <div class="password-container">
                    <FormKit style="padding-right: 32px;" name="password" v-model="password"
                        :type="passwordVisible ? 'text' : 'password'" required />
                    <span class="password-toggle" @click="togglePasswordVisibility">
                        <span class="visibility-icon material-icons">{{ passwordVisible ? 'visibility' :
                            'visibility_off' }}</span>
                    </span>
                </div>
            </div>
        </div>

        <div class="button" @click="deleteAccount">
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

.button {
    flex: 0;
    width: 48px;
    height: 48px;
    color: grey;
    margin-left: 0;
}

.input {
    flex: 1;
    margin-right: 8px;
}

.double-input {
    flex: 2;
    display: flex;
}

.password-container {
    position: relative;
    width: 100%;
}

.password-toggle {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;
}

.input-container {
    flex: 2;
    display: flex;
    flex-direction: row;
}

.visibility-icon {
    color: grey
}
</style>
