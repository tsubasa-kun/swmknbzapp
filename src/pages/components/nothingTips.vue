<template>
    <div>
        <img src="../../../static/images/No.png">
        <span>{{ message }}</span>
    </div>
</template>
<style scoped>
    body {
        background-color: #f9f9f9;
    }

    img {
        display: block;
        width: 30%;
        height: 30%;
        margin: 50Px auto 20PX auto;
    }

    span {
        display: block;
        width: 80%;
        font-size: 18PX;
        margin: 5PX auto;
        text-align: center;
        color: black;
    }

    button {
        display: block;
        width: 80%;
        height: 45PX;
        border: solid #21c0ae 1px;
        color: #21c0ae;
        background: #f9f9f9;
        border-radius: 5PX;
        margin: 5PX auto;
    }

</style>
<script>
    export default{
        props: ['message'],
        methods:{
            goToIndex:function () {
                this.$router.push('/index');
            }
        },
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {

        }
    }
</script>
