<script setup>

</script>

<template>
    <div class="card shadow-lg">
        <div class="card-body">
            <h5 class="card-title">Вход</h5>
            <div class="mb-3">
                <label for="email" class="form-label">Адрес электронной почты</label>
                <input type="email" class="form-control" id="email" placeholder="name@example.com">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="password" placeholder="тут">
            </div>

            <div class="row">
                <div class="col">
                    <button type="submit" class="btn btn-primary w-100">Войти</button>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-primary w-100">Регистрация</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>