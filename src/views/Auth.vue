<script>
import {createUser, loginUser} from "../js/user.js"

export default {
  data(){
    return{
      signup: true,
      name: '',
      email: '',
      password: ''
    }
  },
  methods:{
    async signUp(){
      try{
        const {data, error} = await loginUser(this.email, this.password)
        console.log(data)
      }catch(e){
        console.error(e)
      }
    },
    async signIn(){
      try{
        const {data, error } = await createUser({nom:this.name, email: this.email, password: this.password})
        console.log(data)
      }catch(e){
        console.error(e)
      }
    }
  }
}
</script>

<template>
  <div class="auth-container">
    <button class="toggle-btn" @click="signup = !signup">
      {{ signup ? 'Sign In' : 'Sign Up' }}
    </button>

    <!-- SignUp Form -->
    <form v-if="signup" class="auth-form" @submit.prevent="signUp">
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button class="submit-btn" @click="">Sign Up</button>
    </form>

    <!-- SignIn Form -->
    <form v-else class="auth-form" @submit.prevent="signIn">
      <input type="text" v-model="name" placeholder="Name" />
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button class="submit-btn" @click="">Sign In</button>
    </form>
  </div>
</template>

<style scoped>
/* Container styling */
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Toggle button */
.toggle-btn {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;
}

.toggle-btn:hover {
  background-color: #0056b3;
}

/* Form styling */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form input {
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.auth-form input:focus {
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
}

/* Submit button */
.submit-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>
