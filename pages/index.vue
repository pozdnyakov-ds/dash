<template>
    <div>
        <h1>{{ $t('index.title') }}</h1>
        <div>pos: {{x}}, {{y}}</div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ducimus eveniet necessitatibus rerum obcaecati magnam neque at esse incidunt aperiam voluptas nihil, molestiae itaque sed soluta a error ipsam reprehenderit doloremque est repudiandae accusantium. Impedit distinctio delectus soluta ipsum veritatis repellendus velit. Commodi provident natus distinctio fugiat praesentium doloribus vero atque officia dolor reprehenderit enim in, odio nam necessitatibus totam, expedita perspiciatis aliquid minima voluptatibus libero a sapiente quam? Iure ea rem veniam debitis, similique quia deleniti quibusdam laborum temporibus mollitia ratione, quod reiciendis animi labore, incidunt nihil ullam ipsum aliquid atque cupiditate. Tempora dolores ullam sit mollitia sapiente debitis. Quae sed, optio ipsum, odit ullam veritatis ipsam quam delectus rerum magnam iste corporis placeat ab blanditiis cupiditate eos similique expedita voluptatibus voluptates debitis deleniti! Culpa, sequi esse!</p>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth']
    }) 

    const { x, y } = useMouse()

    const indexStore = useIndexStore()
    indexStore.progress = true;
    setTimeout(() => {
        indexStore.progress = false
    }, 3000)
    
</script>

<style lang="scss" scoped>

</style>