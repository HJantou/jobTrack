<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <div class="candidatcard">
      <div>
        <p class="title">{{ props.post.name }}</p>
        <p class="detail">{{ props.post.description }} - postulé le {{ props.post.creationDate.toLocaleDateString() }}</p>
      </div>
      <button v-if="props.post.statut === 'envoye'" class="envoye" @click="statutModal = true">Envoyée</button>
      <button v-else-if="props.post.statut === 'entretien'" class="entretien" @click="statutModal = true">Entretien</button>
      <button v-else-if="props.post.statut === 'accepte'" class="accepte" @click="statutModal = true">Acceptée</button>
      <button v-else-if="props.post.statut === 'refuse'" class="refuse" @click="statutModal = true">Refusée</button>
      <div v-if="statutModal" class="modal">
        <div class="modal-content">
          <h1>Modification de statut</h1>
          <h2>Entreprise : {{ props.post.name }}</h2>
          <p>Description : {{ props.post.description }}</p>
          <h4>sélectionner le nouveau statut</h4>
          <div>
            <button class="envoye" @click="props.post.statut = 'envoye', statutModal = false, props.post.creationDate = new Date()">Envoyée</button>
            <button class="entretien" @click="props.post.statut = 'entretien', statutModal = false, props.post.creationDate = new Date()">Entretien</button>
            <button class="accepte" @click="props.post.statut = 'accepte', statutModal = false, props.post.creationDate = new Date()">Acceptée</button>
            <button class="refuse" @click="props.post.statut = 'refuse', statutModal = false, props.post.creationDate = new Date()">Refusée</button>
          </div>
          <button @click="statutModal = false" class="close">annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/types/Post';
import { ref } from 'vue';
  const props = defineProps<{
    post: Post
  }>()

  const statutModal = ref(false)
</script>

<style scoped>
  .candidatcard{
    border: 1px solid #5c5c5c5d;
    margin: 10px 0;
    padding: 10px 30px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  }
  .title{
    font-weight: 800;
  }
  .detail{
    color: #838383;
    font-size: 0.8rem;
  }
  p{
    margin: 5px;
  }

  button{
    border: none;
    cursor: pointer;
  }

  .envoye{
    background-color: #6c9feb56;
    color: #1e71ee;
    padding: 2px 7px;
    border-radius: 5px;
  }
  .entretien{
    background-color: #c5950f3f;
    color: #926b00;
    padding: 2px 7px;
    border-radius: 5px;
  }
  .refuse{
    background-color: #c50f0f3f;
    color: #970000;
    padding: 2px 7px;
    border-radius: 5px;
  }
  .accepte{
    background-color: #2afa013f;
    color: #178b00;
    padding: 2px 7px;
    border-radius: 5px;
  }

  .modal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: white;
    padding: 20px 40px;
    border-radius: 12px;
    h4{
      margin-bottom: 10px;
    };
    button{
      margin: 0 15px 10px 15px;
    }
    .close{
      margin: 10px 160px;
      padding: 0 20px;
      height: 1.5rem;
      border: 1px solid #5c5c5c5d;
      border-radius: 8px;
      height: 1.3rem;
    }
  }


</style>
