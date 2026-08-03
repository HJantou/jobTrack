<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <div class="candidatcard">
      <div>
        <p class="title">{{ props.post.name }}</p>
        <p class="description">{{ props.post.description }} - postulé le {{ props.post.creationDate.toLocaleDateString() }}</p>
        <RouterLink :to="linkDetail" :params="props.post" class="details">Détails</RouterLink>
      </div>
      <span v-if="props.post.statut === 'envoye'" class="envoye">Envoyée</span>
      <span v-else-if="props.post.statut === 'entretien'" class="entretien">Entretien</span>
      <span v-else-if="props.post.statut === 'accepte'" class="accepte">Acceptée</span>
      <span v-else-if="props.post.statut === 'refuse'" class="refuse">Refusée</span >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/types/Post';
import { computed } from 'vue';
  const props = defineProps<{
    post: Post
  }>()



  const linkDetail = computed(()=> `/candidat/${props.post.id}`)



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
  .description{
    color: #838383;
    font-size: 0.8rem;
  }
  p{
    margin: 5px;
  }

  .details{
    text-decoration: none;
    color: #3032a0;
    margin: 5px;
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
