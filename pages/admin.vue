<template>
    <div>
        <h1>{{ $t('admin.title') }}</h1>
        <br>
        <p><b>Registered Users </b></p>
        
        <v-card style="margin-top: 10px;">
            <v-table>
                <thead style="background-color: #eee;">
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Email</th>
                      <th class="text-left">Rights</th>
                      <th class="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in users" :key="item.email">
                      <td>{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                      <td><Tooltip v-bind="item" /></td>
                      <td><Checkbox v-bind="item" /></td>
                    </tr>
                  </tbody>
            </v-table>
        </v-card>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth','admin']
    })

    const { data, pending, error, refresh } = useFetch('/api/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            action: 'users.list'
        }
    })

    const users = data && data.value && data.value.data ? JSON.parse(JSON.stringify(data.value.data)) : []

</script>

<style lang="scss" scoped>

</style>