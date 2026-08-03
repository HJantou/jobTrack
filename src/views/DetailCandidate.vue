<template>
  <div class="main">
    <div v-if="post">
      <h1>Détails</h1>
      <div class="element">
        <p>Entreprise:</p>
        <p>{{ post.name }}</p>
      </div>
      <div class="element">
        <p>Description:</p>
        <p>{{ post.description }}</p>
      </div>
      <div class="element">
        <p>Statut:</p>
        <p v-if="post.statut==='envoye'" class="envoye">Envoyée</p>
        <p v-if="post.statut==='entretien'" class="entretien">Entretien</p>
        <p v-if="post.statut==='accepte'" class="accepte">Acceptée</p>
        <p v-if="post.statut==='refuse'" class="refuse">Refusée</p>
      </div>
      <div class="element">
        <p>Postulé le:</p>
        <p>{{ post.creationDate.toLocaleDateString() }}</p>
      </div>
      <div v-if="statutModal" class="modal">
        <div class="modal-content">
          <h1>Modification de statut</h1>
          <h2>Entreprise : {{ post.name }}</h2>
          <p>Description : {{ post.description }}</p>
          <h4>sélectionner le nouveau statut</h4>
          <div>
            <span class="envoye" @click="post.statut = 'envoye', statutModal = false">Envoyée</span>
            <span class="entretien" @click="post.statut = 'entretien', statutModal = false">Entretien</span>
            <span class="accepte" @click="post.statut = 'accepte', statutModal = false">Acceptée</span>
            <span class="refuse" @click="post.statut = 'refuse', statutModal = false">Refusée</span>
          </div>
          <button @click="statutModal = false" class="close">annuler</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Candidature introuvable</p>
    </div>
    <div class="option">
      <button class="button" @click="statutModal = true">Mettre à jour le statut</button>
      <RouterLink to="/candidat" class="button link">Retour</RouterLink>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCandidatures } from '@/composables/useCandidatures'

const props = defineProps<{
  id: string
}>()

const { posts } = useCandidatures()

const post = computed(() =>
  posts.value.find(p => p.id === Number(props.id)))

  const statutModal = ref(false)
</script>

<style>

  .main{
    width: 80%;
    background-color: white;
    padding: 10px 40px 20px 40px;
    margin: 30px auto;
    border-radius: 12px;
    border: 1px solid #5c5c5c5d;
  }
  .element{
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 10px auto;
  }
  h1{
    text-align: center;
    text-decoration: underline;
  }

  .option{
    display: flex;
    flex-direction: row-reverse;
  }
  .button{
    font-size: 0.9rem;
    border-radius: 8px;
    border: 1px solid #5c5c5c5d;
    background-color: #ece9e9b7;
    padding: 5px 10px;
    margin: 20px 15px;
    text-decoration: none;
    color: black;
  }
  .button:hover{
    background-color: #5c5c5c5d;
    color: white;
    cursor: pointer;
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
    span{
      margin: 0 15px 10px 15px;
      cursor: pointer;
    }
    button{
      margin: 50px 0;
      cursor: pointer;
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
</style>