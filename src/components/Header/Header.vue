<template>
    <header>
        <div class="container header_cont">
            <div class="logo">
                Aw-App
            </div>
            <nav>
                <ul>
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li v-if="!isAuthenticated">
                        <router-link to="/signin">Sign in</router-link>
                    </li>
                    <li v-if="isAuthenticated">
                        <div
                        @click="signOut"
                        :style="{'display':'inline'}">
                            Sign Out
                        </div>
                    </li>
                    <li v-if="!isAuthenticated">
                        <router-link to="/signup">Sign up</router-link>
                    </li>
                    <li v-if="isAuthenticated">
                        <router-link to="/dashboard">Dashboard</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
    export default {
        methods:{
            signOut(){
                this.$store.commit('signOut');
            }
        },
        computed:{
            isAuthenticated(){
                return this.$store.getters.isAuth;
            }
        }
        
    }
</script>
