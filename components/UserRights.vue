<template>
    <div>
        <div v-for="(item, i) in rights" :key="item" style="display: inline-block; margin-right: 10px;">
            <div>
                <div style="display: inline-block; vertical-align: middle; margin-right: 5px;"><CheckboxRights :id="id" :right="i" :right_status="scope[i]" /></div>
                <div style="display: inline-block; vertical-align: middle;">{{ item }}</div>
            </div>
        </div>
    </div>
    </template>
    
    <script setup>
        const props = defineProps({
            id: {
                type: String,
                required: true,
            }, 
            scope: {
                type: String,
                required: true,
            }   
        })
        const scope = JSON.parse(props.scope)
        const rights = {user: 'User', admin: 'Admin', owner: 'Owner'}
  
    </script>
    
    <style lang="scss" scoped>
    </style>